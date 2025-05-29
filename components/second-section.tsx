import Image from "next/image"

export function SecondSection() {
  return (
    <section className="w-full flex">
      <div className="w-1/2 bg-[#ACA097] p-6">
        <h2 className="text-[45px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
          PLAY
          <br />
          TIME IS
          <br />
          OVER
        </h2>
        <div className="mt-8 p-6 bg-[#e5e5e5]">
          <p className="text-[22px] font-['Fugaz_One'] leading-tight uppercase text-[#25273E]">
            YOU'RE NOT A KID ANY MORE, YOU'VE GOT ABILITIES, IT'S TIME TO GUIDE YOU ON YOUR PATH
          </p>
        </div>
      </div>
      <div className="w-1/2 relative h-[480px]">
        <Image
          src="/adult-boxer-training.jpg"
          alt="Adult boxer training"
          fill
          className="object-cover"
          objectPosition="center 5%"
        />
      </div>
    </section>
  )
}
