import cv2
import base64
import numpy as np
import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import DiscussionSession
from deepface import DeepFace
from django.conf import settings

# Uses your existing Gemini API Key from settings
genai.configure(api_key=settings.GEMINI_API_KEY)

class StartDiscussion(APIView):
    def post(self, request):
        try:
            model = genai.GenerativeModel('gemini-pro')
            # Modification: Requesting a single topic, no lists.
            prompt = "Give me one single, complex group discussion topic. Do not provide a list. Just the title."
            response = model.generate_content(prompt)
            return Response({
                "topic": response.text.strip(), 
                "session_id": 101
            })
        except:
            return Response({"topic": "Is technology making us less human?"})

class AnalyzeFrame(APIView):
    def post(self, request):
        try:
            data = request.data.get('image').split(',')[1]
            img = cv2.imdecode(np.frombuffer(base64.b64decode(data), np.uint8), cv2.IMREAD_COLOR)
            res = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)
            return Response({"emotion": res[0]['dominant_emotion']})
        except:
            return Response({"error": "fail"})

class InterruptDiscussion(APIView):
    """
    New logic: The AI acts as a moderator and asks 'Why/How/What' 
    based on the current transcript.
    """
    def post(self, request):
        transcript = request.data.get('transcript', '')
        if not transcript:
            return Response({"question": "Please continue, I am listening."})

        try:
            model = genai.GenerativeModel('gemini-pro')
            # Modification: Forcing the AI to interrupt with 'Why', 'What', or 'How'
            prompt = f"""
            The user said: "{transcript}"
            Act as a moderator. Ask exactly one follow-up question starting with 'Why', 'What', or 'How'.
            Be brief and challenging. No lists. Just the question.
            """
            response = model.generate_content(prompt)
            return Response({"question": response.text.strip()})
        except:
            return Response({"question": "How would you explain that point differently?"})

class FinishDiscussion(APIView):
    def post(self, request):
        return Response({
            "status": "completed",
            "report_url": "media/reports/sample.pdf"
        })