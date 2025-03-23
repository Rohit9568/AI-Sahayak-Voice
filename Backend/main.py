from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from kokoro import KPipeline
import soundfile as sf
import uuid
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; for security, you can specify ["http://localhost:8000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Language codes mapping
language_codes = {
    "en": "a", "gb": "b", "es": "e", "fr": "f", "hi": "h",
    "it": "i", "pt": "p", "ja": "j", "zh": "z"
}

# Dictionary of voices categorized by gender
top_voices = {
    "a": {"male": ["am_fenrir", "am_michael"], "female": ["af_heart", "af_bella"]},
    "b": {"male": ["bm_fable"], "female": ["bf_emma"]},
    "e": {"male": ["em_alex"], "female": ["ef_dora"]},
    "f": {"male": [], "female": ["ff_siwis"]},
    "h": {"male": ["hm_omega"], "female": ["hf_alpha"]},
    "i": {"male": ["im_nicola"], "female": ["if_sara"]},
    "p": {"male": ["pm_alex"], "female": ["pf_dora"]},
    "j": {"male": ["jm_kumo"], "female": ["jf_alpha"]},
    "z": {"male": ["zm_yunxi"], "female": ["zf_xiaoxiao"]}
}

# Create an "audio" folder if it doesn't exist
if not os.path.exists("audio"):
    os.makedirs("audio")

# Request model
class SpeechRequest(BaseModel):
    lang: str
    gender: str
    text: str

@app.post("/generate_audio/")
async def generate_audio(request: SpeechRequest):
    lang_code = language_codes.get(request.lang)
    if not lang_code:
        raise HTTPException(status_code=400, detail="Invalid language code")

    available_voices = top_voices.get(lang_code, {}).get(request.gender, [])
    if not available_voices:
        raise HTTPException(status_code=400, detail="No voices available for selected language and gender")

    voice = available_voices[0]  # Default to the first available voice

    # Initialize pipeline
    pipeline = KPipeline(lang_code=lang_code)

    # Generate speech
    generator = pipeline(request.text, voice=voice, speed=1, split_pattern=r'\n+')

    # Save audio file
    file_id = str(uuid.uuid4())[:8]  # Generate a short unique filename
    file_path = f"audio/{file_id}.wav"

    for _, _, audio in generator:
        sf.write(file_path, audio, 24000)

    return {"audio_url": f"http://localhost:8000/audio/{file_id}.wav"}

@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = f"audio/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    return FileResponse(file_path, media_type="audio/wav")