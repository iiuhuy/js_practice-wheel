# 基础入门
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