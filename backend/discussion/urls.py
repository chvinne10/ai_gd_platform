from django.urls import path
from .views import StartDiscussion, AnalyzeFrame, FinishDiscussion, InterruptDiscussion

urlpatterns = [
    path('start/', StartDiscussion.as_view(), name='start'),
    path('analyze-frame/', AnalyzeFrame.as_view(), name='analyze'),
    path('interrupt/', InterruptDiscussion.as_view(), name='interrupt'), # New path
    path('finish/', FinishDiscussion.as_view(), name='finish'),
]