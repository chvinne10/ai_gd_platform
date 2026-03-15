import whisper
import os
import tempfile

model = whisper.load_model("base")


def transcribe_audio(file):

    with tempfile.NamedTemporaryFile(delete=False) as tmp:

        for chunk in file.chunks():
            tmp.write(chunk)

        tmp_path = tmp.name

    result = model.transcribe(tmp_path)

    os.remove(tmp_path)

    return result["text"]