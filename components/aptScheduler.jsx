//DEPENDENCIES
const axios = require('axios');

import React from 'react';

import DatePicker from "react-datepicker";

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import isBefore from "date-fns/isBefore";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";

import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
//END DEPENDENCIES

class AptScheduler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      service: '',
      aptDate: null,
      manicure: false,
      pedicure: false,
      approved: true,
      duration: 120,
      veronicaDays: [],
      doloresDays: [],
      availableDays: [],
      includedTimes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/location')
    .then((response) => {
      let locations = response.data;
      locations.forEach((date) => {
        if (date["_id"] === "veronica") {
          let parsedDates = [];
          date.dates.forEach((stringDate) => {
            stringDate = stringDate.slice(0, 12) + '3' + stringDate.slice(13)
            parsedDates.push(new Date(stringDate))
          })
          this.setState({
            veronicaDays: parsedDates
          })
        } else if (date["_id"] === "dolores") {
          let parsedDates = [];
          date.dates.forEach((stringDate) => {
            stringDate = stringDate.slice(0, 12) + '3' + stringDate.slice(13)
            parsedDates.push(new Date(stringDate))
          })
          this.setState({
            doloresDays: parsedDates
          })
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  updateAvailableTimes() {
    //All the possible times an appointment could begin
    let bookedTimes = {
      '0900': false,
      '0930': false,
      '1000': false,
      '1030': false,
      '1100': false,
      '1130': false,
      '1200': false,
      '1230': false,
      '1300': false,
      '1330': false,
      '1400': false,
      '1430': false,
      '1500': false,
      '1530': false,
      '1600': false,
      '1630': false,
      '1700': false,
      '1730': false,
      '1800': false
    }

    let bookedTimesArray = [
      '0900',
      '0930',
      '1000',
      '1030',
      '1100',
      '1130',
      '1200',
      '1230',
      '1300',
      '1330',
      '1400',
      '1430',
      '1500',
      '1530',
      '1600',
      '1630',
      '1700',
      '1730',
      '1800'
    ]

    //Based on the date requested by the client, get already-booked appointment times
    axios.get(`api/schedule?startDate=${this.state.aptDate}`)
    .then((response) => {
      let existingApts = response.data;

      existingApts.forEach((apt) => {
        //The currently occupied appointment time will be a string when coming from the DB.
        //We need to convert it to a date object, with the hours set for Buenos Aires
        let aptTime = (new Date(apt.aptDate)).toLocaleString('en-us', {timeZone: 'America/Argentina/Buenos_Aires'})

        //Parse the hour/min of the appointment from the date object
        let aptTimeHr = getHours(new Date(aptTime));
        if (aptTimeHr.length === 1) {
          aptTimeHr = '0' + aptTimeHr;
        } else {
          aptTimeHr = '' + aptTimeHr;
        }

        let aptTimeMin = getMinutes(new Date(aptTime));
        if (aptTimeMin === 0) {
          aptTimeMin = '00';
        } else {
          aptTimeMin = '' + aptTimeMin;
        }

        let aptTimeString = aptTimeHr + aptTimeMin;
        let startIndex = bookedTimesArray.indexOf(aptTimeString);
        console.log(aptTimeString);
        console.log(startIndex);

        //Most appointments will have a duration of 2 hours, unless otherwise specified
        //We will block appointment times which fall within the duration of this one
        let duration;
        if (!apt.duration || apt.duration === 2) {
          duration = 120
        } else if (apt.duration === 1) {
          duration = 60;
        } else {
          duration = apt.duration;
        }

        let thirtyMinBlocks = duration / 30
        for (let i = 0; i < thirtyMinBlocks; i++) {
          let key = bookedTimesArray[startIndex + i];
          bookedTimes[key] = true
        }
      })

      //Iterate over the bookedTimes object, adding non-occupied timeslots to the times array
      let times = [];

      for (let key in bookedTimes) {
        let hr = parseInt(key.slice(0, 2))
        let min = parseInt(key.slice(2))
        if (!bookedTimes[key]) {
          times.push(setHours(setMinutes(new Date(this.state.aptDate), min), hr))
        }
      }

      //Update state to reflect times that are non-occupied
      this.setState({
        includedTimes: times
      })
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
      alert("Please enter the full name and submit again.");
      missingInfo = true;
    }

    if (!this.state.email || !this.state.phone) {
      alert("Please enter the phone number and email and submit again.");
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
      var minutes = getMinutes(this.state.aptDate);
      var day = getDate(this.state.aptDate);
      var month = getMonth(this.state.aptDate);
      var year = getYear(this.state.aptDate);
      var _aptDate = new Date(Date.UTC(year, month, day, hours + 3, minutes))
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
        axios.post('/api/schedule', this.state)
        .then((response) => {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            service: '',
            aptDate: null,
            manicure: false,
            pedicure: false,
            approved: true,
            duration: 120
          });
          alert('Appointment created!')
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }
  }

  render() {
    return (
      <div className={styles.bookingInfo}>
        <div className={styles.dropDowns}>
          <div style={{display: 'flex', flexWrap: 'wrap', alignContent: 'center', flexDirection: 'column', padding: '1%'}}>
            <form onSubmit={this.handleSubmit}>
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
                  <input required type="radio" id="veronica" name="location" value="veronica" checked={this.state.location === "veronica"} onChange={(e) => this.handleChange(e)}/>
                  <label for="veronica">Veronica</label>
                </div>
                <div>
                  <input required type="radio" id="dolores" name="location" value="dolores" checked={this.state.location === "dolores"} onChange={(e) => this.handleChange(e)}/>
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
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', alignContent: 'center', flexDirection: 'column', padding: '1%'}}>
            <DatePicker
              dateFormat="MM/dd/yyyy h:mm aa"
              includeDates={this.state.availableDays}
              minDate={new Date()}
              selected={this.state.aptDate}
              onChange={date => this.handleChange(date)}
              inline
              showTimeSelect
              includeTimes={this.state.includedTimes}
            />
            <div><button style={{width: '327px'}}className={styles.reqAptBtn} onClick={(e) => this.handleSubmit(e)}>Create appointment</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AptScheduler;