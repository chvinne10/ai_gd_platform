from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User

class RegisterUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered. Please Login."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create user and set verified to True so they can log in immediately
        user = User.objects.create_user(email=email, password=password)
        user.is_verified = True 
        user.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class LoginUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = User.objects.filter(email=email).first()
        
        if user and user.check_password(password):
            return Response({"message": "Login successful", "email": user.email}, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid Email or Password"}, status=status.HTTP_401_UNAUTHORIZED)