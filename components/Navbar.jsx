"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: t("nav.home"), href: "#hero" },
    { name: t("nav.programs"), href: "#programs" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.results"), href: "#testimonials" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "el" : "en")
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md py-5" : "bg-black py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Layout - Three Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center w-full">
          {/* Left Column - Logo */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hyperkids%20%2813.229%20x%205%20cm%29-PPCTFjbChru7PqwMUnOZLEhwpMo87V.png"
                alt="hyperkids Logo"
                width={132}
                height={50}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Center Column - Navigation */}
          <nav className="flex items-center justify-center space-x-8 whitespace-nowrap">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`font-roobert-medium text-sm hover:text-brand transition-colors whitespace-nowrap ${
                  isScrolled ? "text-white" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Column - Language toggle and Login */}
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-white hover:text-brand transition-colors font-roobert-medium text-sm rounded"
            >
              {language === "en" ? "gr" : "en"}
            </button>
            <Link
              href="/login"
              className="px-6 py-2 bg-brand text-black font-roobert-medium text-sm hover:bg-brand-dark transition-colors"
            >
              {t("nav.login")}
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hyperkids%20%2813.229%20x%205%20cm%29-PPCTFjbChru7PqwMUnOZLEhwpMo87V.png"
              alt="hyperkids Logo"
              width={132}
              height={50}
              className="h-auto"
            />
          </Link>

          <button className="text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <span className="text-white">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black w-full py-4 shadow-md">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="font-roobert-medium text-sm text-white hover:text-brand transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLanguage()
                setIsMobileMenuOpen(false)
              }}
              className="px-4 py-2 text-white hover:text-brand transition-colors font-roobert-medium text-sm text-left"
            >
              {language === "en" ? "ελληνικά" : "english"}
            </button>
            <Link
              href="/login"
              className="px-6 py-2 bg-brand text-black font-roobert-medium text-sm hover:bg-brand-dark transition-colors inline-block text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
