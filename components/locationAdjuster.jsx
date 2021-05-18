import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
const axios = require('axios');

class LocationAdjustor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      startDate: '',
      endDate:  ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.preventDefault();
    const listDate = [];
    const startDate = this.state.startDate.toISOString().slice(0, 10);
    const endDate = this.state.endDate.toISOString().slice(0, 10);
    const dateMove = new Date(startDate);
    let strDate = startDate;

    while (strDate < endDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + 1);
    };
    console.log(listDate);
  }

  render() {
    return (
      <div>
        Choose the location:
        <div>
          <input type="radio" id="veronica" name="location" value="veronica" checked={this.state.location === "veronica"} onChange={(e) => this.handleChange(e)}/>
          <label for="veronica">Veronica</label>
        </div>
        <div>
          <input type="radio" id="dolores" name="location" value="dolores" checked={this.state.location === "dolores"} onChange={(e) => this.handleChange(e)}/>
          <label for="dolores">Dolores</label>
        </div>

        <div>
          Choose the dates:
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              minDate={new Date()}
              selectsRange
              inline
            />
          <button onClick={(e) => this.handleSubmit(e)}>Submit changes</button>
        </div>
      </div>
    );
  }
}

export default LocationAdjustor;