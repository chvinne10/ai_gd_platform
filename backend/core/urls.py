from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # The Django Admin Panel
    path('admin/', admin.site.urls),
    
    # Links to your Users App (Login, Register, OTP)
    path('api/users/', include('users.urls')),
    
    # Links to your Discussion App (DeepFace, Gemini, Results)
    path('discussion/', include('discussion.urls')),
]