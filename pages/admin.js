import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState, useRef } from 'react';
import LocationAdjustor from '../components/locationAdjuster.jsx';
import RequestedAppointments from '../components/requestedAppointments.jsx';
import Schedule from '../components/schedule.jsx';
import AptScheduler from '../components/aptScheduler.jsx';
import { withIronSession } from "next-iron-session";

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      return {
        props: { user: null }
      };
    }

    return {
      props: { user: user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);

const Landing = () => {
  const [requests, setRequests] = useState(false);
  const [adjustLoc, setAdjustLoc] = useState(false);
  const [seeSched, setSeeSched] = useState(false);
  const [addApt, setAddApt] = useState(false);
  const [adminElement, setAdminEl] = useState(<></>);
  const emailInput = useRef();
  const passwordInput = useRef();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = emailInput.current.value;
    const password = passwordInput.current.value;

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password })
    });

    if (response.ok) {
      setLoggedIn(true);
    }
  }

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

   if (loggedIn) {
    return (
      <div className={styles.container}>
        <Head>
          <title>MZ Nails</title>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        </Head>

        <div className={styles.gutterLeft}></div>

        <main className={styles.main}>
          <div className={styles.dropDowns}>
            <div className={styles.titlePNG} >
              <Link href="/"><a><img src='./shortBanner.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></a></Link>
            </div>
            <div className={styles.smallTitle} ><img src='./title.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></div>
            <div className={styles.subtitle}>BY MZ NAILS</div>
          </div>

          <div className={[styles.gridTitleSmall, styles.navBar].join(' ')} style={{height: 'auto'}}>
            <div className={'navDivs'} onClick={toggleAdjustLoc} id='loc'><Link href="#"><a>LOCATION</a></Link></div>
            <div className={'navDivs'} onClick={toggleSeeSched} id='apts'><Link href="#"><a>APPOINTMENTS</a></Link></div>
            <div className={'navDivs'} onClick={toggleRequests} id='requests'><Link href="#"><a>REQUESTS</a></Link></div>
            <div className={'navDivs'} onClick={toggleAddApt} id='book'><Link href="#"><a>BOOK</a></Link></div>
          </div>

          <div className={styles.grid}>
            {adminElement}
          </div>
        </main>

        <div className={styles.gutterRight}></div>

        <footer className={styles.footer}>
          <p className={styles.footerText}><span className={styles.info}>CREATED BY</span> Kayla Elortondo</p>
        </footer>
      </div>
    )
   } else {
     return (
      <div className={styles.container}>
        <Head>
          <title>MZ Nails</title>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        </Head>

        <div className={styles.gutterLeft}></div>

        <main className={styles.main}>
          <div className={styles.dropDowns}>
            <div className={styles.titlePNG} >
              <Link href="/"><a><img src='./shortBanner.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></a></Link>
            </div>
            <div className={styles.smallTitle} ><img src='./title.png' style={{maxWidth: '100%', maxHeight: '15vh'}}/></div>
            <div className={styles.subtitle}>BY MZ NAILS</div>
          </div>

          <br></br>
            <form onSubmit={handleSubmit}>
              <div>
                <label className={styles.quickSand}>
                  User ID: <input type="text" ref={emailInput} />
                </label>
              </div>
              <div>
                <label className={styles.quickSand}>
                  Password: <input type="password" ref={passwordInput} />
                </label>
              </div>
              <div style={{textAlign: 'center'}}>
                <button className={styles.loginBtn} type="submit">Sign in</button>
              </div>
            </form>
        </main>

        <div className={styles.gutterRight}></div>

        <footer className={styles.footer}>
          <p className={styles.footerText}><span className={styles.info}>CREATED BY</span> Kayla Elortondo</p>
        </footer>
      </div>
     )
   }
}

export default Landing;