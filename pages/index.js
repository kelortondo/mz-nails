import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

function Landing() {
  return(
    <div className={styles.container}>
      <Head>
        <title>MZ Nails</title>
      </Head>
      <div className={styles.gutterLeft}></div>
      <main className={styles.main}>
        <div className={styles.gridTitle}>
          <Link href="/"><a><img src='./shortBanner.png'style={{height: '100%'}}/></a></Link>
        </div>
        <div className={[styles.grid, styles.navBar].join(' ')}>
          <div className={styles.column50}>
            <div className={styles.description}><Link href="/eng"><a>ENGLISH</a></Link></div>
          </div>
          <div className={styles.column50}>
            <div className={styles.description}><Link href="#"><a>ESPAÑOL</a></Link></div>
          </div>
        </div>
      </main>
      <div className={styles.gutterRight}></div>
      <footer className={styles.footer}>
        <p className={styles.footerText}><span className={styles.subtitle}>CREATED BY</span> Kayla Elortondo</p>
      </footer>
    </div>
  )
}

export default Landing