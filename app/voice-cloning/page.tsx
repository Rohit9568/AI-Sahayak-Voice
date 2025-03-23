"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { VoiceCloningInterface } from "@/components/audio/voice-cloning-interface"
import { AudioSidebar } from "@/components/audio/audio-sidebar"
import { motion } from "framer-motion"

export default function VoiceCloningPage() {
  return (
    <MainLayout>
      <motion.div
        className="relative z-10 pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-4">
          <div className="text-sm breadcrumbs text-gray-400">
            <ul>
              <li>Pages</li>
              <li>Profile</li>
            </ul>
          </div>
          <h1 className="text-3xl font-bold">Generate Audio</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-8">
          <AudioSidebar />
          <VoiceCloningInterface />
        </div>
      </motion.div>
    </MainLayout>
  )
}

