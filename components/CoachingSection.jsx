import styles from "./CoachingSection.module.css"
import Image from "next/image"

const CoachingSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>EXPERT COACHING</h3>
        <p className={styles.description}>We are passionate about your progress.</p>

        <div className={styles.divider}></div>

        <h3 className={styles.title}>RESULTS-DRIVEN PROGRAMS</h3>
        <p className={styles.description}>Workouts that deliver tangible, measurable results.</p>

        <div className={styles.divider}></div>

        <button className={styles.button}>VIEW CLASSES</button>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TAYTOTHTA%20%281%29.jpg-NTL8utwKBDyg2Wp19wLVBRSYYhlTjf.jpeg"
          alt="Expert coaching session"
          fill
          className="object-cover grayscale"
          style={{ objectPosition: "center 30%" }} /* Προσαρμογή της θέσης της εικόνας */
        />
      </div>
    </section>
  )
}

export default CoachingSection
