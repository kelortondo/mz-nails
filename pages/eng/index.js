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
    $("#about-panel").slideUp("slow", function() {
      $("#work-panel").slideUp("slow", function() {
        $("#booking-panel").slideDown("slow");
      });
    });
  }

  function toggleWork() {
    setWork(true);
    setBooking(false);
    setAbout(false);
    $("#work").css("color", "#ef88ba");
    $("#about").css("color", "#83b9e7");
    $("#book").css("color", "#83b9e7");
    $("#booking-panel").slideUp("slow", function() {
      $("#about-panel").slideUp("slow", function() {
        $("#work-panel").slideDown("slow");
      });
    });
  }

  function toggleAbout() {
    setAbout(true);
    setBooking(false);
    setWork(false);
    $("#work").css("color", "#83b9e7");
    $("#about").css("color", "#ef88ba");
    $("#book").css("color", "#83b9e7");
    $("#booking-panel").slideUp("slow", function() {
      $("#work-panel").slideUp("slow", function() {
        $("#about-panel").slideDown("slow");
      });
    });
  }

  const items = [<img src="./truck1.png" style={{height: '20rem', margin: 'auto'}}/>, <img src="./truck2.png" style={{height: '20rem', margin: 'auto'}}/>];

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
          <div id='about-panel' className={styles.info} >
            <div style={{display: 'inline-block', width: '25%'}}>
              <img src={'./marina.png'} style={{ width: '100%', objectFit: 'cover', paddingRight: '5%'}}/>
            </div>
            <div style={{display: 'inline-block', width: '70%'}}>
              <p>My name is Marina Zapiola. I am 22 years old and I am a beautician.</p>
              <p>I love everything that has to do with aesthetics. I am also a hairdresser but I was inclined to manicure, which is my true passion. I love to design, draw and challenge my creativity.</p>
              <p>I enjoy any type of physical activity and love animals. In fact all the products I use are cruelty free.</p>
              <p>I have 5 years of experience, over which time I have expanded by skills by attending various courses held in Buenos Aires.</p>
              <p>This year we launched MZ nails on wheels - <span style={{fontFamily: 'Nickainley', fontSize: '2rem'}}>Le Coquette.</span>
                  We bought a food truck, remodeled it, and turned it into a Nail Spa for the comfort of our clients.
                  I am always thinking about how to provide you with a better service, not only in quality but also in comfort!</p>
              <p>To book an appointment, please call at (224) 169-5816 or fill out the booking form.</p>
              <p>Find me on Instagram at <a href="https://www.instagram.com/_mz_nails/">@_mz_nails</a> </p>
            </div>
          </div>

          <div id='work-panel' className={styles.info}>
            <div style={{display: 'inline-block', width: '25%', verticalAlign: 'top'}}>
            <span style={{fontFamily: 'Nickainley', fontSize: '2rem'}}>Services:</span>
              <ul>
                <li>Russian/combined manicure</li>
                <li>Traditional/semi permanent enamelling</li>
                <li>Polygel sculpting</li>
                <li>Kapping gel</li>
                <li>Nail art</li>
                <li>Pedicures</li>
              </ul>
            </div>
            <div style={{display: 'inline-block'}}>

            </div>
          </div>
          <div id='booking-panel' className={styles.bookingInfo}>
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
