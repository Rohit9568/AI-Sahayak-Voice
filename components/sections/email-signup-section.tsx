"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function EmailSignupSection() {
  return (
    <motion.section
      className="relative z-10 py-20 px-4 md:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-black/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-10 md:p-16 shadow-[0_0_40px_rgba(139,92,246,0.2)] text-center"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
          The future of voice is here 
            <br />
            and it's yours.
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
            <Input
              type="email"
              placeholder="Your email"
              className="bg-black/50 border-purple-900/50 rounded-full h-12 px-5"
            />
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 h-12 px-6">Join waitlist</Button>
          </div>

          <p className="text-sm text-gray-400">No credit card required · 7-days free trial</p>
        </motion.div>
      </div>
    </motion.section>
  )
}

