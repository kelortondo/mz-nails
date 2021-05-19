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
      endDate:  '',
      doloresDays: [],
      veronicaDays: [],
      dateHighlights: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/location')
    .then((response) => {
      let locations = response.data;
      console.log(locations)
      locations.forEach((date) => {
        if (date["_id"] === "veronica") {
          let parsedDates = [];
          date.dates.forEach((stringDate) => {
            let timelessDate = stringDate.slice(0, 10).replace(/-/g, '\/');
            parsedDates.push(new Date(timelessDate))
          })
          this.setState({
            veronicaDays: parsedDates
          })
        } else if (date["_id"] === "dolores") {
          let parsedDates = [];
          date.dates.forEach((stringDate) => {
            let timelessDate = stringDate.slice(0, 10).replace(/-/g, '\/');
            parsedDates.push(new Date(timelessDate))
          })
          this.setState({
            doloresDays: parsedDates
          })
        }
      })
    })
    .then(() => {
      this.setState({
        dateHighlights: [
          {
            "react-datepicker__day--highlighted-custom-1": this.state.doloresDays
          },
          {
            "react-datepicker__day--highlighted-custom-2": this.state.veronicaDays
          }
        ]
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

    const bulkWrite = [];
    listDate.forEach((date) => {
      bulkWrite.push({
        updateOne: {
          filter: {
            date: date
          },
          update: {
            location: this.state.location
          },
          upsert: true
        }
      })
    })
    axios.post('/api/location', {bulk: bulkWrite})
    .then(() => {
      axios.get('/api/location')
      .then((response) => {
        let locations = response.data;
        locations.forEach((date) => {
          if (date["_id"] === "veronica") {
            let parsedDates = [];
            date.dates.forEach((stringDate) => {
              let timelessDate = stringDate.slice(0, 10).replace(/-/g, '\/');
            parsedDates.push(new Date(timelessDate))
            })
            this.setState({
              veronicaDays: parsedDates
            })
          } else if (date["_id"] === "dolores") {
            let parsedDates = [];
            date.dates.forEach((stringDate) => {
              let timelessDate = stringDate.slice(0, 10).replace(/-/g, '\/');
              parsedDates.push(new Date(timelessDate))
            })
            this.setState({
              doloresDays: parsedDates
            })
          }
        })
      })
      .then(() => {
        this.setState({
          dateHighlights: [
            {
              "react-datepicker__day--highlighted-custom-1": this.state.doloresDays
            },
            {
              "react-datepicker__day--highlighted-custom-2": this.state.veronicaDays
            }
          ]
        })
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })

    this.setState({
      location: '',
      startDate: '',
      endDate:  ''
    })
  }

  render() {
    return (
      <div>
        Choose the location:
        <div>
          <input type="radio" id="veronica" name="location" value="veronica" checked={this.state.location === "veronica"} onChange={(e) => this.handleChange(e)}/>
          <label for="veronica" style={{color: '#fd8abb'}}>Veronica</label>
        </div>
        <div>
          <input type="radio" id="dolores" name="location" value="dolores" checked={this.state.location === "dolores"} onChange={(e) => this.handleChange(e)}/>
          <label for="dolores" style={{color: '#83bae8'}}>Dolores</label>
        </div>

        <div>
          Choose the dates:
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              minDate={new Date()}
              highlightDates={this.state.dateHighlights}
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