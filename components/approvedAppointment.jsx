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
    axios.put('/api/requests', {id: req._id})
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
      <p style={{marginLeft: '1rem'}}>Name: {req.firstName} {req.lastName} || Email: {req.email} || Phone number: {req.phone}</p>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Appointment info:</p>
      <p style={{marginLeft: '1rem'}}>Location: {req.location} || Date/Time: {new Date(req.aptDate).toLocaleDateString('en-gb', {year: 'numeric', month: 'long', day: 'numeric'})} at {new Date(req.aptDate).toLocaleTimeString('en-gb')} || Service: {req.service}, {req.pedicure ? 'pedicure,' : ''} {req.manicure ? 'manicure' : ''}</p>
      <div>
        <button className={styles.aptBtn}>Edit</button>
        <button className={styles.aptBtn} onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}

export default ApprovedAppointment;