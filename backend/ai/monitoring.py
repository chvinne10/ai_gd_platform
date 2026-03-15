import cv2
from deepface import DeepFace
import numpy as np

# Load OpenCV's built-in face and eye detectors
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

def start_ai_monitoring():
    cap = cv2.VideoCapture(0) # Start Webcam

    while True:
        ret, frame = cap.read()
        if not ret: break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            roi_gray = gray[y:y+h, x:x+w]
            roi_color = frame[y:y+h, x:x+w]

            # 1. Analyze Emotion using DeepFace
            try:
                results = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                emotion = results[0]['dominant_emotion']
                cv2.putText(frame, f"Emotion: {emotion}", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            except:
                pass

            # 2. Track Eyes for "Focus"
            eyes = eye_cascade.detectMultiScale(roi_gray)
            if len(eyes) < 2:
                cv2.putText(frame, "STATUS: DISTRACTED / NOT LOOKING", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
            else:
                cv2.putText(frame, "STATUS: FOCUSED", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)

        cv2.imshow('AI Interviewer - Monitoring Active', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    start_ai_monitoring()