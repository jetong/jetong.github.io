import React, { Component } from 'react';
import './resources/styles.css'

import Header from './components/header_footer/Header';
import Featured from './components/featured';   // index.js is implicit here
import VenueNfo from './components/venueNfo';
import Highlight from './components/Highlights';

class App extends Component {
  render() {
    return (
      // temporarily hardcode style here to test AppBar transparency effect on scroll
      // <div className="App" style={{ height:"1500px", background:'cornflowerblue'}}>
      <div className="App">
        <Header/>
        <Featured/>
        <VenueNfo/>
        <Highlight/>
      </div>
    );
  }
}

export default App;