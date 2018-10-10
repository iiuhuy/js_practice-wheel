# React 实战进阶
- demo: https://6n20nrzlxz.codesandbox.io/
- 源码: https://codesandbox.io/s/6n20nrzlxz
- github仓库: https://github.com/supnate/react-geek-time

整个 demo 结构列表:
- 01 chat-app: 简单的 React 组件和交互演示
- 02 comment-box：评论框界面的组件拆分和实现
- 03 clock: JSX 语法演示
- 04 clock: 显示当前时间的组件，演示生命周期方法的调用
- 05 dom-diff：演示 DOM Diff 的算法原理
- 06 adv-tab-selector，withTimer: 高阶组件和函数作为子组件
- 07 locale-sample： 使用 Conext API 实现多语言切换
- 11 pure-reducer：纯 Redux 的使用
- 12 counter：在 React 中使用 Redux
- 13 async-action：Redux 异步 action，中间件的概念
- 14 org-action：如何组织 Redux 的 action 和 reducer
- 16 router-sample：路由不只是页面切换，更是代码组织方式
- 17.1 router-params：路由参数定义
- 17.2 nexted-route：嵌套路由
- 29.1 form-submit： 表单提交
- 29.2 form-submit-antd：使用 antd 的表单组件
- 30 dynamic-form：动态表单
- 31 list-page：列表页的翻页，搜索和缓存
- 33 multiple-request：页面多个请求的处理
- 35 wizard-sample：基于路由实现向导页面
- 36.1 layout1：常用布局的实现
- 36.2 layout2: 常用布局的实现
- 36.3 layout-resize：实现侧边栏可调整宽度
- 37.1 portal-example：使用 React Portals 实现的对话框
- 37.2 antd-dialog：使用 antd 实现对话框
- 40 dnd-sample：在 React 中实现拖放功能
- 43 reselect-sample：使用 reselect 避免重复计算
- 44 suspense：React 的异步渲染


---

## 01 React出现的历史背景及特点
四个必须掌握的 API:
- 1.ReactDOM.render 方法让 React 组件渲染到某个具体的 DOM 节点
- 2.组件的 render 方法
- 3.组件的 setState 方法，用于改变组件状态，触发 render 
- 4.如何通过 props 给 React 组件传递参数

## 02 以组件的方式思考 UI 的构建
- React 理念: https://react.docschina.org/docs/thinking-in-react.html
- 组件 & Props: https://react.docschina.org/docs/components-and-props.html
- State & 生命周期: https://react.docschina.org/docs/state-and-lifecycle.html

## 03 JSX 的本质不是模板而是语法糖
- JSX 简介: https://react.docschina.org/docs/introducing-jsx.html

JSX 中使用表达式:
- 1.JSX 本身也是表达式: `const element = <h1>Hello World</h1>`
- 2.在属性表达式中使用: `<MyComponent foo={1+2+3+4} />`
- 3.延展属性: 
    ```js
    const props = {firstName: 'Ben', lastName: 'Hector'};
    const greeting = <Greeting {...props} />;
    ```
<<<<<<< HEAD
- 4.表达式作为子元素: `const element <li>{props.message}</li>;`;
=======
- 4.表达式作为子元素: `const element <li>{props.message}</li>;`
>>>>>>> 1802f81121e20beea3a6936690dfdb8ac6b7948f
