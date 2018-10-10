# React 状态管理与同构实战
颜大 的书, 顺便学习 React 就买了签名版的。

书籍源码: https://github.com/react-book/book-code
## 第一章 React 与前端
React 是什么？  哈哈, 不告诉你。 自己去找答案。

React 有三个特色:
 - 声明式
 - 基于组件
 - 一次学习，多端受用

 ### 声明式
 下面代码中的 flag 如果发生变化, 界面就会自动刷新:
 ```js
class HelloMessage extends React.Component {
    render() {
        const {flag} = this.state;
        return (
            <div>
                {flag === 1 ? 'Hello' : '哈喽'}
            </div>
        )
    }
}
 ```

### React Router 
React 非常适合做单页面应用, React Router 就是为 React 定制的路由，下面实现首页和文章页的跳转:
```js
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router';

class App extends  React.Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="home" component={Home}>
            <Route path="article" component={Article}>
        </Route>
    </Router>
))
```

### Redux 
将界面和数据与对数据操作进行分离。Redux 是 JavaScript 的状态容器, 提供可预测化的状体管理.

### React Native
React Native 是一套披着 React 外衣的原生控件, React Native 将原生控件封装为跨平台的 React 组件, 并赋予能通过 JavaScript 调用原生控件的能力。

在 React Native 没有 CSS, 但是 React Native 让我们可以通过 CSS 的语法来设置原生控件的属性。

```js
var React = require('react-native');
var {Text, View} = React;

var style = React.StyleSheet.create({
    container: {
        color: 'red'
    }
});
class Hello extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text> hello react native </Text>
            </View>
        )
    }
}
```
React Native 就是用 React 语法封装过的原生控件, 用 CSS 语法设置控件属性。

## 第二章 深入浅出 React
主要围绕组件展开, 组件的实现方式、组件的抽象、JSX 语法、组件的生命周期、组件的属性和状态、如何进行事件交互、组件间如何通信、如何组织组件、组件与DOM的关系等。

### 组件
输入在 React 中叫作 props, 自己的状态在 React 中叫作 state, 输出在 React 中是 render 函数的返回值。

组件必须先定义才能使用！
React 组件定义方式的几次进化:
- 1.createClass

    这是最原始的方式, 现在不是很常用了。
    ```js
    var React = require("react");

    var Hello = React.createClass({
        propTypes: {
            name: React.PropTypes.string
        },
        getDefaultProps: function() {
            return {name: 'yan'}
        },
        getInitialState: function() {
            return {count: 1}
        },
        render: function() {
            return <div>Hello {this.props.name} {this.state.count}</div>
        }
    })

    /* 上面创建了一个 Hello 组件， 包含了 属性、状态和 render 函数
    // 创建组件后就能渲染到 DOM 中了*/
    var ReactDOm = require('react-dom');
    ReactDOM.render(
        <Hello/>,
        document.getElementById('root');
    );
    ```
- 2.Component 随着 ES6，不再使用 createClass, 而是使用 class 关键字

    ```js
    import React from 'react';

    class Hello extends React.Component {
        static propTypes = {
            name: React.PropTypes.string
        }
        
        static defaultProps = {
            name: 'yan'
        }
        
        constructor(props) {
            super(props);
            this.state = {count: 1};
        }

        render() {
            return <div>hello {this.props.name} {this.state.count}</div>
        }
    }
    ```
- 3.Functional Component (函数式组件)

    有些组件有自身的状态, 比如交互类组件； 有些没有自身的状态, 例如纯展示类组件。

    没有状态的组件成为 无状态组件(stateless)， 对于无状态组件上面的方法有些影响性能, 于是 Function Component(函数式组件) 来了。
    ```js
    import React from 'react';

    function Hello({name}) {
        return <div>{name}</div>
    }

    Hello.propTypes = {
        name: React.PropTypes.string
    };
    Hello.defaultProps = {
        name: 'yan'
    };
    ```
    函数式组件就是一个普通函数, 参数是一个对象, 在被调用时就是传入的 props, 配合函数参数的解构使用起来非常优雅。 
    函数式组件的属性默认值和属性类型只能通过函数的属性定义。

- 4.PureComponent 

    PureComponent 是 React 15.3 引入的一个全新的组件基类, 用来代替之前的 `react-addons-pure-render-mixin`。 PureComponent 继承自 Component, 并将 `isPureReactComponent` 属性设置为 true. 所以在内部使用该属性来区分是否是 PureComponent 组件。

    可以用 shouldComponentUpdate 模拟 PureComponent, 下面两个组件的功能一样:
    ```js
    class Demo1 extends Component {
        shouldComponentUpdate(nextProps, nextState) {
            const {props, state } = this;

            function shallowCompare(a,b) {
                return a === b || Object.key(a).every(k => a[k] === b[k]);
            }

            return shallowCompare(nextProps, props) && shallowCompare(nextState, state);
        }
    }
    ```

总结:
- 环境支持 ES6，那么应该使用 Component
- 环境不支持 ES6, 那么使用 createClass
- 如果组件没有自身状态, 那么应该使用 Functional Component
- 如果组件是纯组件, 那么应该使用 PureComponent

### JSX
在 React 中可以使用 createElement 和 JSX 两种方式来实例化组件。

- 1.createElement

    createElement 可以接受多个参数:
    ```js
    React.createElement(
        type,
        [props],
        [...children]
    )
    ```