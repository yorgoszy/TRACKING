"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

export function MainHeaderNew() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white">
      {/* Desktop Header - 1280px × 124px */}
      <div className="hidden xl:flex justify-between items-center w-[1280px] h-[124px] mx-auto px-6">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex space-x-12">
          <Link
            href="/features"
            className="text-sm uppercase font-['Anek_Tamil'] font-medium hover:text-[#6366f1] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/learn-more"
            className="text-sm uppercase font-['Anek_Tamil'] font-medium hover:text-[#6366f1] transition-colors"
          >
            Learn more
          </Link>
          <Link
            href="/support"
            className="text-sm uppercase font-['Anek_Tamil'] font-medium hover:text-[#6366f1] transition-colors"
          >
            Support
          </Link>
        </nav>
      </div>

      {/* Tablet Header - 800px × 130px */}
      <div className="hidden md:flex xl:hidden justify-between items-center w-[800px] h-[130px] mx-auto px-6">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex space-x-8">
          <Link
            href="/features"
            className="text-sm uppercase font-['Anek_Tamil'] font-medium hover:text-[#6366f1] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/learn-more"
            className="text-sm uppercase font-['Anek_Tamil'] font-medium hover:text-[#6366f1] transition-colors"
          >
            Learn more
          </Link>
          <Link
            href="/support"
            className="text-sm uppercase font-['Anek_Tamil'] font-medium hover:text-[#6366f1] transition-colors"
          >
            Support
          </Link>
        </nav>
      </div>

      {/* Mobile Header - 375px × 280px */}
      <div className="md:hidden flex flex-col w-[375px] mx-auto">
        <div className="flex justify-between items-center px-6 h-[80px]">
          {/* Logo on the left for mobile */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </Link>
          </div>

          {/* Empty space in the middle */}
          <div className="flex-1"></div>

          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu - Expands to make total height 280px when open */}
        {isMenuOpen && (
          <nav className="flex flex-col px-6 py-8 h-[200px] border-t border-black">
            <Link
              href="/features"
              className="text-sm uppercase font-['Anek_Tamil'] font-medium py-3 hover:text-[#6366f1] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/learn-more"
              className="text-sm uppercase font-['Anek_Tamil'] font-medium py-3 hover:text-[#6366f1] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn more
            </Link>
            <Link
              href="/support"
              className="text-sm uppercase font-['Anek_Tamil'] font-medium py-3 hover:text-[#6366f1] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/login"
              className="text-sm uppercase font-['Anek_Tamil'] font-medium py-3 mt-4 border border-black px-4 text-center hover:bg-black hover:text-white transition-colors"
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
