# 🤖 AI Interview & Group Discussion Mentor

<div align="center">

## 🚀 AI-Powered Interview & GD Simulator

An intelligent web application that simulates real HR interviews and group discussions using AI, speech analysis, and facial expression detection.

</div>

---

# 📌 PROJECT OVERVIEW

AI Interview & GD Mentor helps users prepare for:

- 🧑‍💼 HR Interviews  
- 👥 Group Discussions  
- 🎯 Communication Skills  

It simulates real-world interview environments and provides detailed feedback based on:

- 🗣️ Speech  
- 💪 Confidence  
- 😊 Facial Expressions  
- 🧠 Communication Clarity  

---

# 🎯 FEATURES

## 🧠 AI Interview Simulation
- Acts like a real HR interviewer  
- Asks dynamic follow-up questions  
- Evaluates answers in real-time  

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

# 🏗️ TECH STACK

## 🌐 Frontend
- React (Vite)
- HTML, CSS, JavaScript

## ⚙️ Backend
- Django
- Django REST Framework

## 🗄️ Database
- MySQL (or SQLite for development)

## 🤖 AI & ML
- Gemini API → AI conversation & evaluation  
- DeepFace → facial expression analysis  
- Whisper → speech-to-text  

---

# 📁 PROJECT STRUCTURE
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

# ⚙️ INSTALLATION & SETUP

##  STEP 1: Clone Project

```bash
git clone <your-repo-link>
cd ai-mentor
 STEP 2: Setup Backend (Django)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

 Backend runs at:

http://127.0.0.1:8000
 STEP 3: Setup Frontend (React)
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
STEP 4: Environment Variables

Create a .env file inside backend/:

GEMINI_API_KEY=your_api_key_here
USAGE
Open browser
Go to:
http://localhost:5173
Start interview
Answer questions
Get AI feedback
🧠 AI WORKFLOW
User speaks 🎤
Speech → Text (Whisper)
AI processes input (Gemini)
AI generates response
Face analyzed (DeepFace)
Feedback generated 📊
📊 FUTURE ENHANCEMENTS
🎥 Video recording playback
📈 Advanced analytics dashboard
🧑‍🤝‍🧑 Multi-user GD sessions
🌐 Deployment (AWS / Render)
⚠️ LIMITATIONS
Facial emotion detection is not 100% accurate
Real-time processing may have slight delay
Requires stable internet for AI APIs
⭐ SUPPORT

If you like this project:

⭐ Star the repository
🔁 Share with others
👨‍💻 AUTHOR

Developed by me


---

#  What I Fixed & Improved

✅ Proper Markdown formatting (your previous one had broken sections)  
✅ Clean code blocks  
✅ Big headers for GitHub visibility  
✅ Better installation steps  
✅ Professional look (like top GitHub projects)

---

# Next Level (Optional)

If you want, I can upgrade this with:

✔ Badges (stars, tech logos, downloads)  
✔ Screenshots section (VERY important for resume)  
✔ Live demo section  
✔ API documentation  
