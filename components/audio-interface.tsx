"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Mic, Square } from "lucide-react"

export function AudioInterface() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setRecordingTime(0)
    }
  }

  return (
    <div className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 relative overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)]">
      <h2 className="text-2xl font-bold mb-8">Generate Audio</h2>

      <div className="flex flex-col items-center justify-center min-h-[300px] relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 w-full max-w-md flex flex-col items-center shadow-[0_4px_30px_rgba(139,92,246,0.1)]">
          <div className="mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>

          <p className="text-center mb-4">
            <span className="text-purple-400 font-medium">Drag & drop</span> or{" "}
            <span className="text-purple-400 font-medium cursor-pointer">record</span> your audio
          </p>

          <div className="text-xs text-gray-400 mb-6">
            Supported formats:
            <div className="flex gap-2 mt-2">
              {[".mp3", ".mp3", ".mp3", ".mp3"].map((format, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-purple-900/30 border border-purple-800/30 text-purple-300"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          {isRecording ? (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm">Recording your audio</span>
                </div>
                <div className="text-sm text-gray-400">
                  {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                </div>
              </div>

              <div className="h-12 bg-black/40 rounded-md border border-purple-500/30 mb-4 overflow-hidden">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="flex gap-0.5 items-center h-6">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-purple-500"
                        style={{
                          height: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.5 + 0.5,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-900/20"
                  onClick={toggleRecording}
                >
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-900/20"
              onClick={toggleRecording}
            >
              <Mic className="mr-2 h-4 w-4" />
              Record your audio
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

