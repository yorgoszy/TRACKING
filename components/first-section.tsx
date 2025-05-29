import Image from "next/image"

export function FirstSection() {
  return (
    <section className="w-full flex">
      <div className="w-1/2 relative h-[480px]">
        <Image src="/coach-kid-boxing.jpg" alt="Coach training kid in boxing" fill className="object-cover" priority />
      </div>
      <div className="w-1/2 bg-[#ACA097] p-6">
        <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
          LEARN
          <br />
          ABOUT
          <br />
          MOVEMENT
        </h2>
        <div className="mt-8 p-6 bg-[#e5e5e5]">
          <p className="text-[22px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
            YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY. EXPLORE THE WORLD WITH US!
          </p>
          <p className="mt-6 text-sm font-['Fugaz_One'] uppercase text-[#25273E]">TRUST THE PROCESS</p>
        </div>
      </div>
    </section>
  )
}
