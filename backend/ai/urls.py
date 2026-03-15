from django.urls import path
from .views import analyze_frame, get_live_topic # and your other views

urlpatterns = [
    path('analyze-frame/', analyze_frame, name='analyze_frame'),
    path('topic/', get_live_topic, name='get_topic'),
]