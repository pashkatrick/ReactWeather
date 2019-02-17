import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import List from './List'

export default class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityList: ["Барнаул", "Москва"],
      temp: '-20',
      type: 'Rain'
    }
  }

  componentDidMount() {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var today = new Date(),
    date = today.getDate() + ', ' + (months[today.getMonth()]);
    this.setState({
      date: date.toString()
    })
  }

  onChangeCity = (e) => {
    this.setState({currentCity: e.target.value});
  }

  addCity = (e) => {
    e.preventDefault ()
    this.setState({
      cityList: [...this.state.cityList, this.state.currentCity]
    })
    this.getWeather(this.state.currentCity);
  }

  getWeather = (city) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7071ec63a8e93530f14464891982c332')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data.main.temp + "" + data.weather[0].main);
      this.setState({
        temp: Math.round(data.main.temp - 273),
        type: data.weather[0].main
      })
    })
  }

  handleCity = (e) => {
    this.setState({
      currentCity: e.target.textContent
    })
    this.getWeather(e.target.textContent);
  }

  render() {
     const cityElement = this.state.cityList.map((item, index) => <li key={index.toString()}><a href="#" onClick={this.handleCity}>{item}</a></li>)

     return (
             <div className="background">
             <div className="container">
               <div className="list">
                 <ul>
                  {cityElement}
                 </ul>
               </div>
               <div id="card" className="weather">
                 <div className="details">
                   <div className="temp">{this.state.temp}<span>c</span></div>
                   <div className="right">
                     <div id="date">{this.state.date}</div>
                     <div id="summary">{this.state.type}</div>
                   </div>
                 </div>
                 <form onSubmit={this.addCity}>
                  <input id="city-input" type="text" onChange={this.onChangeCity} placeholder="Type your city + enter" autofocus />
                 </form>
               </div>
             </div>
           </div>

       );
   }
}
