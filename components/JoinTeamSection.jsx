import styles from "./JoinTeamSection.module.css"

const JoinTeamSection = () => {
  return (
    <section className={styles.section}>
      <p className={styles.subtitle}>READY TO LEVEL UP?</p>
      <h2 className={styles.title}>JOIN THE TEAM</h2>
      <button className={styles.button}>Sign Up Now</button>
    </section>
  )
}

export default JoinTeamSection
