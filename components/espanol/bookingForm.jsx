//DEPENDENCIES
const axios = require('axios');

import React from 'react';

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";

import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import isBefore from "date-fns/isBefore";
import getHours from 'date-fns/getHours'
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";
import es from 'date-fns/locale/es';
registerLocale('es', es)

import "react-datepicker/dist/react-datepicker.css";
import styles from '../../styles/Home.module.css'
//END DEPENDENCIES

class BookingForm extends React.Component {
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
      approved: false,
      duration: 2,
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
      alert("Por favor ingrese su nombre completo y solicite el turno");
      missingInfo = true;
    }

    if (!this.state.email || !this.state.phone) {
      alert("Por favor ingrese su número de teléfono/mail y solicite el turno");
      missingInfo = true;
    }

    if (!this.state.service) {
      alert("Por favor seleccione algún servicio y solicite el turno");
      missingInfo = true;
    }

    if (!this.state.aptDate) {
      alert("Por favor elija un día y hora para su turno y solicite el turno");
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
        alert("Por favor elija un día y hora para su turno y solicite el turno")
        missingInfo = true;
      }
    }

    if (!this.state.manicure && !this.state.pedicure) {
      alert("Por favor elija si manicura/pedicura o ambos y solicite el turno");
      missingInfo = true;
    }

    if (!missingInfo) {
      this.setState({
        aptDate: _aptDate
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
            approved: false,
            duration: 2
          });
          alert('Su reserva a sido recibida con éxito. Aguarde confirmación.')
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
              Nombre:
              <input required type="text" name='firstName' value={this.state.firstName} onChange={(e) => this.handleChange(e)} />
            </label>
            <label>
              Apellido:
              <input required type="text" name='lastName' value={this.state.lastName} onChange={(e) => this.handleChange(e)} />
            </label>
            <label>
              Correo electrónico:
              <input required type="email" name='email' value={this.state.email} onChange={(e) => this.handleChange(e)} />
            </label>
            <label>
              Número de teléfono:
              <input required type="tel" name='phone' value={this.state.phone} onChange={(e) => this.handleChange(e)} />
            </label>
              Ubicación:
              <div>
                <input type="radio" id="veronica" name="location" value="veronica" checked={this.state.location === "veronica"} onChange={(e) => this.handleChange(e)}/>
                <label for="veronica">Veronica</label>
              </div>
              <div>
                <input type="radio" id="dolores" name="location" value="dolores" checked={this.state.location === "dolores"} onChange={(e) => this.handleChange(e)}/>
                <label for="dolores">Dolores</label>
              </div>

            <label>
              Por favor, elija una opción
              <select required name='service' value={this.state.service} onChange={(e) => this.handleChange(e)}>
                <option hidden selected disabled value=""></option>
                <option value="capping">Kapping gel</option>
                <option value="sculpted">Esculpidas en Polygel</option>
                <option value="semiperm">Esmaltado tradicional/ semi permanente</option>
              </select>
            </label>
              Pedicura / Manicura:
              <div>
                <input type="checkbox" id="manicure" name="manicure" checked={this.state.manicure} onChange={(e) => this.handleChange(e)}/>
                <label for="manicure">Manicura</label>
              </div>
              <div>
                <input type="checkbox" id="pedicure" name="pedicure" checked={this.state.pedicure} onChange={(e) => this.handleChange(e)}/>
                <label for="pedicure">Pedicura</label>
              </div>
          </form>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', alignContent: 'center', flexDirection: 'column', padding: '1%'}}>
          <DatePicker
            includeDates={this.state.availableDays}
            minDate={new Date()}
            selected={this.state.aptDate}
            onChange={date => this.handleChange(date)}
            inline
            showTimeSelect
            includeTimes={this.state.includedTimes}
            timeIntervals={60}
            locale="es"
            dateFormat="MM/dd/yyyy h:mm aa"
          />
          <button style={{width: '327px'}}className={styles.reqAptBtn} onClick={(e) => this.handleSubmit(e)}>Solicitar Turno</button>
        </div>
      </div>
    );
  }
}

export default BookingForm;

