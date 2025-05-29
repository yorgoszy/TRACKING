"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export default function ProgramsSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const { t } = useLanguage()

  const programs = [
    {
      id: "01",
      title: t("programs.01.title"),
      description: t("programs.01.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthy%20%285%29-pROfPw5NNcOPTmqt2U6YucoJGsmCPa.png",
    },
    {
      id: "02",
      title: t("programs.02.title"),
      description: t("programs.02.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%28426%20x%20480%20px%29%20%285%29-JbSLdM8vbTecDDIoWInJLnCWkwhO9x.png",
    },
    {
      id: "03",
      title: t("programs.03.title"),
      description: t("programs.03.description"),
      image: "/youth-strength-training.png",
    },
    {
      id: "04",
      title: t("programs.04.title"),
      description: t("programs.04.description"),
      image: "/strength-conditioning-training.png",
    },
    {
      id: "05",
      title: t("programs.05.title"),
      description: t("programs.05.description"),
      image: "/muay-thai-training-bw.jpg",
    },
    {
      id: "06",
      title: t("programs.06.title"),
      description: t("programs.06.description"),
      image: "/one-by-one-training.png",
    },
    {
      id: "07",
      title: t("programs.07.title"),
      description: t("programs.07.description"),
      image: "/athlete-performance-training.png",
    },
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === programs.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? programs.length - 1 : prev - 1))
  }

  const visiblePrograms = () => {
    const result = []
    for (let i = 0; i < 4; i++) {
      const index = (activeSlide + i) % programs.length
      result.push(programs[index])
    }
    return result
  }

  return (
    <section id="programs" className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-roobert">
            {t("programs.title")} <br />
            {t("programs.titleSecond")}
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-[25%] w-px bg-gray-700"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-[50%] w-px bg-gray-700"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-[75%] w-px bg-gray-700"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 w-full mb-8">
            {visiblePrograms().map((program, index) => (
              <div key={program.id} className="text-white px-4">
                <div className="mb-4">
                  <span className="text-[#00ffba] text-xl font-medium">{program.id}</span>
                  <h3 className="text-xl font-bold mt-2">{program.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex absolute right-0 top-[-50px] space-x-2">
            <button
              onClick={prevSlide}
              className="p-4 text-white hover:text-[#00ffba] transition-colors"
              aria-label="Previous program"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 text-white hover:text-[#00ffba] transition-colors"
              aria-label="Next program"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {visiblePrograms().map((program, index) => (
              <Link
                key={program.id}
                href={`/programs/${program.id}`}
                className="relative h-80 overflow-hidden group border-t border-gray-700 cursor-pointer block"
                style={{ borderRight: index < 3 ? "1px solid rgb(55, 65, 81)" : "none" }}
              >
                <Image
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-sm">{program.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex md:hidden justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 text-white hover:text-[#00ffba] transition-colors"
              aria-label="Previous program"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 text-white hover:text-[#00ffba] transition-colors"
              aria-label="Next program"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
