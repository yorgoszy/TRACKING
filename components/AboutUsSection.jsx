"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

export default function AboutUsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useLanguage()

  const tabs = [
    {
      id: "who-we-are",
      label: t("about.tab1"),
      number: "01",
      title: t("about.headCoach.title"),
      description: t("about.headCoach.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%283%29-QL7NMzkvg4ZjsbfomgTbHHPk2t72BP.png",
    },
    {
      id: "methodology",
      label: t("about.tab2"),
      number: "02",
      title: t("about.vision.title"),
      description: t("about.vision.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29-9GbohmNG38P7nmosmXXrDtYkVTeAdv.png",
    },
    {
      id: "community",
      label: t("about.tab3"),
      number: "03",
      title: t("about.methodology.title"),
      description: t("about.methodology.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281150%20x%20650%20px%29%20%281%29-hOOJo0ADupFn1MtPh6evcHtsxHvUJV.png",
    },
  ]

  return (
    <section id="about" className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Navigation */}
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <span className="text-[#00ffba] text-sm uppercase tracking-wider mb-3 block">{t("about.subtitle")}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                Supporting Your <span className="text-[#00ffba]">Athletic Journey</span>
              </h2>

              <div className="space-y-6 mt-12">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center w-full text-left transition-all duration-300 group ${
                      activeTab === index ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <span
                      className={`text-[#00ffba] font-medium mr-4 transition-all duration-300 ${
                        activeTab === index ? "text-2xl" : "text-xl group-hover:text-2xl"
                      }`}
                    >
                      {tab.number}
                    </span>
                    <div>
                      <h3
                        className={`font-bold transition-all duration-300 ${
                          activeTab === index ? "text-xl" : "text-lg"
                        }`}
                      >
                        {tab.label}
                      </h3>
                      <div
                        className={`h-0.5 bg-[#00ffba] mt-2 transition-all duration-300 ${
                          activeTab === index ? "w-full" : "w-0 group-hover:w-1/2"
                        }`}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:w-2/3">
            <div className="relative">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`transition-all duration-500 ${
                    activeTab === index ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <div className="relative h-[400px] md:h-[500px] mb-8 overflow-hidden group">
                    <Image
                      src={tab.image || "/placeholder.svg"}
                      alt={tab.title}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105`}
                      style={
                        tab.id === "who-we-are"
                          ? { objectPosition: "center center" }
                          : tab.id === "methodology"
                            ? { objectPosition: "center center" }
                            : {}
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-[#00ffba] text-4xl font-bold mr-4">{tab.number}</span>
                        <div className="h-px bg-[#00ffba] flex-grow"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-4">{tab.title}</h3>
                  <p className="text-lg text-gray-300 mb-8">{tab.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {activeTab === 0 && (
                      <>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.headCoach.box1.title")}</h4>
                          <p className="text-gray-400">{t("about.headCoach.box1.description")}</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.headCoach.box2.title")}</h4>
                          <p className="text-gray-400">{t("about.headCoach.box2.description")}</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.headCoach.box3.title")}</h4>
                          <p className="text-gray-400">{t("about.headCoach.box3.description")}</p>
                        </div>
                      </>
                    )}

                    {activeTab === 1 && (
                      <>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.vision.box1.title")}</h4>
                          <p className="text-gray-400">{t("about.vision.box1.description")}</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.vision.box2.title")}</h4>
                          <p className="text-gray-400">{t("about.vision.box2.description")}</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.vision.box3.title")}</h4>
                          <p className="text-gray-400">{t("about.vision.box3.description")}</p>
                        </div>
                      </>
                    )}

                    {activeTab === 2 && (
                      <>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.methodology.box1.title")}</h4>
                          <ul className="text-gray-400 space-y-2 list-disc pl-5">
                            <li>{t("about.methodology.box1.item1")}</li>
                            <li>{t("about.methodology.box1.item2")}</li>
                            <li>{t("about.methodology.box1.item3")}</li>
                          </ul>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.methodology.box2.title")}</h4>
                          <ul className="text-gray-400 space-y-2 list-disc pl-5">
                            <li>{t("about.methodology.box2.item1")}</li>
                            <li>{t("about.methodology.box2.item2")}</li>
                            <li>{t("about.methodology.box2.item3")}</li>
                            <li>{t("about.methodology.box2.item4")}</li>
                          </ul>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-sm border-l-2 border-[#00ffba]">
                          <h4 className="text-xl font-bold mb-3">{t("about.methodology.box3.title")}</h4>
                          <ul className="text-gray-400 space-y-2 list-disc pl-5">
                            <li>{t("about.methodology.box3.item1")}</li>
                            <li>{t("about.methodology.box3.item2")}</li>
                            <li>{t("about.methodology.box3.item3")}</li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
