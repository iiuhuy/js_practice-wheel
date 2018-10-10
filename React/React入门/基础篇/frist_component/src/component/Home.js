import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {

  // 创建对象的方式: 里面设置 state 的初始值
  constructor(props) {
    super(props);
    // this.age = this.props.age;
    this.state = {
      age: props.initAge,
      // 设置一个状态值, 当网页加载过后 3s, 这个值变为 1
      status: 0,
      homeLink: "Changed link!!!"
    }
    console.log("Home constructor : " + this.state);
    setTimeout(() => {
      this.setState({
        status: 1
      })
    }, 3000)
    console.log("Constructor");
  }

  onMakeOlder() {
    // this.age += 3;
    this.setState({
      age:  this.state.age + 3
    })
    console.log(this.state.age);
  }


  handleGreet() {
    this.props.greet(this.state.age);
  }

  onChangeLink() {
    // 生命周期中执行 Received 方法, 当单击 btn 后, 进入这里即 onChangeLink， 
    // 然后 state 传入父类(constructor 内), homeLink 改变了再传给 <Home> component
    this.props.changeLink(this.state.homeLink);
    console.log("Home->onChangeLink" + this.props.changeLink);
  }

  onHandleChange(event) {
    this.setState({
      // 使用 event.target.value 取出来
      homeLink: event.target.value,
    });
    // 输入的时候会执行到这里
    console.log("Home->onHandleChange" + event.target.value);
  }

  componentWillMount() {
    console.log("Component will mount");
  }

  componentDidMount() {
    console.log("Component did mount");
  }

  // 在接受到新的 props
  componentWillReceiveProps(nextProps) {
    console.log("Component will receive props", nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Component should update", nextProps, nextState);
    if(nextState.status === 1) {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Component will update", nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update", prevProps, prevState);
  }
  
  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    console.log("render");
    // 输出传递过来的内容.
    // console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <div>your name is {this.props.name}, youre age is {this.state.age}</div>
            {/* <button onClick={this.onMakeOlder.bind(this)} class="btn btn-primary">Make me older</button> */}
            <p>Status: {this.state.status}</p>
            <button onClick={() => {this.onMakeOlder()}} className="btn btn-primary">Make me older</button>
            <hr />
            <button onClick={this.handleGreet.bind(this)} className="btn btn-primary">Greet</button>
            <hr />
            <input 
              type="" 
              defaultValue={this.props.initialName} 
              value={this.state.initialName} 
              onChange={(event) => this.onHandleChange(event)}
            />
            <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change home link</button>
            <hr/>
            {/* <div>
              <h4>hobbies</h4>
              <ul>
                {this.props.user.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
              </ul>
              <div>{this.props.children}</div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

// 类型检查 
Home.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  user: PropTypes.object,
  // 父节点传递子节点的类型检查
  // children: PropTypes.element.isRequired,
  greet: PropTypes.func,
  initialName: PropTypes.string

};

// export default App;
