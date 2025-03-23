"use client"

import type { ReactNode } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { motion } from "framer-motion"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background gradient and patterns */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[80vh] w-full">
          <div className="absolute bottom-[-10%] left-[-10%] right-0 h-[100vh] w-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/80 via-purple-900/50 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-[-5%] right-[-20%] h-[90vh] w-[90vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-fuchsia-600/20 to-transparent rounded-full blur-xl"></div>
        </div>
        <motion.div
          className="absolute inset-0 bg-[url('/waves.svg')] bg-no-repeat bg-cover opacity-60 mix-blend-lighten"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Additional wave patterns */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-full bg-gradient-to-r from-purple-500/0 via-yellow-500/50 to-purple-500/0"
              style={{
                top: `${10 + i * 8}%`,
                left: 0,
                right: 0,
                transform: `rotate(${i % 2 === 0 ? 0.5 : -0.5}deg)`,
              }}
              animate={{
                y: [0, i % 2 === 0 ? 10 : -10, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8 + i * 0.5,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

