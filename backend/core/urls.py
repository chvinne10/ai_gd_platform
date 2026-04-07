from django.urls import path
from users.views import RegisterUser, LoginUser
from discussion.views import StartDiscussion, AnalyzeFrame, InterruptDiscussion, HR_Evaluation

urlpatterns = [
    # Auth
    path('api/users/register/', RegisterUser.as_view(), name='register'),
    path('api/users/login/', LoginUser.as_view(), name='login'),
    
    # AI Discussion - These names must match Step 1
    path('discussion/start/', StartDiscussion.as_view(), name='start_discussion'),
    path('api/ai/analyze/', AnalyzeFrame.as_view(), name='analyze_ai'),
    path('api/ai/interrupt/', InterruptDiscussion.as_view(), name='interrupt'),
    path('api/ai/evaluate/', HR_Evaluation.as_view(), name='hr_evaluate'),
]