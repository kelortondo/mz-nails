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
  const [schedule, setSchedule] = useState(false);
  const [requests, setRequests] = useState(false);
  const [adjustLoc, setAdjustLoc] = useState(false);
  const [seeSched, setSeeSched] = useState(false);
  const [addApt, setAddApt] = useState(false);
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
    setSeeSched(false);
    setAddApt(false);
    setAdminEl(<LocationAdjustor/>)
    $("#adj-loc-div").css("color", "#ef88ba");
    $("#see-sched-div").css("color", "#83b9e7");
    $("#create-apt-div").css("color", "#83b9e7");
  }

  function toggleSeeSched() {
    setAdjustLoc(false);
    setSeeSched(true);
    setAddApt(false);
    setAdminEl(<Schedule/>);
    $("#adj-loc-div").css("color", "#83b9e7");
    $("#see-sched-div").css("color", "#ef88ba");
    $("#create-apt-div").css("color", "#83b9e7");
  }

  function toggleAddApt() {
    setAdjustLoc(false);
    setSeeSched(false);
    setAddApt(true);
    setAdminEl(<AptScheduler/>);
    $("#adj-loc-div").css("color", "#83b9e7");
    $("#see-sched-div").css("color", "#83b9e7");
    $("#create-apt-div").css("color", "#ef88ba");
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
            <div className={'navDivs'} onClick={toggleSchedule} id='schedule'><Link href="#"><a>SCHEDULE</a></Link></div>
          </div>
          <div className={styles.column50}>
            <div className={'navDivs'} onClick={toggleRequests} id='requests'><Link href="#"><a>REQUESTS</a></Link></div>
          </div>
        </div>

        <div className={styles.grid}>
          <div id='schedule-panel' className={`${styles.info} toggleablePanels`} >
            <div className={styles.dropDownsNoWrap}>
              <div className={styles.verticalNav}>
                <div onClick={toggleAdjustLoc} id="adj-loc-div"><Link href="#"><a>Adjust location</a></Link></div>
                <div onClick={toggleSeeSched} id="see-sched-div"><Link href="#"><a>See schedule</a></Link></div>
                <div onClick={toggleAddApt} id="create-apt-div"><Link href="#"><a>Create appointment</a></Link></div>
              </div>
              <div style={{overflowY: 'auto'}}>
                {adminElement}
              </div>
            </div>
          </div>

          <div id='requests-panel' className={`${styles.info} toggleablePanels`}>
            <div className={styles.dropDowns}>
              <RequestedAppointments/>
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