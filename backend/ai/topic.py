import random

topics = [
"AI in education",
"Is social media harmful",
"Future of jobs",
"Climate change",
"Online learning vs classroom",
"Space technology",
"Cryptocurrency future",
"Electric vehicles"
]

def generate_topic():
    return random.choice(topics)
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("AIzaSyCXrvTVuD93GcxLWhY1LnjMYqWYEru8vvo")
)


def generate_topic():

    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = """
    Generate one professional interview discussion topic.
    Only return topic text.
    """

    response = model.generate_content(prompt)

    return response.text.strip()