import React from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';
function AppointmentRequest({req, handleRerender}) {

  const handleDelete = function() {
    axios.delete('/api/appointments', {
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

  return(
    <div className={styles.aptRequest}>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Client info:</p>
      <p style={{marginLeft: '1rem'}}><i>Name:</i> {req.firstName} {req.lastName} || <i>Email:</i> {req.email} || <i>Phone number:</i> {req.phone}</p>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Request info:</p>
      <p style={{marginLeft: '1rem'}}><i>Location:</i> {req.location} || <i>Requested date:</i> {req.aptDate.slice(0, 10)} || <i>Requested service:</i> {req.service}, {req.pedicure ? 'pedicure,' : ''} {req.manicure ? 'manicure' : ''}</p>
      <div>
        <button className={styles.aptBtn}>Approve</button>
        <button className={styles.aptBtn}>Approve with changes</button>
        <button className={styles.aptBtn} onClick={handleDelete}>Remove</button>
      </div>
    </div>
  )
}

export default AppointmentRequest;