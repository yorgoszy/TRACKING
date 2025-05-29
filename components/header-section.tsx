"use client"
import Link from "next/link"
import Image from "next/image"

export function HeaderSection() {
  return (
    <header className="w-full bg-white flex justify-between items-center px-6 py-4">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </Link>
      </div>

      <nav className="flex space-x-8">
        <Link href="/" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
          home
        </Link>
        <Link href="/reserve" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
          reserve
        </Link>
        <Link href="/about" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
          about us
        </Link>
      </nav>

      <div>
        <Link href="/login" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
          log in
        </Link>
      </div>
    </header>
  )
}
