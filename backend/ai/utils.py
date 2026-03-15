import cv2
import numpy as np
import base64
from deepface import DeepFace

def process_frame(base64_string):
    try:
        # 1. Decode Base64 string to OpenCV image
        format, imgstr = base64_string.split(';base64,')
        nparr = np.frombuffer(base64.b64decode(imgstr), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # 2. Run DeepFace for Emotion
        # we set enforce_detection=False so it doesn't crash if your face moves
        results = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        emotion = results[0]['dominant_emotion']

        # 3. Simple Focus Logic (Check if eyes are visible)
        eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        eyes = eye_cascade.detectMultiScale(gray, 1.3, 5)
        
        is_focused = len(eyes) >= 1 # At least one eye detected
        
        return emotion, is_focused
    except Exception as e:
        print(f"Error processing frame: {e}")
        return "neutral", True