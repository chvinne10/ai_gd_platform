from django.urls import path
from .views import SendOTP, VerifyOTP, RegisterUser

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('send-otp/', SendOTP.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify-otp'),
]