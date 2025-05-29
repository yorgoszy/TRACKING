import Image from "next/image"
import Link from "next/link"

export function HeroSectionNew() {
  return (
    <>
      {/* Desktop Hero - 1280px × 480px */}
      <section className="hidden xl:flex flex-row items-center w-[1280px] h-[480px] max-h-[720px] mx-auto bg-[#808CFD]">
        {/* Left side - Image */}
        <div className="relative w-[854px] h-full">
          <Image src="/hero-image.png" alt="Boxing training with kid" fill className="object-cover" />
        </div>

        {/* Right side - Text */}
        <div className="relative w-[426px] h-full bg-[#ACA097] p-6">
          <h2 className="text-[45px] font-['Anek_Tamil'] font-bold leading-[91%] tracking-[-0.03em] uppercase text-[#25273E]">
            LEARN
            <br />
            ABOUT
            <br />
            MOVEMENT
          </h2>

          <div className="mt-8 border border-[#25273E] p-6">
            <p className="text-[25px] font-['Anek_Tamil'] font-bold leading-[91%] tracking-[-0.03em] uppercase text-shadow">
              YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY. EXPLORE THE WORLD WITH US!
            </p>
            <p className="mt-6 text-sm font-['Geist_Mono'] uppercase">TRUST THE PROCESS</p>
          </div>

          <div className="absolute bottom-6 left-6">
            <Link
              href="#reserve"
              className="inline-block py-3 px-6 bg-[#ACA097] border border-black font-['Geist_Mono'] text-sm uppercase"
            >
              reserve your spot
            </Link>
          </div>
        </div>
      </section>

      {/* Tablet Hero - 800px × 300px */}
      <section className="hidden md:flex xl:hidden flex-row items-center w-[800px] h-[300px] max-h-[720px] mx-auto bg-[#808CFD] my-[-3px]">
        {/* Left side - Image */}
        <div className="relative w-[533.75px] h-full">
          <Image src="/hero-image.png" alt="Boxing training with kid" fill className="object-cover" />
        </div>

        {/* Right side - Text */}
        <div className="relative w-[266.25px] h-full bg-[#ACA097] p-4">
          <h2 className="text-[36px] font-['Anek_Tamil'] font-bold leading-[91%] tracking-[-0.03em] uppercase text-[#25273E]">
            LEARN
            <br />
            ABOUT
            <br />
            MOVEMENT
          </h2>

          <div className="mt-4 border border-[#25273E] p-4">
            <p className="text-[20px] font-['Anek_Tamil'] font-bold leading-[91%] tracking-[-0.03em] uppercase text-shadow">
              YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY.
            </p>
            <p className="mt-4 text-xs font-['Geist_Mono'] uppercase">TRUST THE PROCESS</p>
          </div>

          <div className="absolute bottom-4 left-4">
            <Link
              href="#reserve"
              className="inline-block py-2 px-4 bg-[#ACA097] border border-black font-['Geist_Mono'] text-xs uppercase"
            >
              reserve your spot
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Hero - 375px × 427px */}
      <section className="md:hidden flex flex-col justify-center items-start w-[375px] h-[427px] max-h-[675px] mx-auto bg-[#808CFD]">
        {/* Top - Image */}
        <div className="relative w-full h-[225px]">
          <Image src="/hero-image.png" alt="Boxing training with kid" fill className="object-cover" />
        </div>

        {/* Bottom - Text */}
        <div className="relative w-full h-[202px] bg-[#ACA097] p-4">
          <h2 className="text-[28px] font-['Anek_Tamil'] font-bold leading-[91%] tracking-[-0.03em] uppercase text-[#25273E]">
            LEARN ABOUT MOVEMENT
          </h2>

          <div className="mt-4 border border-[#25273E] p-4">
            <p className="text-[18px] font-['Anek_Tamil'] font-bold leading-[91%] tracking-[-0.03em] uppercase text-shadow">
              YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY.
            </p>
            <p className="mt-4 text-xs font-['Geist_Mono'] uppercase">TRUST THE PROCESS</p>
          </div>

          <div className="absolute bottom-4 left-4">
            <Link
              href="#reserve"
              className="inline-block py-2 px-4 bg-[#ACA097] border border-black font-['Geist_Mono'] text-xs uppercase"
            >
              reserve your spot
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
