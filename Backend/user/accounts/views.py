from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
import random

User = get_user_model()

@api_view(['GET'])
# @permission_classes([IsAuthenticated])  # Protect the API so only logged-in users can access it
def send_random_profiles(request, user_id):
    # Get all users excluding the given user_id
    users = User.objects.exclude(id=user_id)

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

    def perform_create(self, serializer):
        """Handle file upload properly"""
        user = serializer.save()
        if self.request.FILES.get('photo'):
            user.photo = self.request.FILES['photo']
            user.save()


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
