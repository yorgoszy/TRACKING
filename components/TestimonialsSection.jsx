"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

export default function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Professional Basketball Player",
      quote:
        "The training program at Performance has completely transformed my game. I've gained strength, speed, and my recovery time has improved significantly.",
      image: "/testimonial-1.png",
    },
    {
      name: "Maria Rodriguez",
      role: "Olympic Swimmer",
      quote:
        "Working with the Performance team has been a game-changer for my career. Their personalized approach and attention to detail have helped me break multiple personal records.",
      image: "/testimonial-2.png",
    },
    {
      name: "David Chen",
      role: "MMA Fighter",
      quote:
        "The comprehensive training and recovery protocols at Performance have not only improved my performance but also extended my career by keeping me injury-free.",
      image: "/testimonial-3.png",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="testimonials" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto">{t("testimonials.description")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative h-[400px] overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 flex flex-col md:flex-row items-center ${
                    activeIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden border-4 border-brand">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-10">
                    <blockquote className="text-xl italic mb-6">"{testimonial.quote}"</blockquote>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-brand">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeIndex === index ? "bg-brand" : "bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
