import React, { Component } from 'react';
import './resources/styles.css'

import Header from './components/header_footer/Header';
import Featured from './components/featured';   // index.js is implicit here

class App extends Component {
  render() {
    return (
      // temporarily hardcode style here to test AppBar transparency effect on scroll
      <div className="App" style={{ height:"1500px", background:'cornflowerblue'}}>
        <Header/>
        <Featured/>
      </div>
    );
  }
}

export default App;