"use client"
import Link from "next/link"
import Image from "next/image"

export function FullLayout() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="w-full bg-[#f5f5f5] flex justify-between items-center px-6 py-4">
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

      {/* First Hero Section - Learn About Movement */}
      <section className="w-full flex">
        <div className="w-1/2 relative">
          <Image src="/coach-kid-training.png" alt="Coach training kid" fill className="object-cover grayscale" />
        </div>
        <div className="w-1/2 bg-[#ACA097] p-6">
          <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
            LEARN
            <br />
            ABOUT
            <br />
            MOVEMENT
          </h2>
          <div className="mt-8 border border-red-500 p-6">
            <p className="text-[22px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
              YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY. EXPLORE THE WORLD WITH US!
            </p>
            <p className="mt-6 text-sm font-['Fugaz_One'] uppercase text-[#25273E]">TRUST THE PROCESS</p>
          </div>
        </div>
      </section>

      {/* Second Hero Section - Play Time Is Over */}
      <section className="w-full flex">
        <div className="w-1/2 bg-[#ACA097] p-6">
          <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
            PLAY
            <br />
            TIME IS
            <br />
            OVER
          </h2>
          <div className="mt-8 border border-red-500 p-6">
            <p className="text-[22px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
              YOU'RE NOT A KID ANY MORE, YOU'VE GOT ABILITIES, IT'S TIME TO GUIDE YOU ON YOUR PATH
            </p>
          </div>
        </div>
        <div className="w-1/2 relative">
          <Image src="/boxing-adult.png" alt="Adult boxing training" fill className="object-cover grayscale" />
        </div>
      </section>

      {/* Join the Community Section */}
      <section className="w-full bg-white py-6 border-t border-b border-black">
        <h2 className="text-[45px] font-['Fugaz_One'] leading-tight text-center">
          JOIN THE <span className="text-[#808CFD]">COMMUNITY</span>
        </h2>
      </section>

      {/* Expert Coaching Section */}
      <section className="w-full flex bg-[#ACA097]">
        <div className="w-1/2 p-8">
          <h3 className="text-[35px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E] mb-6">
            EXPERT COACHING
          </h3>
          <p className="text-[18px] font-['Fugaz_One'] mb-8">
            Our expert coaches will guide you through personalized training programs designed to help you reach your
            goals.
          </p>
          <h3 className="text-[35px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E] mb-6 mt-12">
            RESULTS-DRIVEN PROGRAMS
          </h3>
          <p className="text-[18px] font-['Fugaz_One'] mb-8">
            Achieve measurable results with our scientifically-backed training methodologies.
          </p>
          <button className="bg-black text-white px-6 py-3 font-['Fugaz_One'] uppercase">Learn More</button>
        </div>
        <div className="w-1/2 relative">
          <Image src="/coach-guidance.png" alt="Coach guidance" fill className="object-cover grayscale" />
        </div>
      </section>

      {/* Athlete Performance Section */}
      <section className="w-full flex bg-[#ACA097]">
        <div className="w-1/2 relative">
          <Image src="/performance-metrics.png" alt="Performance metrics" fill className="object-cover" />
        </div>
        <div className="w-1/2 p-8">
          <h3 className="text-[35px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E] mb-6">
            ATHLETE PERFORMANCE
          </h3>
          <p className="text-[18px] font-['Fugaz_One'] mb-8">
            Track your progress with advanced metrics and personalized feedback.
          </p>
          <div className="border border-red-500 p-6">
            <p className="text-[18px] font-['Fugaz_One'] uppercase text-[#25273E]">
              UNLOCK YOUR FULL POTENTIAL WITH OUR SPECIALIZED TRAINING METHODS
            </p>
            <p className="mt-4 text-sm font-['Fugaz_One'] uppercase text-[#25273E]">TRUST THE PROCESS</p>
          </div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="w-full bg-[#808CFD] py-16 text-center">
        <p className="text-white text-lg mb-2 font-['Fugaz_One']">READY TO LEVEL UP?</p>
        <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-white mb-8">JOIN THE TEAM</h2>
        <button className="bg-black text-white px-8 py-4 font-['Fugaz_One'] uppercase text-xl">Sign Up Now</button>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#f5f5f5] py-12">
        <div className="container mx-auto grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-['Fugaz_One'] mb-6">CONTACT</h4>
            <p className="mb-2">info@performance.com</p>
            <p className="mb-2">+30 210 1234567</p>
            <p className="mb-2">123 Performance Street</p>
            <p>Athens, Greece 12345</p>
          </div>
          <div>
            <h4 className="text-xl font-['Fugaz_One'] mb-6">OPEN HOURS</h4>
            <p className="mb-2">Monday - Friday: 6:00 - 22:00</p>
            <p className="mb-2">Saturday: 8:00 - 20:00</p>
            <p className="mb-2">Sunday: 9:00 - 18:00</p>
          </div>
          <div className="flex justify-end">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-6 border-t border-gray-300 text-center">
          <p className="text-sm">© 2023 Performance Gym. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
