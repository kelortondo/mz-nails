//DEPENDENCIES
const axios = require('axios');

import React from 'react';

import DatePicker from "react-datepicker";

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import isBefore from "date-fns/isBefore";
import getHours from "date-fns/getHours";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";

import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
//END DEPENDENCIES

class AptEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props.req._id,
      firstName: this.props.req.firstName,
      lastName: this.props.req.lastName,
      email: this.props.req.email,
      phone: this.props.req.phone,
      location: this.props.req.location,
      service: this.props.req.service,
      aptDate: new Date(this.props.req.aptDate),
      manicure: this.props.req.manicure,
      pedicure: this.props.req.pedicure,
      approved: true,
      duration: this.props.req.duration || 2,
      veronicaDays: [],
      doloresDays: [],
      availableDays: [],
      includedTimes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAvailableTimes() {
    //All the possible times an appointment could begin
    let bookedTimes = {
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false,
      18: false
    }

    //Based on the date requested by the client, get already-booked appointment times
    axios.get(`api/schedule?startDate=${this.state.aptDate}`)
    .then((response) => {
      let existingApts = response.data;

      existingApts.forEach((apt) => {
        //The currently occupied appointment time will be a string when coming from the DB.
        //We need to convert it to a date object, with the hours set for Buenos Aires
        let aptTime = (new Date(apt.aptDate)).toLocaleString('en-us', {timeZone: 'America/Argentina/Buenos_Aires'})

        //Parse the hour of the appointment from the date object
        aptTime = getHours(new Date(aptTime))

        //Most appointments will have a duration of 2 hours, unless otherwise specified
        //We will block appointment times which fall within the duration of this one
        let duration = apt.duration || 2
        for (let i = 0; i < duration; i++) {
          bookedTimes[aptTime + i] = true
        }
      })

      //Iterate over the bookedTimes object, adding non-occupied timeslots to the times array
      let times = [];

      for (let key in bookedTimes) {
        if (!bookedTimes[key]) {
          times.push(setHours(setMinutes(new Date(this.state.aptDate), 0), key))
        }
      }

      //Update state to reflect times that are non-occupied
      this.setState({
        includedTimes: times
      })
    })
  }

  componentDidMount() {
    axios.get('/api/location')
    .then((response) => {
      let locations = response.data;
      locations.forEach((date) => {
        if (date["_id"] === "veronica") {
          let parsedDates = [];
          date.dates.forEach((stringDate) => {
            parsedDates.push(new Date(stringDate))
          })
          this.setState({
            veronicaDays: parsedDates
          })
        } else if (date["_id"] === "dolores") {
          let parsedDates = [];
          date.dates.forEach((stringDate) => {
            parsedDates.push(new Date(stringDate))
          })
          this.setState({
            doloresDays: parsedDates
          })
        }
      })
    })
    .then(() => {
      this.updateAvailableTimes();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleChange(event) {
    if (event.target) {
      let stateVar = event.target.name;
      let val;

      if (event.target.type === 'checkbox') {
        val = event.target.checked
      } else {
        val = event.target.value;
      }
      this.setState({[stateVar]: val}, () => {
        if (this.state.location === "veronica") {
          this.setState({
            availableDays: this.state.veronicaDays
          })
        } else if (this.state.location === "dolores") {
          this.setState({
            availableDays: this.state.doloresDays
          })
        }
      });
    } else {
      this.setState({
        aptDate: new Date(event)
      }, () => {
        this.updateAvailableTimes()
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let missingInfo = false;

    if (!this.state.firstName || !this.state.lastName) {
      alert("Please enter your full name and submit again.");
      missingInfo = true;
    }

    if (!this.state.email || !this.state.phone) {
      alert("Please enter your phone number and email and submit again.");
      missingInfo = true;
    }

    if (!this.state.service) {
      alert("Please select a service and submit again.");
      missingInfo = true;
    }

    if (!this.state.aptDate) {
      alert("Please select an appointment date/time and submit again.");
      missingInfo = true;
    } else {
      var rawAptDate = this.state.aptDate;
      var hours = getHours(this.state.aptDate);
      var day = getDate(this.state.aptDate);
      var month = getMonth(this.state.aptDate);
      var year = getYear(this.state.aptDate);
      var _aptDate = new Date(Date.UTC(year, month, day, hours + 3))
      let _earliestDate = new Date(Date.UTC(year, month, day, 12))
      if (isBefore(_aptDate, _earliestDate)) {
        alert("Please select an appointment date/time and submit again.")
        missingInfo = true;
      }
    }

    if (!this.state.manicure && !this.state.pedicure) {
      alert("Please choose a manicure or pedicure and submit again.");
      missingInfo = true;
    }

    if (!missingInfo) {
      this.setState({
        aptDate: _aptDate
      }, () => {
        axios.put('/api/schedule', this.state)
        .then(() => {
          alert('Appointment updated!')
          this.props.handleClose();
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }
  }

  render() {
    return (
      <div className={styles.editAptModal}>
        <form onSubmit={this.handleSubmit} style={{margin: 'auto', maxWidth: '600px'}}>
          <label>
            First name:
            <input required type="text" name='firstName' value={this.state.firstName} onChange={(e) => this.handleChange(e)} />
          </label>
          <label>
            Last name:
            <input required type="text" name='lastName' value={this.state.lastName} onChange={(e) => this.handleChange(e)} />
          </label>
          <label>
            Email Address:
            <input required type="email" name='email' value={this.state.email} onChange={(e) => this.handleChange(e)} />
          </label>
          <label>
            Phone number:
            <input required type="tel" name='phone' value={this.state.phone} onChange={(e) => this.handleChange(e)} />
          </label>
            Location of service:
            <div>
              <input type="radio" id="veronica" name="location" value="veronica" checked={this.state.location === "veronica"} onChange={(e) => this.handleChange(e)}/>
              <label for="veronica">Veronica</label>
            </div>
            <div>
              <input type="radio" id="dolores" name="location" value="dolores" checked={this.state.location === "dolores"} onChange={(e) => this.handleChange(e)}/>
              <label for="dolores">Dolores</label>
            </div>

          <label>
            Service:
            <select required name='service' value={this.state.service} onChange={(e) => this.handleChange(e)}>
              <option hidden selected disabled value="">Please choose an option</option>
              <option value="capping">Capping</option>
              <option value="sculpted">Sculpted</option>
              <option value="semiperm">Semi-permanent</option>
            </select>
          </label>
            Pedicure and/or Manicure:
            <div>
              <input type="checkbox" id="manicure" name="manicure" checked={this.state.manicure} onChange={(e) => this.handleChange(e)}/>
              <label for="manicure">Manicure</label>
            </div>
            <div>
              <input type="checkbox" id="pedicure" name="pedicure" checked={this.state.pedicure} onChange={(e) => this.handleChange(e)}/>
              <label for="pedicure">Pedicure</label>
            </div>
        </form>
        <div >
          <div style={{margin: 'auto'}}>
            <DatePicker
              dateFormat="MM/dd/yyyy h:mm aa"
              includeDates={this.state.availableDays}
              minDate={new Date()}
              selected={this.state.aptDate}
              onChange={date => this.handleChange(date)}
              inline
              showTimeSelect
              includeTimes={this.state.includedTimes}
              timeIntervals={60}
            />
            <div><button className={styles.editAptBtn} onClick={(e) => this.handleSubmit(e)}>Save appointment</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AptEditor;