import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProgramsSection from "@/components/ProgramsSection"
import AboutUsSection from "@/components/AboutUsSection"
import TrainingSection from "@/components/TrainingSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import CtaSection from "@/components/CtaSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProgramsSection />
      <AboutUsSection />
      <TrainingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
