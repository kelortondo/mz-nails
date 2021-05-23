import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
const axios = require('axios');
import AppointmentRequest from './appointmentRequest.jsx';

class RequestedAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/requests')
    .then((response) => {
      this.setState({
        requests: response.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleChange(event) {
    if (event.target) {
      let stateVar = event.target.name;
      let val = event.target.value;
      this.setState({[stateVar]: val});
    } else {
      const [start, end] = event;
      this.setState({
        startDate: start,
        endDate: end
      })
    }
  }

  handleSubmit(event) {
    axios.get('/api/requests')
    .then((response) => {
      this.setState({
        requests: response.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    if (this.state.requests.length === 0) {
      return (
        <div style={{margin: 'auto', textAlign: 'center'}}>No pending requests, check back later.</div>
      )
    } else {
      return (
        <>
          {this.state.requests.map((request, index) => {
            return(
              <AppointmentRequest key={index} req={request} handleRerender={this.handleSubmit}/>
            )
          })}
        </>
      );
    }
  }
}

export default RequestedAppointments;