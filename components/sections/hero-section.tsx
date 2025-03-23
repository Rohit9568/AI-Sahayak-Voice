"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <motion.section
      className="relative z-10 pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-purple-900/80 text-purple-200 backdrop-blur-sm border border-purple-700/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          NEW Latest integration just arrived
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          AI Voice Generator : Text to Speech, 
          
          Natural Voices, Customizable
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
         Effortlessly create lifelike, high-quality audio. Convert text to speech, clone voices, and produce realistic sound for your projects in minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10"
        >
          <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-gray-200 transition-all">
            Start for free
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}

