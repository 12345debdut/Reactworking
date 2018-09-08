import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Course from './Course.js'

class App extends Component {
  render() {
    var courses = [
      {name: 'Complete IOS 10 dev course',price:199},
      {name: 'Complete pen testing course',price:299},
      {name: 'Complete front end developer course',price:399},
      {name: 'Bug bounty and web application',price:499}
  ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to course sale page</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Course items={courses}/>
      </div>
    );
  }
}

export default App;
