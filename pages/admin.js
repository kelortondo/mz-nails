import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import LocationAdjustor from '../components/locationAdjuster.jsx';
import RequestedAppointments from '../components/requestedAppointments.jsx';
import Schedule from '../components/schedule.jsx';


function Landing() {
  const [schedule, setSchedule] = useState(false);
  const [requests, setRequests] = useState(false);
  const [adjustLoc, setAdjustLoc] = useState(false);
  const [adjustApts, setAdjustApts] = useState(false);
  const [seeSched, setSeeSched] = useState(false);
  const [adminElement, setAdminEl] = useState(<></>);

  function toggleSchedule() {
    setSchedule(true);
    setRequests(false);
    $("#requests").css("color", "#83b9e7");
    $("#schedule").css("color", "#ef88ba");
    $("#requests-panel").slideUp("slow", function() {
      $("#schedule-panel").slideDown("slow");
    });
  }

  function toggleRequests() {
    setSchedule(false);
    setRequests(true);
    $("#schedule").css("color", "#83b9e7");
    $("#requests").css("color", "#ef88ba");
    $("#schedule-panel").slideUp("slow", function() {
      $("#requests-panel").slideDown("slow");
    });
  }

  function toggleAdjustLoc() {
    setAdjustLoc(true);
    setAdjustApts(false);
    setSeeSched(false);
    setAdminEl(<LocationAdjustor/>)
  }

  function toggleAdjustApts() {
    setAdjustLoc(false);
    setAdjustApts(true);
    setSeeSched(false);
    setAdminEl(<div>Adjust appointments</div>);
  }

  function toggleSeeSched() {
    setAdjustLoc(false);
    setAdjustApts(false);
    setSeeSched(true);
    setAdminEl(<Schedule/>);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>MZ Nails</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      </Head>

      <div className={styles.gutterLeft}></div>

      <main className={styles.main}>
        <div className={styles.gridTitleSmall}>
          <Link href="/"><a><img src='./shortBanner.png'style={{height: '100%'}}/></a></Link>
        </div>

        <div className={[styles.grid, styles.navBar].join(' ')}>
          <div className={styles.column50}>
            <div className={styles.description} onClick={toggleSchedule} id='schedule'><Link href="#"><a>SCHEDULE</a></Link></div>
          </div>
          <div className={styles.column50}>
            <div className={styles.description} onClick={toggleRequests} id='requests'><Link href="#"><a>REQUESTS</a></Link></div>
          </div>
        </div>

        <div className={styles.grid}>
          <div id='schedule-panel' className={styles.info} >
            <div className={styles.dropDowns}>
              <div className={styles.verticalNav}>
                <div onClick={toggleAdjustLoc}><Link href="#"><a>Adjust location</a></Link></div>
                <div onClick={toggleAdjustApts}><Link href="#"><a>Alter existing appointments</a></Link></div>
                <div onClick={toggleSeeSched}><Link href="#"><a>See schedule</a></Link></div>
              </div>
              <div style={{paddingLeft: '5%'}}>
                {adminElement}
              </div>
            </div>
          </div>

          <div id='requests-panel' className={styles.info}>
            <div className={styles.dropDowns}>
              <RequestedAppointments/>
            </div>
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