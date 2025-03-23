"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Play, X } from "lucide-react";
import { motion } from "framer-motion";

// Replace with your actual public ngrok URL printed from your backend
const API_URL = "https://1ed6-34-106-125-95.ngrok-free.app";

export function TextToSpeechInterface() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [gender, setGender] = useState("male");
  const [translatedText, setTranslatedText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (text.trim()) {
      detectLanguage(text);
    }
  }, [text]);

  const detectLanguage = async (inputText) => {
    try {
      const response = await fetch(`${API_URL}/detect_language/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) {
        throw new Error(`Failed to detect language: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Detected language:", data.language);
      const supportedLanguages = ["en", "es", "fr", "hi", "it", "pt", "ja", "zh-cn", "zh-tw"];
      setLanguage(supportedLanguages.includes(data.language) ? data.language : "en");
    } catch (error) {
      console.error("Error detecting language:", error);
    }
  };

  const handleGenerateAudio = async () => {
    if (!text) {
      alert("Please enter some text!");
      return;
    }
    setLoading(true);
    setTranslatedText("");
    setAudioUrl("");
    try {
      // Call the translate_and_tts endpoint
      const response = await fetch(`${API_URL}/translate_and_tts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, target_language: language, gender }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Received data:", data);

      // Use the audio URL returned from the backend directly
      setTranslatedText(data.translated_text);
      setAudioUrl(data.audio_url);
    } catch (error) {
      console.error("Failed to generate audio:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setTranslatedText("");
    setAudioUrl("");
  };

  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate and convert to speech..."
        className="mb-4 w-full h-32"
      />

      <div className="flex gap-4 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-purple-500 rounded-lg px-4 py-2 bg-gray-800 text-white"
          disabled={loading}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ja">Japanese</option>
          <option value="zh-cn">Chinese (Simplified)</option>
          <option value="zh-tw">Chinese (Traditional)</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border border-purple-500 rounded-lg px-4 py-2 bg-gray-800 text-white"
          disabled={loading}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleGenerateAudio}
          disabled={loading}
          className={`bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Generating..." : "Generate Audio"}
        </Button>

        {audioUrl && (
          <Button
            onClick={() => window.open(audioUrl, "_blank")}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <Play className="w-4 h-4 mr-2" /> Play
          </Button>
        )}

        {audioUrl && (
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.href = audioUrl;
              link.download = "output.wav";
              link.click();
            }}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        )}

        <Button
          onClick={handleClear}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <X className="w-4 h-4 mr-2" /> Clear
        </Button>
      </div>

      {translatedText && (
        <div className="mt-4 p-4 border border-purple-500 rounded-lg bg-gray-800 text-white">
          <strong>Translated Text:</strong>
          <p>{translatedText}</p>
        </div>
      )}
    </motion.div>
  );
}
