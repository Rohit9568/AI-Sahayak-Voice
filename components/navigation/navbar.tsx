"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-purple-500/20" : "bg-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <span className="ml-2 text-lg font-semibold">Sahayak</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 text-sm rounded-md hover:bg-white/10 ${
                pathname === "/" ? "text-white" : "text-gray-300"
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-white/10 ${
                    pathname.includes("/text-to-speech") || pathname.includes("/voice-cloning")
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                >
                  Features <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border border-purple-500/20 backdrop-blur-lg">
                <DropdownMenuItem asChild>
                  <Link href="/text-to-speech" className="cursor-pointer">
                    Text to Speech
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/voice-cloning" className="cursor-pointer">
                    Voice Cloning
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="#" className="px-3 py-2 text-sm rounded-md hover:bg-white/10 text-gray-300">
              Developers
            </Link>
            <Link href="#" className="px-3 py-2 text-sm rounded-md hover:bg-white/10 text-gray-300">
              Company
            </Link>
            <Link href="#" className="px-3 py-2 text-sm rounded-md hover:bg-white/10 text-gray-300">
             About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="h-9 w-64 rounded-full bg-black/40 border border-purple-500/30 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <Button className="rounded-full bg-purple-700 hover:bg-purple-800 text-white">Sign In</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-purple-900/30">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg py-2 block text-gray-300 hover:text-white">
                    Home
                  </Link>
                  <div className="py-2">
                    <div className="text-lg mb-2 text-gray-300">Features</div>
                    <div className="pl-4 flex flex-col gap-2">
                      <Link href="/text-to-speech" className="text-md py-1 block text-gray-400 hover:text-white">
                        Text to Speech
                      </Link>
                      <Link href="/voice-cloning" className="text-md py-1 block text-gray-400 hover:text-white">
                        Voice Cloning
                      </Link>
                    </div>
                  </div>
                  <Link href="#" className="text-lg py-2 block text-gray-300 hover:text-white">
                    Developers
                  </Link>
                  <Link href="#" className="text-lg py-2 block text-gray-300 hover:text-white">
                    Company
                  </Link>
                  <Link href="#" className="text-lg py-2 block text-gray-300 hover:text-white">
                    About
                  </Link>
                  <Button className="w-full rounded-full bg-purple-700 hover:bg-purple-800 text-white mt-4">
                    Sign In
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

