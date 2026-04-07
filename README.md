# 🤖 AI Interview & Group Discussion Mentor

<div align="center">

🚀 An AI-powered web application that simulates real HR interviews and group discussions with intelligent feedback using AI, speech analysis, and facial expression detection.

</div>

---

# 📌 Project Overview

AI Interview & GD Mentor helps users prepare for:
- 🧑‍💼 HR Interviews  
- 👥 Group Discussions  
- 🎯 Communication Skills  

It simulates real-world interview environments and provides detailed feedback based on:
- Speech
- Confidence
- Facial expressions
- Communication clarity

---

# 🎯 Features

## 🧠 AI Interview Simulation
- AI acts like a real HR interviewer  
- Asks dynamic follow-up questions  
- Evaluates your answers  

## 👥 Group Discussion (GD)
- Multiple AI participants  
- Real-time discussion topics  
- Interactive conversation  

## 🎤 Speech Analysis
- Converts voice to text  
- Evaluates:
  - Fluency
  - Clarity
  - Confidence  

## 😊 Facial Expression Analysis
- Detects:
  - Confidence 😐  
  - Nervousness 😰  
  - Engagement 🙂  

## 📊 Feedback Report
- Strengths  
- Weaknesses  
- Suggestions  
- Scores:
  - Confidence Score  
  - Communication Score  

---

# 🏗️ Tech Stack

## Frontend
- React (Vite)
- HTML, CSS, JavaScript

## Backend
- Django
- Django REST Framework

## Database
- MySQL (or SQLite for development)

## AI & ML
- Gemini API → AI conversation & evaluation  
- DeepFace → facial expression analysis  
- Whisper → speech-to-text  

---

# 📁 Project Structure
ai-mentor/
│
├── frontend/ # React app
├── backend/ # Django backend
│ ├── api/ # APIs
│ └── settings.py
│
├── requirements.txt
├── .env
└── README.md

---

# ⚙️ Installation & Setup

## 🔹 1. Clone Project
```bash
git clone <your-repo-link>
cd ai-mentor
2. Backend Setup (Django)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
🔹 3. Frontend Setup (React)
cd frontend
npm install
npm run dev
4. Environment Variables
GEMINI_API_KEY=your_api_key_here
Usage
1.Open browser:
2.http://localhost:5173
3.Start interview
4.Answer questions
5.Get AI feedback
AI Workflow
User speaks 
Speech → Text (Whisper)
AI processes (Gemini)
Response generated
Face analyzed (DeepFace)
Feedback generated
Future Enhancements
🎥 Video recording playback
📈 Advanced analytics dashboard
🧑‍🤝‍🧑 Multi-user GD sessions
🌐 Deployment (AWS / Render)

Limitations
Facial emotion detection is not 100% accurate
Real-time processing may have slight delay
Requires good internet for AI APIs