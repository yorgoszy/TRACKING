"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

export default function HeroSection() {
  const { language } = useLanguage()

  // Σταθερά αγγλικά κείμενα για το hero section
  const heroTexts = {
    title: "The Champion's Journey",
    titleHighlight: "Starts Here",
    getStarted: "get started",
    contact: "contact",
    scrollDown: "scroll down",
  }

  return (
    <section id="hero" className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/boxing-coach-kid.jpg"
          alt="Boxing coach training a kid in the ring"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-32 md:mt-40">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-roobert">
            {heroTexts.title} <span className="text-[#00ffba]">{heroTexts.titleHighlight}</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#programs"
              className="px-8 py-3 bg-[#00ffba] text-black font-roobert-medium uppercase tracking-wider hover:bg-[#00d69e] transition-colors"
            >
              {heroTexts.getStarted}
            </Link>
            <Link
              href="#contact"
              className="px-8 py-3 border-2 border-white text-white font-roobert-medium uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              {heroTexts.contact}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-white text-sm uppercase tracking-widest mb-2 font-roobert-medium">
            {heroTexts.scrollDown}
          </span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
