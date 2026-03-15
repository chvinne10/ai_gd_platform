from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import process_frame # Import the logic we just wrote

@api_view(['POST'])
def analyze_frame(request):
    image_data = request.data.get('image')
    
    if not image_data:
        return Response({"error": "No image provided"}, status=400)

    # Call our AI logic
    emotion, is_focused = process_frame(image_data)

    # AI Moderator Logic
    warning = None
    if not is_focused:
        warning = "AI Host: Please focus on the screen."
    elif emotion in ['angry', 'fear']:
        warning = "AI Host: Try to stay calm and confident."

    return Response({
        "emotion": emotion,
        "is_focused": is_focused,
        "warning": warning
    })