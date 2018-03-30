import React, { Component } from 'react';
import { MyFirstGrid } from './grid.js'

import './css/App.css';
import './css/react-grid-styles.css';
import './css/resizable-style.css';


class App extends Component {
  render() {
      return (
          <MyFirstGrid/>
          // <div className="App">
          //     <header className="heading">
          //         <h1 className="title">FaceLookup</h1>
          //     </header>
          //
          // </div>
      )
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );
  }
}


export default App;
