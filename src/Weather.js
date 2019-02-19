import React, { Component } from 'react';
import './styles/App.css';

export default class Weather extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityList: props.cityList,
      currentCity: props.currentCity,
      outputCity: props.currentCity,
      temp: '',
      type: ''
    }
  }

  componentDidMount() {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var today = new Date(),
    date = today.getDate() + ', ' + (months[today.getMonth()]);
    this.setState({
      date: date.toString()
    });
    this.getWeather(this.props.currentCity);
  }

  onChangeCity = (e) => {
    if (!e.target.value == "") this.setState({currentCity: e.target.value});
  }

  addCity = (e) => {
    e.preventDefault ();
    this.setState({
      cityList: [...this.state.cityList, this.state.currentCity],
      outputCity: this.state.currentCity
    })
    this.getWeather(this.state.currentCity);
  }

  getWeather = (city) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7071ec63a8e93530f14464891982c332')
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        temp: Math.round(data.main.temp - 273),
        type: data.weather[0].main
      })
    })
    .catch(error => {
      console.log(error)
      alert("Please, put your VPN On") 
    })
  }

  handleCity = (e) => {
    this.setState({
      currentCity: e.target.textContent,
      outputCity: e.target.textContent
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
                   <div className="temp">{this.state.temp}
                      <span>c</span>
                      <br />
                      <span>{this.state.outputCity}</span>
                   </div>
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
