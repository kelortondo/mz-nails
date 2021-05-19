import React from 'react';
import styles from '../styles/Home.module.css'
function AppointmentRequest({req}) {
  return(
    <div className={styles.aptRequest}>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Client info:</p>
      <p style={{marginLeft: '1rem'}}><i>Name:</i> {req.firstName} {req.lastName} || <i>Email:</i> {req.email} || <i>Phone number:</i> {req.phone}</p>
      <p style={{fontFamily: "Nickainley", fontSize: '1.75rem'}}>Request info:</p>
      <p style={{marginLeft: '1rem'}}><i>Location:</i> {req.location} || <i>Requested date:</i> {req.aptDate.slice(0, 10)} || <i>Requested service:</i> {req.service}, {req.pedicure ? 'pedicure,' : ''} {req.manicure ? 'manicure' : ''}</p>
    </div>
  )
}

export default AppointmentRequest;