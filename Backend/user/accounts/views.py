from django.shortcuts import get_object_or_404,render

from rest_framework.response import Response
from rest_framework import status, generics, status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, LoginSerializer,ConnectionSerializer,ProfileUpdateSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
import random
from .models import Connection
from rest_framework.views import APIView

User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def send_random_profiles(request, id):
    users = User.objects.exclude(id=id)

    if users.exists():  # Ensure there are users available
        random_users = random.sample(list(users), min(10, users.count()))
    else:
        random_users = []  # Return an empty list if no users exist

    serializer = UserSerializer(random_users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_filtered_profiles(request):
    caste = request.query_params.get('caste')
    gender = request.query_params.get('gender')

    users = User.objects.exclude(id=request.user.id)

    if caste:
        users = users.filter(caste=caste)
    if gender:
        users = users.filter(gender=gender)

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_connection_request(request):
    receiver_id = request.data.get('receiver_id')

    if not receiver_id:
        return Response({"error": "Receiver ID is required"}, status=400)

    receiver = User.objects.filter(id=receiver_id).first()
    if not receiver:
        return Response({"error": "User not found"}, status=404)

    existing_request = Connection.objects.filter(
        sender=request.user, receiver=receiver).first()
    if existing_request:
        return Response({"message": "Request already sent"}, status=400)

    Connection.objects.create(sender=request.user, receiver=receiver)
    return Response({"message": "Connection request sent successfully"}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    notifications = Connection.objects.filter(receiver=request.user).values(
        "id", "sender__id", "sender__username", "created_at"
    )
    return Response(notifications)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConnectionCreateView(generics.CreateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer


class ConnectionListByReceiverView(generics.ListAPIView):
    serializer_class = ConnectionSerializer

    def get_queryset(self):
        receiver_id = self.kwargs.get(
            "receiver_id")  # Get receiver ID from URL
        # Filter by receiver
        return Connection.objects.filter(receiver_id=receiver_id)
    
class AddProfileView(APIView):
    def post(self, request, id):
        user = get_object_or_404(User, id=id)
        serializer = ProfileUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
