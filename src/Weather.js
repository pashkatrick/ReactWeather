import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import List from './List'

export default class Weather extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityList: []
    }
  }

  onChange = (e) => {
    this.setState({currentCity: e.target.value});
  }

  addCity = (e) => {
    e.preventDefault ()
    this.setState({
      cityList: [...this.state.cityList, this.state.currentCity]
    })
    localStorage.setItem('list', this.state.cityList);
    console.log(localStorage.getItem('list'));
    // this.getWeather();
  }

  getWeather = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.currentCity + '&appid=7071ec63a8e93530f14464891982c332')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data.wind);
    })
  }


  render() {
     const cityElement = Object.keys(localStorage).map((item, index) => <li key={index.toString()}>#{localStorage.getItem('list')}</li>)

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
                   <div className="temp">20<span>c</span></div>
                   <div className="right">
                     <div id="date">Monday 22 August</div>
                     <div id="summary">Rain</div>
                   </div>
                 </div>
                 <form onSubmit={this.addCity}>
                  <input id="city-input" type="text" onChange={this.onChange} placeholder="Type your city + enter" autofocus />
                 </form>
               </div>
             </div>
           </div>

       );
   }
}
