import React, { Component } from 'react';

import Header from './component/Header';
import Home from  './component/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      homeLink: "Home",
      homeMounted: true
    }
  }

  onGreet(age) {
    alert(age);
  }

  onChangeLinkName(newName) {
    this.setState ({
      homeLink: newName
    })
  }

  // Mount 状态的切换
  onChangeHomeMounted() {
    this.setState({
      homeMounted: !this.state.homeMounted
    })
  }

  render() {
    const user = {
      name: "alvinmi",
      hobbies: ["Soprts", "Reading"],
      age: 22
    }

    console.log("App:" + this.state.homeLink);
    let homeCmp = "";
    if (this.state.homeMounted) {
      homeCmp = (
        <Home 
          name={"Max"} 
          initAge={12} 
          user={user} 
          greet={this.onGreet} 
          changeLink={this.onChangeLinkName.bind(this)}
          initialName={this.state.homeLink}
        />
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <Header homeLink={this.state.homeLink}/>
          </div>
        </div>      
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Hello!!!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>香！！！</h1>
              {/* <Home 
                name={"Max"} 
                initAge={12} 
                user={user} 
                greet={this.onGreet} 
                changeLink={this.onChangeLinkName.bind(this)}
                initialName={this.state.homeLink}>
              </Home> */}
              {homeCmp}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <button onClick={this.onChangeHomeMounted.bind(this)} className="btn btn-primary">(Un)mount Home Component.</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
