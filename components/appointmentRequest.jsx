import React from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
function AppointmentRequest({req, handleRerender}) {

  const handleDelete = function() {
    axios.delete('/api/requests', {
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

  const handleApprove = function() {
    axios.put('/api/requests', {id: req._id})
    .then((response) => {
      handleRerender();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <div className={styles.aptRequest}>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Client info:</p>
      <p style={{marginLeft: '1rem'}}>Name: {req.firstName} {req.lastName} || Email: {req.email} || Phone number: {req.phone}</p>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Request info:</p>
      <p style={{marginLeft: '1rem'}}>Location: {req.location[0].toUpperCase() + req.location.slice(1)} || Date/Time: {new Date(req.aptDate).toLocaleString('en-us', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'})} || Service: {req.service}{req.pedicure ? ', pedicure' : ''}{req.manicure ? ', manicure' : ''}</p>
      <div>
        <button className={styles.aptBtn} onClick={handleApprove}>Approve</button>
        <button className={styles.aptBtn} onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}

export default AppointmentRequest;