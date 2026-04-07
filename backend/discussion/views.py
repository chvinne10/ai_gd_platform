import cv2
import base64
import numpy as np
import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from deepface import DeepFace
from django.conf import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class StartDiscussion(APIView):  # <--- MUST MATCH URLS.PY
    def post(self, request):
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = "Give me one single, complex group discussion topic title. No lists."
            response = model.generate_content(prompt)
            return Response({"topic": response.text.strip()})
        except:
            return Response({"topic": "Impact of Artificial Intelligence on Future Careers"})

class AnalyzeFrame(APIView):
    def post(self, request):
        try:
            data = request.data.get('image').split(',')[1]
            img = cv2.imdecode(np.frombuffer(base64.b64decode(data), np.uint8), cv2.IMREAD_COLOR)
            res = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)
            return Response({"emotion": res[0]['dominant_emotion']})
        except:
            return Response({"emotion": "neutral"})

class InterruptDiscussion(APIView):
    def post(self, request):
        transcript = request.data.get('transcript', '')
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = f"The user said: '{transcript}'. Ask one short 'Why' or 'How' question to challenge them."
            response = model.generate_content(prompt)
            return Response({"question": response.text.strip()})
        except:
            return Response({"question": "How would you justify that point?"})

class HR_Evaluation(APIView):
    def post(self, request):
        emotions = request.data.get('emotion_history', [])
        # Simple scoring logic
        positives = sum(1 for e in emotions if e in ['happy', 'neutral', 'surprise'])
        score = (positives / len(emotions)) * 100 if emotions else 75
        return Response({
            "score": round(score, 1),
            "grade": "A" if score > 80 else "B",
            "status": "Selected" if score > 70 else "Waitlisted"
        })