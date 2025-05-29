"use client"

import Link from "next/link"
import { useLanguage } from "../contexts/language-context"

export default function CtaSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-brand text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10">{t("cta.description")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#programs"
            className="px-8 py-3 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            {t("cta.button")}
          </Link>
        </div>
      </div>
    </section>
  )
}
