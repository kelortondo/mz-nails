import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import LocationAdjustor from '../components/locationAdjuster.jsx';
import RequestedAppointments from '../components/requestedAppointments.jsx';
import Schedule from '../components/schedule.jsx';
import AptScheduler from '../components/aptScheduler.jsx';


function Landing() {
  const [requests, setRequests] = useState(false);
  const [adjustLoc, setAdjustLoc] = useState(false);
  const [seeSched, setSeeSched] = useState(false);
  const [addApt, setAddApt] = useState(false);
  const [adminElement, setAdminEl] = useState(<></>);

  function toggleRequests() {
    setRequests(true);
    setSeeSched(false);
    setAddApt(false);
    setAdjustLoc(false);
    setAdminEl(<RequestedAppointments/>)
    $("#requests").css("color", "#ef88ba");
    $("#loc").css("color", "#83b9e7");
    $("#apts").css("color", "#83b9e7");
    $("#book").css("color", "#83b9e7");
  }

  function toggleAdjustLoc() {
    setAdjustLoc(true);
    setSeeSched(false);
    setAddApt(false);
    setRequests(false);
    setAdminEl(<LocationAdjustor/>)
    $("#loc").css("color", "#ef88ba");
    $("#apts").css("color", "#83b9e7");
    $("#book").css("color", "#83b9e7");
    $("#requests").css("color", "#83b9e7");
  }

  function toggleSeeSched() {
    setAdjustLoc(false);
    setSeeSched(true);
    setAddApt(false);
    setRequests(false);
    setAdminEl(<Schedule/>);
    $("#loc").css("color", "#83b9e7");
    $("#apts").css("color", "#ef88ba");
    $("#book").css("color", "#83b9e7");
    $("#requests").css("color", "#83b9e7");
  }

  function toggleAddApt() {
    setAdjustLoc(false);
    setSeeSched(false);
    setAddApt(true);
    setRequests(false);
    setAdminEl(<AptScheduler/>);
    $("#loc").css("color", "#83b9e7");
    $("#apts").css("color", "#83b9e7");
    $("#book").css("color", "#ef88ba");
    $("#requests").css("color", "#83b9e7");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>MZ Nails</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      </Head>

      <div className={styles.gutterLeft}></div>

      <main className={styles.main}>
        <div className={styles.dropDowns}>
          <Link href="/"><a><img srcSet='./title.png 1000w, ./shortBanner.png 1001w' sizes='(max-width: 1000px) 1000px, (min-width: 1001px) 1001px' style={{maxWidth: '100%', maxHeight: '15vh'}}/></a></Link>
          <div className={styles.subtitle}>BY MZ NAILS</div>
        </div>

        <div className={[styles.gridTitleSmall, styles.navBar].join(' ')} style={{height: 'auto'}}>
            <div className={'navDivs'} onClick={toggleAdjustLoc} id='loc'><Link href="#"><a>LOCATION</a></Link></div>
            <div className={'navDivs'} onClick={toggleSeeSched} id='apts'><Link href="#"><a>APPOINTMENTS</a></Link></div>
            <div className={'navDivs'} onClick={toggleRequests} id='requests'><Link href="#"><a>REQUESTS</a></Link></div>
            <div className={'navDivs'} onClick={toggleAddApt} id='book'><Link href="#"><a>BOOK</a></Link></div>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.info}`} >
            <div className={styles.dropDowns}>
                {adminElement}
            </div>
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