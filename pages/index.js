import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

<Link href="/posts/first-post">
<a>this page!</a>
</Link>

function Landing() {
  return(
    <div className={styles.container}>
      <Head>
        <title>MZ Nails</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.gridTitle}>
          <img src='./leftWing.png' className={styles.bannerImgLeft}/>
          <img src='./title.png' className={styles.bannerTitle}/>
          <img src='./leftWing.png' className={styles.bannerImgRight}/>

        </div>
        <h3 className={styles.subtitle}>
          BY MZ NAILS
        </h3>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.description}><Link href="/eng"><a>English</a></Link></h3>
          </div>
          <div className={styles.column}>
            <h3 className={styles.description}>Español</h3>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}><span className={styles.subtitle}>CREATED BY</span> Kayla Elortondo</p>
      </footer>
    </div>
  )
}

export default Landing