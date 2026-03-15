import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("AIzaSyCXrvTVuD93GcxLWhY1LnjMYqWYEru8vvo"))

def analyze_speech_performance(full_transcript):
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    Act as an expert English Communication Coach and Interviewer. 
    Analyze the following transcript from a candidate:
    "{full_transcript}"
    
    Please provide the following in a structured format:
    1. Grammar Correction: List specific sentences that were wrong and provide the correct version.
    2. Tone Analysis: Rate the confidence and professionalism (e.g., "Confident", "Hesitant", "Formal").
    3. Filler Word Count: Detect words like "um", "uh", "like", "basically".
    4. Fluency Score: A percentage from 0-100.
    5. Actionable Tip: One sentence on how to improve.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Analysis failed: {str(e)}"