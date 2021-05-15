import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


import React, { useState } from 'react';
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import styles from '../../styles/Home.module.css'

export default function Home() {
  const [booking, setBooking] = useState(false);
  const [work, setWork] = useState(false);
  const [about, setAbout] = useState(false);

  function toggleBooking() {
    setBooking(true);
    setWork(false);
    setAbout(false);
    $("#work").css("color", "#83b9e7");
    $("#about").css("color", "#83b9e7");
    $("#book").css("color", "#ef88ba");
    $("#about-panel").slideUp("slow");
    $("#work-panel").slideUp("slow");
    $("#booking-panel").slideDown("slow");
  }

  function toggleWork() {
    setWork(true);
    setBooking(false);
    setAbout(false);
    $("#work").css("color", "#ef88ba");
    $("#about").css("color", "#83b9e7");
    $("#book").css("color", "#83b9e7");
    $("#booking-panel").slideUp("slow");
    $("#about-panel").slideUp("slow");
    $("#work-panel").slideDown("slow");
  }

  function toggleAbout() {
    setAbout(true);
    setBooking(false);
    setWork(false);
    $("#work").css("color", "#83b9e7");
    $("#about").css("color", "#ef88ba");
    $("#book").css("color", "#83b9e7");
    $("#booking-panel").slideUp("slow");
    $("#work-panel").slideUp("slow");
    $("#about-panel").slideDown("slow");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>MZ Nails</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
          <div className={`${styles.column} `}>
          <h3 className={styles.description} onClick={toggleAbout} id='about'><Link href="#"><a>ABOUT</a></Link></h3>
          </div>
          <div className={`${styles.column} `}>
          <h3 className={styles.description} onClick={toggleWork} id='work'><Link href="#"><a>WORK</a></Link></h3>
          </div>
          <div className={`${styles.column} `}>
            <h3 className={styles.description} onClick={toggleBooking} id='book'><Link href="#"><a>BOOK</a></Link></h3>

          </div>
        </div>
        <div className={styles.grid}>
          <div id='about-panel' className={styles.info}>
            <p>My name is Marina Zapiola, I am 22 years old and I am an Aquarian.</p>
            <p>I am a fan of physical activity and animals, in fact all the products I use to work are Crueltyfree.</p>
            <p>I love everything that has to do with aesthetics, I am also a hairdresser but I was inclined to manicure, which is my true passion. I love to design, draw and challenge my creativity.</p>
            <p>I have been doing this for 5 years, becoming professional with various courses held in Buenos Aires.</p>
          </div>
          <div id='work-panel'>
            Testing
          </div>
          <div id='booking-panel'>
            <Datetime input={false}/>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>CREATED BY KAYLA ELORTONDO</p>
      </footer>
    </div>
  )
}
