"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ClientsSection() {
  return (
    <section className="relative z-10 py-20 px-4 md:px-6 border-t border-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our clients</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Hear firsthand how our voices have boosted online success for users like you.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Grid lines for design */}
          <div className="absolute inset-0 grid grid-cols-3 pointer-events-none">
            <div className="border-l border-purple-900/20 h-full"></div>
            <div className="border-l border-purple-900/20 h-full"></div>
            <div className="border-l border-purple-900/20 h-full"></div>
            <div className="border-r border-purple-900/20 h-full"></div>
          </div>
          <div className="absolute inset-0 grid grid-rows-3 pointer-events-none">
            <div className="border-t border-purple-900/20 w-full"></div>
            <div className="border-t border-purple-900/20 w-full"></div>
            <div className="border-t border-purple-900/20 w-full"></div>
            <div className="border-b border-purple-900/20 w-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 p-6 relative">
            <div className="w-40 h-40 rounded-lg overflow-hidden bg-purple-500/30 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-purple-800/80"></div>
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Talia Taylor"
                width={160}
                height={160}
                className="mix-blend-overlay"
              />
            </div>

            <div className="flex-1">
              <blockquote className="text-2xl font-medium mb-4">
                "Revolutionized the way we approach voice modulation at Stellar Sounds. The cloning and voice editing features are top-notch, allowing us to create dynamic and unique vocal tracks."
              </blockquote>
              <div>
                <p className="font-semibold">Rohit Sharma</p>
                <p className="text-sm text-gray-400">Digital Marketing Director @ Quantum</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

