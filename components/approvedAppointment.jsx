import React from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';

function ApprovedAppointment({req, handleRerender}) {

  const handleDelete = function() {
    axios.delete('/api/schedule', {
      data: {
        id: req._id
      }
    })
    .then((response) => {
      console.log(response);
      handleRerender();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleApprove = function() {
    axios.put('/api/appointments', {id: req._id})
    .then((response) => {
      console.log(response);
      handleRerender();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <div className={styles.aptApproved}>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Client info:</p>
      <p style={{marginLeft: '1rem'}}><i>Name:</i> {req.firstName} {req.lastName} || <i>Email:</i> {req.email} || <i>Phone number:</i> {req.phone}</p>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Appointment info:</p>
      <p style={{marginLeft: '1rem'}}><i>Location:</i> {req.location} || <i>Date:</i> {req.aptDate.slice(0, 10)} || <i>Service:</i> {req.service}, {req.pedicure ? 'pedicure,' : ''} {req.manicure ? 'manicure' : ''}</p>
      <div>
        <button className={styles.aptBtn}>Edit</button>
        <button className={styles.aptBtn} onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}

export default ApprovedAppointment;