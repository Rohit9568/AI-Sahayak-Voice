"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Mic, Square, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

// Convert recorded blob (in WebM/Opus) to WAV using Web Audio API.
async function convertBlobToWav(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const numOfChan = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const samples = audioBuffer.length;
  
  // Calculate buffer length: 44 bytes for header + samples * channels * 2 bytes per sample
  const bufferLength = 44 + samples * numOfChan * 2;
  const buffer = new ArrayBuffer(bufferLength);
  const view = new DataView(buffer);

  // Write WAV header
  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  let offset = 0;
  writeString(view, offset, "RIFF"); offset += 4;
  view.setUint32(offset, bufferLength - 8, true); offset += 4;
  writeString(view, offset, "WAVE"); offset += 4;
  writeString(view, offset, "fmt "); offset += 4;
  view.setUint32(offset, 16, true); offset += 4; // Subchunk1Size (16 for PCM)
  view.setUint16(offset, 1, true); offset += 2; // AudioFormat (1 for PCM)
  view.setUint16(offset, numOfChan, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * numOfChan * 2, true); offset += 4;
  view.setUint16(offset, numOfChan * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2; // Bits per sample
  writeString(view, offset, "data"); offset += 4;
  view.setUint32(offset, bufferLength - offset - 4, true); offset += 4;

  // Write interleaved PCM samples
  const channels = [];
  for (let i = 0; i < numOfChan; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }

  for (let i = 0; i < samples; i++) {
    for (let channel = 0; channel < numOfChan; channel++) {
      let sample = channels[channel][i];
      sample = Math.max(-1, Math.min(1, sample));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset, sample, true);
      offset += 2;
    }
  }
  return new Blob([view], { type: "audio/wav" });
}

export function VoiceCloningInterface() {
  // State variables
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [responseAudioUrl, setResponseAudioUrl] = useState<string | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Provided ngrok endpoint (update with your live URL)
  const ngrokURL = "https://0947-34-169-110-195.ngrok-free.app/tts";

  // Clear all states
  const clearAll = () => {
    setText("");
    setLanguage("en");
    setAudioBlob(null);
    setAudioPreviewUrl(null);
    setFile(null);
    setFilePreviewUrl(null);
    setResponseAudioUrl(null);
  };

  // Check if there is any audio input device available
  const checkAudioInputDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some((device) => device.kind === "audioinput");
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      const hasAudioInput = await checkAudioInputDevices();
      if (!hasAudioInput) {
        throw new Error("No audio input device found.");
      }

      // Clear previous response when starting new recording
      setResponseAudioUrl(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        // Convert the recorded blob to WAV
        convertBlobToWav(blob).then((wavBlob) => {
          setAudioBlob(wavBlob);
          setAudioPreviewUrl(URL.createObjectURL(wavBlob));
        });
        // Clear any uploaded file preview if exists
        setFile(null);
        setFilePreviewUrl(null);
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      const timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Clear timer when recording stops
      mediaRecorder.current.addEventListener("stop", () => {
        clearInterval(timer);
        setIsRecording(false);
      });
    } catch (error) {
      console.error("Error starting recording:", error);
      alert(
        "Error starting recording. Please check microphone permissions or device availability."
      );
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
    }
  };

  // Handle file selection for upload and show preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreviewUrl(URL.createObjectURL(selectedFile));
      // Clear any recorded audio if a file is chosen and previous response
      setAudioBlob(null);
      setAudioPreviewUrl(null);
      setResponseAudioUrl(null);
    }
  };

  // Trigger file input when clicking the upload button
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Send audio to backend – requires the user to provide a speaker file
  const sendAudio = async () => {
    // Ensure a speaker file is provided (either recorded or uploaded)
    if (!audioBlob && !file) {
      alert("Please record or upload your speaker audio first.");
      return;
    }

    const formData = new FormData();
    // Always attach the user-provided speaker file under "speaker_wav"
    if (audioBlob) {
      formData.append("speaker_wav", audioBlob, "recorded_audio.wav");
    } else if (file) {
      formData.append("speaker_wav", file);
    }
    formData.append("text", text);
    formData.append("language", language);

    try {
      const response = await fetch(ngrokURL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to send audio");
      }
      // Assuming the backend returns an audio blob as a response
      const audioData = await response.blob();
      setResponseAudioUrl(URL.createObjectURL(audioData));
      alert("Audio sent successfully!");
    } catch (error) {
      console.error("Error sending audio:", error);
      alert("Failed to send audio.");
    }
  };

  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 relative overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Text and Language Inputs */}
      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="w-full p-2 rounded border border-purple-500 bg-black/40 text-white"
        />
      </div>
      <div className="mb-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 rounded border border-purple-500 bg-black/40 text-white"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Record or Upload Controls */}
      <div className="flex justify-center gap-4">
        {isRecording ? (
          <Button onClick={stopRecording} className="bg-red-500 text-white">
            <Square className="mr-2 h-4 w-4" /> Stop Recording
          </Button>
        ) : (
          <Button onClick={startRecording} className="bg-green-500 text-white">
            <Mic className="mr-2 h-4 w-4" /> Record Audio
          </Button>
        )}
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <Button onClick={handleUploadClick} className="bg-blue-500 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload Audio
        </Button>
      </div>

      {/* Show Recording Time */}
      {isRecording && (
        <div className="text-center mt-2 text-gray-400">
          Recording: {Math.floor(recordingTime / 60)}:
          {(recordingTime % 60).toString().padStart(2, "0")}
        </div>
      )}

      {/* Preview for Recorded Audio */}
      {audioPreviewUrl && (
        <div className="mt-4">
          <p className="text-gray-400">Recorded Audio Preview:</p>
          <audio controls src={audioPreviewUrl} className="w-full" />
        </div>
      )}

      {/* Preview for Uploaded Audio */}
      {filePreviewUrl && (
        <div className="mt-4">
          <p className="text-gray-400">Uploaded Audio Preview: {file?.name}</p>
          <audio controls src={filePreviewUrl} className="w-full" />
        </div>
      )}

      {/* Buttons for Sending Audio and Clearing All */}
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={sendAudio} className="bg-purple-500 text-white">
          Clone Audio
        </Button>
        <Button onClick={clearAll} className="bg-gray-500 text-white">
          <Trash2 className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      {/* Display and Auto-Play Backend Response Audio */}
      {responseAudioUrl && (
        <div className="mt-4 text-center">
          <p className="text-gray-400">Cloned Audio:</p>
          <audio controls autoPlay src={responseAudioUrl} className="w-full" />
        </div>
      )}
    </motion.div>
  );
}