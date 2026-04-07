import os
import cv2
import numpy as np
import base64
import google.generativeai as genai
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from deepface import DeepFace

# Configure Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

class AIDiscussionAnalysis(APIView):
    def post(self, request):
        image_data = request.data.get('image') # Base64 string from React
        transcript = request.data.get('transcript', "")
        
        try:
            # 1. Analyze Emotion using DeepFace
            # Decode base64 image
            format, imgstr = image_data.split(';base64,') 
            nparr = np.frombuffer(base64.b64decode(imgstr), np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Analyze (enforce_detection=False prevents crashing if face isn't clear)
            analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            dominant_emotion = analysis[0]['dominant_emotion']

            # 2. Get AI Feedback via Gemini
            prompt = f"The user is in a group discussion. Current transcript: '{transcript}'. " \
                     f"Detected emotion: {dominant_emotion}. Give a 1-sentence feedback or a follow-up question."
            
            ai_response = model.generate_content(prompt)
            
            return Response({
                "emotion": dominant_emotion,
                "ai_suggestion": ai_response.text,
                "status": "success"
            })
        except Exception as e:
            return Response({"error": str(e)}, status=400)

class GenerateTopic(APIView):
    def post(self, request):
        prompt = "Generate a challenging Group Discussion topic related to Technology, Society, or Agriculture."
        response = model.generate_content(prompt)
        return Response({"topic": response.text})