"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Mic, Square } from "lucide-react"
import { motion } from "framer-motion"

export function AudioGenerationShowcase() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setRecordingTime(0)
    }
  }

  return (
    <section className="relative z-10 py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30"></div>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <svg viewBox="0 0 800 400" preserveAspectRatio="none" className="w-full h-full">
            <motion.path
              d="M0,100 C150,200 350,0 500,100 C650,200 750,0 800,100 L800,400 L0,400 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,250 C150,150 350,350 500,250 C650,150 750,350 800,250 L800,400 L0,400 Z"
              fill="none"
              stroke="url(#purple-gradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFA500" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7928CA" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Wave patterns */}
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.3,
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { duration: 2 },
            y: { repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" },
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-purple-500/0 via-yellow-500/30 to-purple-500/0"
              style={{
                top: `${i * 5 + 10}%`,
                transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)`,
                opacity: 0.3 + i * 0.02,
              }}
              animate={{
                y: [0, i % 2 === 0 ? 5 : -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3 + i * 0.2,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <motion.div
            className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 h-fit shadow-[0_0_25px_rgba(139,92,246,0.15)]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="uppercase text-xs font-semibold tracking-wider text-purple-300 mb-4">Sahayak</div>

            <nav className="space-y-2">
              <SidebarItem icon={<AudioIcon className="w-5 h-5" />} label="Audio" active />
              <SidebarItem icon={<ClockIcon className="w-5 h-5" />} label="Audio Generation History" />
              <SidebarItem icon={<MicIcon className="w-5 h-5" />} label="My Voice Models" />
            </nav>
          </motion.div>

          <motion.div
            className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 relative overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
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
                  <span className="text-white">Drag & drop</span> or{" "}
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
                  <div className="flex flex-col gap-4">
                    <Button
                      variant="outline"
                      className="rounded-full border-purple-500 text-purple-400 hover:bg-purple-900/20"
                      onClick={toggleRecording}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Record your audio
                    </Button>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#9333EA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16V12"
                            stroke="#9333EA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 8H12.01"
                            stroke="#9333EA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400">
                        Your voice will be used to generate AI audio that sounds like you
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors ${
        active ? "bg-purple-900/30 text-white" : "text-gray-400 hover:bg-purple-900/20 hover:text-gray-200"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}

function AudioIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8a6 6 0 0 0-9.33-5"></path>
      <path d="m10.67 5.67 1.33-1.33v7.66"></path>
      <circle cx="5" cy="19" r="2"></circle>
      <circle cx="12" cy="19" r="2"></circle>
      <circle cx="19" cy="19" r="2"></circle>
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" x2="12" y1="19" y2="22"></line>
    </svg>
  )
}

