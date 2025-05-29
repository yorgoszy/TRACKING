"use client"
import Link from "next/link"
import Image from "next/image"

export function MainLayout() {
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="flex justify-between items-center w-full max-w-[1280px] h-[80px] mx-auto px-6">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>

          {/* Navigation in the center */}
          <nav className="flex space-x-8">
            <Link href="/" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
              home
            </Link>
            <Link
              href="/reserve"
              className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors"
            >
              reserve
            </Link>
            <Link href="/about" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
              about us
            </Link>
          </nav>

          {/* Login on the right */}
          <div>
            <Link href="/login" className="text-sm lowercase font-['Fugaz_One'] hover:text-[#6366f1] transition-colors">
              log in
            </Link>
          </div>
        </div>
      </header>

      {/* First Hero Section */}
      <section className="flex flex-row w-full max-w-[1280px]">
        {/* Left side - Image */}
        <div className="relative w-1/2 h-[480px]">
          <Image src="/boxing-kid.png" alt="Boxing training with kid" fill className="object-cover" />
        </div>

        {/* Right side - Text */}
        <div className="w-1/2 h-[480px] bg-[#ACA097] p-6">
          <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
            LEARN
            <br />
            ABOUT
            <br />
            MOVEMENT
          </h2>

          <div className="mt-8 bg-[#e5e5e5] p-6">
            <p className="text-[22px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
              YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY. EXPLORE THE WORLD WITH US!
            </p>
            <p className="mt-6 text-sm font-['Fugaz_One'] uppercase text-[#25273E]">TRUST THE PROCESS</p>
          </div>
        </div>
      </section>

      {/* Second Hero Section */}
      <section className="flex flex-row w-full max-w-[1280px]">
        {/* Left side - Text */}
        <div className="w-1/2 h-[480px] bg-[#ACA097] p-6">
          <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
            PLAY
            <br />
            TIME IS
            <br />
            OVER
          </h2>

          <div className="mt-8 bg-[#e5e5e5] p-6">
            <p className="text-[22px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
              YOU'RE NOT A KID ANY MORE, YOU'VE GOT ABILITIES, IT'S TIME TO GUIDE YOU ON YOUR PATH
            </p>
          </div>
        </div>

        {/* Right side would have an image in the complete design */}
        <div className="w-1/2 h-[480px] bg-gray-200"></div>
      </section>
    </div>
  )
}
