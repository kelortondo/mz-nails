import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
const axios = require('axios');
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import isBefore from "date-fns/isBefore";
import getHours from 'date-fns/getHours'


class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    let startDateString = new Date().toISOString().slice(0, 10);
    let start = new Date(startDateString+'T09:00:00.000-03:00');
    let times = [];
    for (let startHour = 9; startHour <= 18; startHour++) {
      times.push(setHours(setMinutes(start, 0), startHour))
    }

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
      approved: false,
      veronicaDays: [],
      doloresDays: [],
      availableDays: [],
      includedTimes: times
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
    .catch((err) => {
      console.log(err);
    })
  }

  updateAvailableTimes() {

    let bookedTimes = {
      9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false
    }
    axios.get(`api/schedule?startDate=${this.state.aptDate}`)
    .then((response) => {
      let existingApts = response.data;
      existingApts.forEach((apt) => {
        let aptTime = (new Date(apt.aptDate)).toLocaleString('en-us', {timeZone: 'America/Argentina/Buenos_Aires'})
        aptTime = getHours(new Date(aptTime))
        let duration = apt.duration || 2
        for (let i = 0; i < duration; i++) {
          bookedTimes[aptTime + i] = true
        }
      })

      let times = [];

      for (let key in bookedTimes) {
        if (!bookedTimes[key]) {
          times.push(setHours(setMinutes(new Date(this.state.aptDate), 0), key))
        }
      }

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

    if (!this.state.aptDate || isBefore(this.state.aptDate, start)) {
      alert("Please select an appointment date/time and submit again.");
      missingInfo = true;
    }

    if (!this.state.manicure && !this.state.pedicure) {
      alert("Please choose a manicure or pedicure and submit again.");
      missingInfo = true;
    }

    if (!missingInfo) {
      let fixedTimeString = new Date(this.state.aptDate).toISOString().replace('Z', '');
      let time = new Date(fixedTimeString)

      this.setState({
        aptDate: time
      }, () => {
        axios.post('/api/clients', this.state)
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
            approved: false
          });
          alert('Request received! You will be contacted to confim your appointment within a day.')
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }
  }

  render() {
    return (
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
              Desired location of service:
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
          <div style={{color: 'white'}}><i>All times are for Buenos Aires (GMT -3).</i></div>
          <div style={{color: 'white'}}><i>Unavailable times are hidden.</i></div>
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
          <button style={{width: '327px'}}className={styles.reqAptBtn} onClick={(e) => this.handleSubmit(e)}>Request appointment</button>
        </div>
      </div>
    );
  }
}

export default BookingForm;

