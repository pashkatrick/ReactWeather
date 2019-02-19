import React, { Component } from 'react';
import Weather from './Weather'

class App extends Component {
  render() {
    const list = ["Барнаул", "Москва"];
    const current = "Барнаул";
    return (
      <div className="App">
        <Weather cityList={list} currentCity={current}/>
      </div>
    );
  }
}

export default App;
