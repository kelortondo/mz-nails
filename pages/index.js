import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MZ Nails</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Le Coquette
        </h1>
        <h3 className={styles.description}>
          BY MZ NAILS
        </h3>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.description}>ABOUT</h3>
          </div>
          <div className={styles.column}>
            <h3 className={styles.description}>WORK</h3>
          </div>
          <div className={styles.column}>
            <h3 className={styles.description}>BOOK</h3>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>CREATED BY KAYLA ELORTONDO</p>
      </footer>
    </div>
  )
}
