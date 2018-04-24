# Day1 JavaScript Drum Kit

第一天的练习是用 JS 制作一个爵士鼓的页面, 通过敲击键盘的 A~L 来发出声音, 并且页面会伴随敲击的动画。

大致的思路和解决方案: 
* 检测到键盘上什么键被按下 -- 监听 `keydown` 事件。
* 在按键被按下的时候, 播放动画 -- `audio.paly()`
* 在按下的同时, 播放动画 -- `Element.classList.add('className')`
* 在动画结束后, 移除动画 -- `Element.classList.remove('className')`

## 基础语法
### 一些 ES6 语法
* 1. `const` ： 声明一个只读的常量, 标识符的值只能赋值一次。
* 2. `字符串 ${变量、属性名}` : 模板字面量(Template literals) 中用于表示模板字符串的标识。 特点是字符串首尾用反引号(`), 内部的模板部分用 ${} 括起来表示, 简单例子:

```js
var a = 2;
var b = 3;

// 不用模板的写法
console.log("四是" + (b+1) + "不是" + 2(a+b)); 
// 使用模板字符串的写法
console.log('三是${b+1}不是${2(a+b)}'); 
```

### forEach 函数
使用 `document.querySelector` 获取一组符合 CSS 选择符的元素快照, 类型伪 NodeList （此对象是对于文档的实时运行的动态查询）, 对其进行遍历时可采取 `forEach` 方法。

```js
// ES6
nums.forEach( v => {
    if (v % 5 == 0)
        fives.push(v);
})

// ES5 
nums.forEach(function(v){
    if(v % 5 == 0)
        fives.push(v);
})
```

### 页面基础布局

