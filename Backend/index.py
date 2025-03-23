from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse, JSONResponse
from pathlib import Path
from pyngrok import ngrok
import subprocess

# Initialize FastAPI app
app = FastAPI()

# Define paths
OUTPUT_DIR = Path("/content/output")
OUTPUT_DIR.mkdir(exist_ok=True, parents=True)

# ngrok setup
ngrok.set_auth_token("YOUR_NGROK_AUTH_TOKEN")
public_url = ngrok.connect(8000).public_url
print(f"Public URL: {public_url}")

@app.get("/")
def home():
    return {"message": "AI Voice Cloning API is running!"}

@app.post("/generate_tts/")
async def generate_tts(
    ref_text: str = Form(...),
    gen_text: str = Form(...),
    ref_audio: UploadFile = None
):
    try:
        # Save the uploaded reference audio file
        if ref_audio:
            ref_audio_path = OUTPUT_DIR / ref_audio.filename
            with open(ref_audio_path, "wb") as f:
                f.write(await ref_audio.read())
        else:
            return JSONResponse(content={"error": "Reference audio file is required"}, status_code=400)

        output_audio_path = OUTPUT_DIR / "generated_output.wav"

        # Run the voice cloning command
        command = [
            "f5-tts_infer-cli", "--model", "F5TTS_v1_Base",
            "--ref_audio", str(ref_audio_path),
            "--ref_text", ref_text,
            "--gen_text", gen_text
        ]
        subprocess.run(command, check=True)

        # Return generated audio file
        if output_audio_path.exists():
            return FileResponse(output_audio_path, filename="generated_output.wav")
        else:
            return JSONResponse(content={"error": "Generated audio file not found"}, status_code=500)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Start FastAPI server
import uvicorn
import threading

def run_server():
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Run FastAPI server in a separate thread
threading.Thread(target=run_server).start()
