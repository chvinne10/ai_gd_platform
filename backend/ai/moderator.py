import time

class AIModerator:
    def __init__(self):
        self.speaking_start_time = None
        self.is_focused = True
        self.max_speaking_seconds = 120 # 2-minute limit per turn

    def analyze_state(self, is_focused, transcript_chunk):
        warnings = []
        
        # 1. Focus Check (From your OpenCV script)
        if not is_focused:
            warnings.append("AI MODERATOR: Please maintain eye contact with the camera.")
            
        # 2. "Speaking Too Much" Check
        if transcript_chunk:
            if self.speaking_start_time is None:
                self.speaking_start_time = time.time()
            
            elapsed = time.time() - self.speaking_start_time
            if elapsed > self.max_speaking_seconds:
                warnings.append("AI MODERATOR: You have exceeded your time. Please wrap up so others can speak.")
        else:
            self.speaking_start_time = None # Reset if they stop talking

        return warnings

# Example Usage with Socket.io
# socketio.emit('moderator_warning', {'messages': warnings})