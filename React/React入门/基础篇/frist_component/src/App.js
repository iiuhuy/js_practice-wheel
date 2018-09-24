import React, { Component } from 'react';

import Header from './component/Header';
import Home from  './component/Home';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <Header/>
          </div>
        </div>      
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <Home/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>香！！！</h1>
            {2+2}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
