import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
const axios = require('axios');
import ApprovedAppointment from './approvedAppointment.jsx';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      startDate: new Date(),
      seeAll: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/schedule?date=${this.state.startDate}`)
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
      let val;

      if (event.target.type === 'checkbox') {
        val = event.target.checked
      } else {
        val = event.target.value;
      }
      this.setState({[stateVar]: val}, () => {
        if (this.state.seeAll === true) {
          axios.get(`/api/schedule`)
          .then((response) => {
            console.log(response);
          this.setState({
            requests: response.data
            })
          })
          .catch((err) => {
            console.log(err);
          })
        } else {
          axios.get(`/api/schedule?date=${this.state.startDate}`)
          .then((response) => {
            console.log(response);
          this.setState({
            requests: response.data
            })
          })
          .catch((err) => {
            console.log(err);
          })
        }
      });
    } else {
      this.setState({
        startDate: event
      }, () => {
        if (this.state.seeAll === false) {
          axios.get(`/api/schedule?date=${this.state.startDate}`)
          .then((response) => {
            console.log(response);
          this.setState({
            requests: response.data
            })
          })
          .catch((err) => {
            console.log(err);
          })
        } else {
          axios.get(`/api/schedule`)
          .then((response) => {
            console.log(response);
          this.setState({
            requests: response.data
            })
          })
          .catch((err) => {
            console.log(err);
          })
        }
      })
    }
  }

  handleSubmit(event) {
    axios.get(`/api/schedule?date=${this.state.startDate}`)
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
    return (
      <>
        <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
        <div>
          <label for="seeAll">See all</label>
          <input type="checkbox" id="seeAll" name="seeAll" checked={this.state.seeAll} onChange={(e) => this.handleChange(e)}/>
        </div>
        {this.state.requests.map((request, index) => {
          return(
            <ApprovedAppointment key={index} req={request} handleRerender={this.handleSubmit}/>
          )
        })}
      </>
    );
  }
}

export default Schedule;