import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
const axios = require('axios');

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
      aptDate: new Date(),
      manicure: false,
      pedicure: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setState({[stateVar]: val});
    } else {
      this.setState({
        aptDate: event
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/clients', this.state)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className={styles.dropDowns}>
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
        <div>
          Date Requested:
          <DatePicker dateFormat="MM/dd/yyyy" minDate={new Date()} selected={this.state.aptDate} onChange={date => this.handleChange(date)} inline/>
          <p style={{backgroundColor: 'white'}}>Apt times here</p>
          <button onClick={(e) => this.handleSubmit(e)}>Book appointment</button>
        </div>
      </div>
    );
  }
}

export default BookingForm;