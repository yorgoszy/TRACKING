import Image from "next/image"
import styles from "./FirstSection.module.css"

export default function FirstSection() {
  return (
    <section id="programs" className={styles.section}>
      <div className={styles.imageContainer}>
        <Image
          src="/coach-kid-boxing.jpg"
          alt="Coach training kid in boxing"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          style={{ objectPosition: "center 30%" }}
          priority
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          LEARN ABOUT
          <br />
          <span className="text-[#00ffba]">MOVEMENT</span>
        </h2>
        <div className={styles.boxContainer}>
          <p className={styles.description}>
            YOU'RE JUST A KID, AND ALL YOU NEED IS TO PLAY. EXPLORE THE WORLD WITH US!
          </p>
          <button className={styles.processButton}>TRUST THE PROCESS</button>
        </div>
      </div>
    </section>
  )
}
