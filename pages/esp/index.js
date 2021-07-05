import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


import React, { useState } from 'react';

import styles from '../../styles/Home.module.css'

import Gallery from '../../components/gallery.jsx';
import BookingForm from '../../components/espanol/bookingForm.jsx';

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
    $("#bookPicDiv").fadeOut("slow", function() {
      $("#about-panel").slideUp("slow", function() {
        $("#work-panel").slideUp("slow", function() {
          $("#booking-panel").slideDown("slow");
        });
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
    $("#bookPicDiv").fadeOut("slow", function() {
      $("#booking-panel").slideUp("slow", function() {
        $("#about-panel").slideUp("slow", function() {
          $("#work-panel").slideDown("slow");
        });
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
    $("#bookPicDiv").fadeOut("slow", function() {
      $("#booking-panel").slideUp("slow", function() {
        $("#work-panel").slideUp("slow", function() {
          $("#about-panel").slideDown("slow");
        });
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

      <div className={styles.gutterLeft}></div>

      <main className={styles.main}>
        <div className={styles.gridTitleSmall}>
          <div className={styles.titlePNG} >
            <Link href="/"><a><img src='./shortBanner.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></a></Link>
          </div>
          <div className={styles.smallTitle} ><img src='./title.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></div>
          <div className={styles.subtitle}>BY MZ NAILS</div>
        </div>

        <div className={[styles.grid, styles.navBar].join(' ')}>
          <div className={`${styles.column} `}>
            <div className={`navDivs`} onClick={toggleAbout} id='about'><Link href="#"><a>QUIEN SOY</a></Link></div>
          </div>
          <div className={`${styles.column} `}>
            <div className={`navDivs`} onClick={toggleWork} id='work'><Link href="#"><a>SERVICIOS</a></Link></div>
          </div>
          <div className={`${styles.column} `}>
            <div className={`navDivs`} onClick={toggleBooking} id='book'><Link href="#"><a>RESERVÁ</a></Link></div>
          </div>
        </div>
        <div className={styles.containImgButton} id="bookPicDiv">
          <img src="./designecologist-r-Ej0NQmFlQ-unsplash.jpg" style={{maxHeight: '70vh', marginTop: '1rem', maxWidth: '100%', objectFit: 'contain'}}/>
          <button className={styles.bookBtn} onClick={toggleBooking}>Reservá ahora!</button>
        </div>
        <div className={styles.grid}>
          <div id='about-panel' className={`${styles.info} toggleablePanels`} >
            <div className={styles.dropDowns}>
              <div>
                <img src={'./marinaPic.png'} style={{ maxWidth: '500px', objectFit: 'cover', paddingLeft: '5%'}}/>
              </div>
              <div style={{paddingLeft: '5%', maxWidth: '600px', minWidth: '400px'}}>
                <p>Me llamo Marina Zapiola tengo 22 años y soy Acuariana.
                  Soy fanatica de la actividad física y los animales, de hecho todos los productos que utilizo para trabajar son Crueltyfree.
                  Me encanta todo lo que tenga que ver con la estética, también soy peluquera pero me incliné a la manicura que es mi verdadera pasión. Amo diseñar, dibujar y desafiar mi creatividad.
                  Llevo 5 años haciendo esto, profesionalizándome con diversos cursos realizados en Buenos Aires. </p>
                <p>Este año lanzamos el nuevo proyecto MZ nails sobre ruedas.
                  Compramos un foodtruck, lo remodélanos y convertimos en un Spa de uñas para el confort de nuestras clientas.
                  Siempre pensando en cómo brindarles un mejor servicio, no solo en la calidad sino en la comodidad! </p>
                <p>Find me on Instagram at <a href="https://www.instagram.com/_mz_nails/">@_mz_nails</a> </p>
              </div>
            </div>
          </div>

          <div id='work-panel' className={`${styles.info} toggleablePanels`}>
            <div className={styles.dropDowns}>
              <div>
                <span style={{fontFamily: 'Nickainley', fontSize: '2rem'}}>Servicios:</span>
                <ul>
                  <li>Manicura rusa/combinada</li>
                  <li>Esmaltado tradicional/ semi permanente </li>
                  <li>Esculpidas en Polygel</li>
                  <li>Kapping gel</li>
                  <li>Nail art</li>
                  <li>Belleza de pies </li>
                </ul>
              </div>
              <Gallery/>
            </div>
          </div>
          <div id='booking-panel' className={`${styles.bookingInfo} toggleablePanels`}>
            <BookingForm />
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
