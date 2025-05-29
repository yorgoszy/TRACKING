import styles from "./FooterSection.module.css"
import Image from "next/image"

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4 className={styles.title}>CONTACT</h4>
          <p className={styles.text}>info@performance.com</p>
          <p className={styles.text}>+30 210 1234567</p>
          <p className={styles.text}>123 Performance Street</p>
          <p className={styles.text}>Athens, Greece 12345</p>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>OPEN HOURS</h4>
          <p className={styles.text}>Monday - Friday: 6:00 - 22:00</p>
          <p className={styles.text}>Saturday: 8:00 - 20:00</p>
          <p className={styles.text}>Sunday: 9:00 - 18:00</p>
        </div>
        <div className={styles.columnRight}>
          <Image src="/icon-gri.png" alt="Logo" width={41} height={41} className={styles.icon} />
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© 2023 Performance Gym. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default FooterSection
