"use client"

import Link from "next/link"
import { Twitter, Instagram, Youtube } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const footerLinks = {
    Product: ["Features", "Integration", "Updates", "FAQ", "Pricing"],
    Company: ["About", "Blog", "Careers", "Manifesto", "Press", "Contract"],
    Resources: ["Examples", "Community", "Guides", "Docs", "Press"],
    Legal: ["Privacy", "Terms", "Security"],
  }

  return (
    <motion.footer
      className="relative z-10 pt-20 pb-10 px-4 md:px-6 border-t border-purple-900/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <span className="ml-2 text-lg font-semibold">Sahayak</span>
            </Link>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-900/20">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Sahayak. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

