import random
from django.core.mail import send_mail
from django.conf import settings
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
        
        user = User.objects.filter(email=email).first()
        
        if user:
            if not user.is_verified:
                # Update password for the unverified user
                user.set_password(password) 
                user.save()
                return Response({"message": "User exists but unverified, proceeding"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "This email is already registered and verified. Please Login."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Hash password automatically via create_user
        User.objects.create_user(email=email, password=password)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class SendOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                otp = str(random.randint(100000, 999999))
                user.otp = otp
                user.save()

                try:
                    # Attempting to send via SMTP
                    send_mail(
                        'AI GD Verification',
                        f'Your code is: {otp}',
                        settings.EMAIL_HOST_USER,
                        [email],
                        fail_silently=False,
                    )
                    print(f"✅ EMAIL SENT: Successfully sent OTP to {email}")
                    return Response({"message": "OTP sent to email"})
                
                except Exception as e:
                    # This captures the 'BadCredentials' or 'Removed' error
                    print("\n--- EMAIL CONFIGURATION ERROR ---")
                    print(f"Error Detail: {e}")
                    print(f"ACTION REQUIRED: Generate a NEW App Password in Google Settings.")
                    print(f"DEBUGGING CODE FOR {email}: {otp}")
                    print("----------------------------------\n")
                    
                    # We return 200 so your React app still moves to the OTP page
                    return Response({
                        "message": "OTP created. Check terminal/email.",
                        "email_status": "failed"
                    }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class VerifyOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        
        # Use .get() or .filter().first() for cleaner matching
        user = User.objects.filter(email=email, otp=otp).first()
        if user:
            user.is_verified = True
            user.otp = None  # Security: Clear OTP after it is used
            user.save()
            return Response({"message": "Verified"})
        
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)