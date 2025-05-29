import Image from "next/image"
import styles from "./SecondSection.module.css"

export default function SecondSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          PLAY TIME IS
          <br />
          <span className="text-[#00ffba]">OVER</span>
        </h2>
        <div className={styles.boxContainer}>
          <p className={styles.description}>
            YOU'RE NOT A KID ANY MORE, YOU'VE GOT ABILITIES, IT'S TIME TO GUIDE YOU ON YOUR PATH
          </p>
          <button className={styles.extraMileButton}>GO THE EXTRA MILE</button>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/adult-boxer-training.jpg"
          alt="Adult boxer training"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          style={{ objectPosition: "center 10%" }}
        />
      </div>
    </section>
  )
}
