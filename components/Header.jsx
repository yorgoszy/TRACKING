import styles from "./Header.module.css"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.iconContainer}>
        <Image src="/icon-gri.png" alt="Icon" width={41} height={41} className={styles.icon} />
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.homeLink}>
          home
        </Link>
        <Link href="/reserve" className={styles.link}>
          reserve
        </Link>
        <Link href="/about" className={styles.link}>
          about us
        </Link>
      </nav>

      <div className={styles.loginContainer}>
        <Link href="/login" className={styles.link}>
          log in
        </Link>
      </div>
    </header>
  )
}

export default Header
