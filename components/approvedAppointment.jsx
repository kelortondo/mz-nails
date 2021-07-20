import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
import AptEditor from './aptEditor.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function ApprovedAppointment({req, handleRerender}) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundImage: 'url("./tom-morel-ktVazL5c7FM-unsplash.jpg")',
      backgroundSize: '100%',
      boxShadow: theme.shadows[5],
      width: 'auto',
      padding: '2rem',
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleRerender();
  };

  const handleDelete = function() {
    axios.delete('/api/schedule', {
      data: {
        id: req._id
      }
    })
    .then((response) => {
      handleRerender();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <div className={styles.aptApproved}>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Client info:</p>
      <p style={{marginLeft: '1rem'}}>Name: {req.firstName} {req.lastName} || Email: {req.email} || Phone number: {req.phone}</p>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Appointment info:</p>
      <p style={{marginLeft: '1rem'}}>Location: {req.location[0].toUpperCase() + req.location.slice(1)} || Date/Time: {new Date(req.aptDate).toLocaleString('en-AR', {timeZone: 'America/Argentina/Buenos_Aires', hour12: false, dateStyle: 'medium', timeStyle: 'short'})} ({req.duration} min) || Service: {req.service}{req.pedicure ? ', pedicure' : ''}{req.manicure ? ', manicure' : ''}</p>
      <div>
        <button className={styles.aptBtn} onClick={handleOpen}>Edit</button>
        <button className={styles.aptBtn} onClick={handleDelete}>Remove</button>

        <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <AptEditor req={req} handleClose={handleClose.bind(this)}/>
            </div>
          </Fade>
        </Modal>

      </div>
    </div>
  )
}

export default ApprovedAppointment;