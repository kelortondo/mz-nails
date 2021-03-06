import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/Home.module.css'
const axios = require('axios');
import ApprovedAppointment from './approvedAppointment.jsx';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import setHours from "date-fns/setHours";

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    let oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    this.state = {
      appointments: [],
      startDate: setHours(new Date(), 3),
      endDate: oneYearFromNow,
      seeAll: false,
      hidePast: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.refreshSchedule = this.refreshSchedule.bind(this);
  }

  refreshSchedule() {
    //If we want to see all appointments, including past appointments
    if (this.state.seeAll && !this.state.hidePast) {
      axios.get(`/api/schedule`)
      .then((response) => {
        this.setState({
          appointments: response.data
          })
      })
      .catch((err) => {
        console.log(err);
      })
    //If we want to see all appointments, excluding past appointments
    } else if (this.state.seeAll && this.state.hidePast) {
      axios.get(`/api/schedule?startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
      .then((response) => {
        this.setState({
          appointments: response.data
          })
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
    //We only want to see appointments for the selected date
      axios.get(`/api/schedule?startDate=${this.state.startDate}`)
      .then((response) => {
        this.setState({
          appointments: response.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  componentDidMount() {
    this.refreshSchedule();
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
          this.refreshSchedule();
        }
      );
    } else {
      this.setState({ startDate: event}, () => {
        this.refreshSchedule();
        }
      );
    }
  }

  increaseDay() {
    let currentDate = this.state.startDate;
    currentDate.setDate(currentDate.getDate() + 1)

    this.setState({startDate: currentDate}, () => {
      this.refreshSchedule();
    })
  }

  decreaseDay() {
    let currentDate = this.state.startDate;
    currentDate.setDate(currentDate.getDate() - 1)

    this.setState({startDate: currentDate}, () => {
      this.refreshSchedule();
    })
  }

  render() {
    return (
      <div className={styles.info}>
        <div className={styles.dropDowns}>
          <div>
            <IconButton aria-label="previous day" onClick={(e) => this.decreaseDay()}>
              <ArrowBackIcon style={{color: 'white'}}/>
            </IconButton>
            <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
            <IconButton aria-label="next day" onClick={(e) => this.increaseDay()}>
              <ArrowForwardIcon style={{color: 'white'}}/>
            </IconButton>
          </div>
          <div style={{minWidth: '150px', padding: '1%'}}>
            <div>
              <label style={{paddingRight: '5%'}}>See all</label><input  type="checkbox" id="seeAll" name="seeAll" checked={this.state.seeAll} onChange={(e) => this.handleChange(e)}/>
            </div>
            <div style={{display: this.state.seeAll ? 'block' : 'none'}}>
              <label style={{paddingRight: '5%'}}>Hide past</label><input type="checkbox" id="seeAll" name="hidePast" checked={this.state.hidePast} onChange={(e) => this.handleChange(e)}/>
            </div>
          </div>
          {this.state.appointments.map((request, index) => {
            return(
              <ApprovedAppointment key={index} req={request} handleRerender={this.refreshSchedule}/>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Schedule;