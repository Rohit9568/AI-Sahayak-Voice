"use client"

import type React from "react"

import { Headphones, Clock, Mic } from "lucide-react"
import { motion } from "framer-motion"

export function AudioSidebar() {
  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 h-fit shadow-[0_0_25px_rgba(139,92,246,0.15)]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="uppercase text-xs font-semibold tracking-wider text-purple-300 mb-4">Sahayak</div>

      <nav className="space-y-2">
        <SidebarItem icon={<Headphones className="w-5 h-5" />} label="Audio" active />
        <SidebarItem icon={<Clock className="w-5 h-5" />} label="Audio Generation History" />
        <SidebarItem icon={<Mic className="w-5 h-5" />} label="My Voice Models" />
      </nav>

      <div className="mt-auto pt-8 border-t border-purple-900/20 mt-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
            J
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm">Welcome back</span>
              <span className="text-yellow-500">👋</span>
            </div>
            <div className="font-medium">Prodigal AI</div>
          </div>
        </div>
      </div>
    </motion.div>
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

