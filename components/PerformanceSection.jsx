import styles from "./PerformanceSection.module.css"
import Image from "next/image"

const PerformanceSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <Image src="/performance-metrics.png" alt="Performance metrics" fill className="object-cover" />
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>ATHLETE PERFORMANCE</h3>
        <p className={styles.description}>
          Track your progress with advanced metrics and personalized feedback. Our comprehensive analytics help you
          understand your strengths and identify areas for improvement.
        </p>

        <div className={styles.textBox}>
          <p className={styles.textBoxTitle}>UNLOCK YOUR FULL POTENTIAL WITH OUR SPECIALIZED TRAINING METHODS</p>
          <p className={styles.textBoxSubtext}>TRUST THE PROCESS</p>
        </div>
      </div>
    </section>
  )
}

export default PerformanceSection
