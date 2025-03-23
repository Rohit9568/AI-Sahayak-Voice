"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-purple-500/20" : "bg-transparent"
      }`}
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
            <NavLinks />
          </nav>

          <div className="hidden md:flex items-center">
            <Button className="rounded-full bg-purple-700 hover:bg-purple-800 text-white">Join waitlist</Button>
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
                  <NavLinks mobile />
                  <Button className="w-full rounded-full bg-purple-700 hover:bg-purple-800 text-white mt-4">
                    Join waitlist
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const links = [
    { name: "Features", href: "#" },
    { name: "Developers", href: "#" },
    { name: "Company", href: "#" },
    { name: "About", href: "#" },
    { name: "Changelog", href: "#" },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${
            mobile ? "text-lg py-2 block" : "px-3 py-2 text-sm rounded-md hover:bg-white/10"
          } text-gray-300 hover:text-white transition-colors`}
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}

