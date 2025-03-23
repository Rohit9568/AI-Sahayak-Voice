"use client"

import { LayoutDashboard, BarChart2, KeyRound, FileText, Target, Bell, LinkIcon, Zap, Users } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      title: "Lifelike AI Voices",
      description: "Generate realistic and expressive AI voices that closely resemble human speech with natural intonation and emotion.",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: "Voice Cloning",
      description: " Instantly clone voices with high accuracy, preserving tone, pitch, and style for a truly personalized sound.",
    },
    {
      icon: <KeyRound className="w-5 h-5" />,
      title: " Multi-Language Support",
      description: "Convert text to speech in multiple languages and accents, making global communication effortless.",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: " Emotion & Tone Control",
      description: "Adjust voice tone, pitch, and emotion to match different moods like excitement, sadness, or professionalism.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "High-Quality Audio Output",
      description: "Generate studio-quality voiceovers with clean, noise-free audio perfect for professional use.",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Custom Voice Adjustments",
      description: " Modify voice speed, pitch, and style to fit different applications",
    },
    {
      icon: <LinkIcon className="w-5 h-5" />,
      title: " Instant Text-to-Speech Conversion",
      description: "Quickly convert any text into spoken audio with just a few clicks, saving time and effort.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Power your apps with AI voices",
      description: "Seamlessly integrate text-to-speech and voice cloning capabilities into your own applications and services.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Download & Share Options",
      description: "Download your generated voiceovers in multiple formats and share them instantly for various projects.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="features" className="relative z-10 py-24 px-4 md:px-6 mt-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-left max-w-3xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Elevate your
            <br />
            Voice effortlessly.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} className="flex flex-col" variants={item}>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-purple-900/30 text-purple-400">{feature.icon}</div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

