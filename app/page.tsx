"use client"

import { MainLayout } from "@/components/layouts/main-layout"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ClientsSection } from "@/components/sections/clients-section"
import { EmailSignupSection } from "@/components/sections/email-signup-section"
import { AudioGenerationShowcase } from "@/components/sections/audio-generation-showcase"

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Audio Generation Showcase */}
      <AudioGenerationShowcase />

      {/* Features Section */}
      <FeaturesSection />

      {/* Clients Section */}
      <ClientsSection />

      {/* Email Signup Section */}
      <EmailSignupSection />
    </MainLayout>
  )
}

