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
          <Link href="/"><a><img src='./shortBanner.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></a></Link>
          <div className={styles.smallTitle} ><img src='./title.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></div>
          <div className={styles.subtitle}>BY MZ NAILS</div>
        </div>
        <div className={[styles.grid, styles.navBar].join(' ')}>
          <div className={styles.column50}>
            <div id="eng" className={styles.description}><Link href="/eng"><a>ENGLISH</a></Link></div>
          </div>
          <div className={styles.column50}>
            <div id="esp" className={styles.description}><Link href="#"><a>ESPAÑOL</a></Link></div>
          </div>
        </div>
      </main>
      <div className={styles.gutterRight}></div>
      <footer className={styles.footer}>
        <p className={styles.footerText}><span className={styles.info}>CREATED BY</span> Kayla Elortondo</p>
      </footer>
    </div>
  )
}

export default Landing