# 基础入门
基础入门。比较蒙蔽！
## 手写 hello React
创建 hello_world 目录. index.html， 引入 cdn 就可以了。

## 搭建开发环境
- 一般搭建 React 的开发环境使用 webpack , 这里使用官方的脚手架来搭建。
- create-react-app 这个脚手架。

首先全局性的安装:(权限自加 sudo)
- npm install -g create-react-app
    - create-react-app@1.5.2

创建 `hello_react` 项目:
```
create-react-app hello_react
```

根据提示开启本地开发环境的服务器(http://localhost:3000/), 会显示默认的页面:
```
npm start 
```

## 第一个组件
- 工具:React Developer Tools: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-CN

创建好项目后, 然后就修改 App.js 文件里面的 render 函数. 返回一个组件。
使用 Bootstrap 修改好看的组件。将 CDN link 放到 `public/index.html`。

## 多组件
封装成 `.js` 文件, 然后调用。

- 表达式 `{}`, 只能一行。
- 三元运算符, ES6 里面的新特性。

## 组件之间数据传递
例子中将 App 组件传递给 Home 组件。

类型检查, 为了检查传入参数类型的正确性。(开发环境用得多.)

## 事件
可以用 箭头函数来替换 `bind(this)`.

逻辑可以在 console.log 打印出来是没有问题的。 但是页面没有刷新, React 中 state 的值发生变化, virtual-dom 才会更新。

## 如何理解 Virtual DOM(虚拟 DOM)？
- 知乎 如何理解虚拟 DOM : https://www.zhihu.com/question/29504639
- AlloyTeam 腾讯前端:  http://www.alloyteam.com/2015/10/react-virtual-analysis-of-the-dom/
- 网上都说操作真实的 DOM 慢, 但测试结果却比 React 更快， 为什么? https://www.zhihu.com/question/31809713。 可以看看 尤大的回答。

## 组件的分类
涉及了无状态的组件, 属于函数式组件, 了解一下纯函数。无状态改变的组件也是没有生命周期的。

查看 Header.js 这样写的好处。

```js
const Header = (props) => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Header</h1>
          </div>
        </div>
      </div>
    );
}

export default Header;
```
### React 的写法
- 1.ES5的写法: React.createClass
- 2.ES6的写法: React.Component
- 3.无状态组件函数写法: 
    
    在不需要 state, 不处理用户的输入，组件的所有数据都是依赖 props 传入的。 不需要生命周期。
    好处: 
    - 不要声明类, 避免大量的 extends 或者 constructor 这样的代码。
    - 不需要显示声明 this 关键字, 在 ES6 的类声明中往往需要将函数的 this 关键字绑定到当前作用域, 而因为函数式声明的特性, 不需要再强制绑定。

    但是当需要引入 state 状态的时候怎么搞呢？ 
    这个时候需要引入 高级组件(hoc) 的概念, 和高阶函数类似。高阶组件就是可以返回组件的组件(或者称为会返回组件的函数)。 Redux 就是管理这方面的。

## 子组件向父组件里面传值
React 组件之间的通信: 
让 Home 组件的 Greet button，触发 App 组件的函数。

## 组件间传值
兄弟组件之间传值, 通过父亲节点来传值。 React 是单向数据流的, 每两个组件之间必须要有关系才能够传值。

首先: button Change Header Link 是 Home Component 里的, 点击之后可以把 state 里面声明的值传递给父标签(App Component), 再由 App Component 传递给 Header Component。 

## 了解生命周期
- 挂载
  - constructor
  - componentWillMount
  - render()
  - componentDidMount

- 更新

- 卸载: 清理工作,例如清除定时器、解绑自定义事件等
  - componentWillUnmount
