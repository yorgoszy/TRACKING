import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <>
      {/* Desktop Hero - 1280px × 480px */}
      <section className="hidden xl:flex flex-row items-center w-full max-w-[1280px] h-[480px] max-h-[720px] mx-auto bg-[#808CFD]">
        {/* Image Section */}
        <div className="flex flex-col items-start w-[854px] h-[480px]">
          <Image
            src="/hero-desktop.jpg"
            alt="Hero image"
            width={854}
            height={480}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Panel */}
        <div className="relative w-[426px] h-[480px] bg-[#ACA097]">
          <h1 className="absolute left-[20px] top-[20px] w-[250px] h-[46px] font-['Anek_Tamil'] font-bold text-[45px] leading-[91%] tracking-[-0.03em] uppercase text-[#25273E]">
            the beginig
          </h1>

          <div className="absolute left-[20px] top-[170px] w-[225px] h-[244px] border border-[#25273E]">
            <p className="absolute left-[18px] top-[20px] bottom-[-20px] w-[192px] font-['Anek_Tamil'] font-bold text-[25px] leading-[91%] tracking-[-0.03em] uppercase text-shadow">
              You're just a kid, and all you need is to play. Explore the world with us!
            </p>
          </div>

          <div className="absolute left-0 right-[36px] bottom-[-20px] h-[41px] flex flex-row justify-center items-center py-[12px] px-[17px] gap-[7.25px] bg-[#ACA097]">
            <Link
              href="#reserve"
              className="w-[151px] h-[17px] font-['Geist_Mono'] font-normal text-[15px] leading-[110%] tracking-[-0.01em] uppercase text-black"
            >
              reserve your spot
            </Link>
          </div>
        </div>
      </section>

      {/* Tablet Hero - 800px × 300px */}
      <section className="hidden md:flex xl:hidden flex-row items-center w-full max-w-[800px] h-[300px] max-h-[720px] mx-auto bg-[#808CFD] my-[-3px]">
        {/* Image Section */}
        <div className="flex flex-col items-start w-[533.75px] h-[300px]">
          <Image
            src="/hero-tablet.jpg"
            alt="Hero image"
            width={534}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Panel */}
        <div className="relative w-[266.25px] h-[300px] bg-[#ACA097]">
          <h1 className="absolute left-[20px] top-[20px] w-[226.25px] h-[66px] font-['Anek_Tamil'] font-bold text-[36px] leading-[91%] tracking-[-0.03em] uppercase text-[#25273E]">
            the beginig
          </h1>

          <div className="absolute left-[20px] top-[92px] w-[226.25px] h-[176px] border border-[#25273E]">
            <p className="absolute left-[0.25px] top-0 bottom-[61px] w-[226.25px] font-['Anek_Tamil'] font-bold text-[25px] leading-[91%] tracking-[-0.03em] uppercase text-shadow">
              You're just a kid, and all you need is to play. Explore the world with us!
            </p>
          </div>

          <div className="absolute left-[4.5px] right-[36.75px] bottom-0 h-[41px] flex flex-row justify-center items-center py-[12px] px-[17px] gap-[7.25px] bg-[#ACA097] rounded-[7.24613px]">
            <Link
              href="#reserve"
              className="w-[151px] h-[17px] font-['Geist_Mono'] font-normal text-[15px] leading-[110%] tracking-[-0.01em] uppercase text-black"
            >
              reserve your spot
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Hero - 375px × 427px */}
      <section className="md:hidden flex flex-col justify-center items-start w-full max-w-[375px] h-[427px] max-h-[675px] mx-auto bg-[#808CFD]">
        {/* Image Section */}
        <div className="flex flex-col items-start w-[375px] h-[225px]">
          <Image
            src="/hero-mobile.jpg"
            alt="Hero image"
            width={375}
            height={225}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Panel */}
        <div className="relative w-[375px] h-[202px] bg-[#ACA097]">
          <h1 className="absolute left-[20px] top-[20px] w-[335px] h-[25px] font-['Anek_Tamil'] font-bold text-[28px] leading-[91%] tracking-[-0.03em] uppercase text-[#25273E]">
            the beginig
          </h1>

          <div className="absolute left-[20px] top-[51px] w-[335px] h-[121px] border border-[#25273E]">
            <p className="absolute left-0 top-0 bottom-[61px] w-[335px] font-['Anek_Tamil'] font-bold text-[22px] leading-[91%] tracking-[-0.03em] uppercase text-shadow">
              You're just a kid, and all you need is to play. Explore the world with us!
            </p>
          </div>

          <div className="absolute left-[4.5px] right-[145.5px] bottom-0 h-[41px] flex flex-row justify-center items-center py-[12px] px-[17px] gap-[7.25px] bg-[#ACA097] rounded-[7.24613px]">
            <Link
              href="#reserve"
              className="w-[151px] h-[17px] font-['Geist_Mono'] font-normal text-[15px] leading-[110%] tracking-[-0.01em] uppercase text-black"
            >
              reserve your spot
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
