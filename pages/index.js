import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import React, { useState } from 'react';
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import styles from '../styles/Home.module.css'

export default function Home() {
  const [booking, setBooking] = useState(false);

  function toggleBooking() {
    setBooking(!booking);
  }

  return (
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
        <h3 className={styles.description}>
          BY MZ NAILS
        </h3>

        <div className={styles.grid}>
          <div className={`${styles.column} ${styles.grid}`}>
            <h3 className={styles.description}>ABOUT</h3>
          </div>
          <div className={`${styles.column} ${styles.grid}`}>
            <h3 className={styles.description}>WORK</h3>
          </div>
          <div className={`${styles.column} ${styles.grid}`}>
            <h3 className={styles.description} onClick={toggleBooking}><Link href="/"><a>BOOK</a></Link></h3>
            <div style={{display: booking ? "block" : "none"}}>
              <Datetime input={false}/>
            </div>

          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>CREATED BY KAYLA ELORTONDO</p>
      </footer>
    </div>
  )
}
