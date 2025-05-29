"use client"

import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

export default function TrainingSection() {
  const { t } = useLanguage()

  const trainingItems = [t("training.mobility"), t("training.speed"), t("training.strength"), t("training.endurance")]

  return (
    <section id="training" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{t("training.title")}</h2>
            <div className="w-24 h-1 bg-brand mb-8"></div>
            <p className="text-lg text-gray-600 mb-6">{t("training.description")}</p>
            <ul className="space-y-4 mb-8">
              {trainingItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-brand">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-gray-600 mb-6">{t("training.technology")}</p>
            <button className="px-8 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">
              {t("training.button")}
            </button>
          </div>
          <div className="relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%28426%20x%20480%20px%29-WQD3sxJpe4Q77RmokajXKqP3tBrK1L.png"
                alt="Performance tracking technology"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-brand text-black p-6 max-w-xs">
              <p className="text-xl font-bold mb-2">{t("training.advanced")}</p>
              <p>{t("training.realTime")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
