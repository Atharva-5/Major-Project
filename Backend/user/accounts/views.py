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
# Protect the API so only logged-in users can access it
#@permission_classes([IsAuthenticated])
def send_random_profiles(request, id):
    # Get all users excluding the given user_id
    users = User.objects.exclude(id=id)

    # Select 10 random users
    random_users = random.sample(list(users), min(10, users.count()))

    # Serialize and return the data
    serializer = UserSerializer(random_users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
