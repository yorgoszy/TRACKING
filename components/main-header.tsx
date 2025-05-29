"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#d6cfc2] w-full">
      {/* Desktop Header - 1280px × 124px */}
      <div className="hidden xl:flex justify-between items-center px-12 h-[124px] max-w-[1280px] mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Performance Gym Logo" width={40} height={40} />
          </Link>
        </div>
        <nav className="flex space-x-12">
          <Link href="/features" className="text-sm uppercase font-medium hover:text-[#6366f1] transition-colors">
            Features
          </Link>
          <Link href="/learn-more" className="text-sm uppercase font-medium hover:text-[#6366f1] transition-colors">
            Learn more
          </Link>
          <Link href="/support" className="text-sm uppercase font-medium hover:text-[#6366f1] transition-colors">
            Support
          </Link>
        </nav>
        <div className="flex items-center">
          <Link href="/login" className="text-sm uppercase font-medium">
            Sign in
          </Link>
        </div>
      </div>

      {/* Tablet Header - 800px × 176px */}
      <div className="hidden md:flex xl:hidden justify-between items-center px-8 h-[176px] max-w-[800px] mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Performance Gym Logo" width={36} height={36} />
          </Link>
        </div>
        <nav className="flex space-x-8">
          <Link href="/features" className="text-sm uppercase font-medium hover:text-[#6366f1] transition-colors">
            Features
          </Link>
          <Link href="/learn-more" className="text-sm uppercase font-medium hover:text-[#6366f1] transition-colors">
            Learn more
          </Link>
          <Link href="/support" className="text-sm uppercase font-medium hover:text-[#6366f1] transition-colors">
            Support
          </Link>
        </nav>
        <div className="flex items-center">
          <Link href="/login" className="text-sm uppercase font-medium">
            Sign in
          </Link>
        </div>
      </div>

      {/* Mobile Header - 375px × 333px */}
      <div className="md:hidden flex flex-col w-full max-w-[375px] mx-auto">
        <div className="flex justify-between items-center px-6 h-[80px]">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Performance Gym Logo" width={32} height={32} />
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu - Expands to make total height 333px when open */}
        {isMenuOpen && (
          <nav className="flex flex-col px-6 py-8 h-[253px] border-t border-black">
            <Link
              href="/features"
              className="text-sm uppercase font-medium py-3 hover:text-[#6366f1] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/learn-more"
              className="text-sm uppercase font-medium py-3 hover:text-[#6366f1] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn more
            </Link>
            <Link
              href="/support"
              className="text-sm uppercase font-medium py-3 hover:text-[#6366f1] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/login"
              className="text-sm uppercase font-medium py-3 mt-4 border border-black px-4 text-center hover:bg-black hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
