# jQuery 的介绍
这个东西, 为了兼容浏览器是必须要学的。

例如: 遇到下面这些问题:
- 1.window.onload 事件有事件覆盖的问题, 因此只能写一个事件。(锋利的 jQuery 中第一篇就说到了。)
- 2.代码容错性问题。
- 3.浏览器兼容问题。
- 4.代码量多。
- 5.动画效果难以实现

## 什么是 jQuery ?
就是一个 js 库, 作者封装了开发常用的功能, 使得开发方便, 效率更高。

用的时候, 直接当做一个对象用。

- 官网: http://jquery.com   
- 官方 API 文档: http://api.jquery.com
- 中文汉化 API 文档: http://www.css88.com/jqapi-1.9/ (里面可以选择 API 版本))
 
入门, 主要学习什么, 学习如何使用 jQuery 操作 DOM， 意思就是学习 jQuery 封装号的 API 。都是方法的调用, 需要加小括号。

jQuery 的量大特点:
- 1.链式编程: 例如 `.a()` 和 `.b()` 连着写 `.a().b()`.
    
    链式编程的原理: return this.
    通常情况下, 只有设置操作才能把链式编程延续下去。因为获取操作的时候, 会返回获取到的响应值, 无法返回 this.
- 2.隐式迭代:

    隐式 对应的是显示。隐士迭代的意思是: 在方法内部会为匹配到的所有元素进行循环遍历, 执行相应的方法, 而不用手动再次进行循环. 简化了操作。
    
    如果获取的是多元素的值, 大部分情况下返回的是第一个元素的值。

## 使用
### 基本的使用步骤
- 1.引用包。(CDN、本地资源)
- 2.入口函数 `$(document).ready(function() {});`. 在 script 标签中导入包, 一定要放在 js 代码上面, 如果你有在 script 标签中写代码的话。
- 3.功能实现代码(事件处理)

### 版本
jQuery 的版本:
- 1.x 版本 (开发一般用 1.10 以上)
- 2.x 版本 (不在支持 IE6、7、8)
- 3.x 版本

`jquery-1.11.1.js` 和 `jquery-1.11.1.min.js` 的区别就是:
- 第一个是没有压缩的版本. 第二个是已经压缩的版本.
- 开发过程中, 随意用哪个版本。 上线的时候都建议用 压缩版本。

### 再说说入口函数
原生 js 的入口函数指的是: `window.onload = function() {}` 
- 需要等到页面上的所有内容加载完毕才能执行。
- 不仅需要文本加载完, 而且要等到图片加载完毕。

jQuery 的入口函数, 有下面的几种写法:
```js
// 方式一: 
// 1.文档加载完毕, 图片不加载的时候, 就可以执行这个函数
$(document).ready(function() {
    alert(1);
});

// 方式二:
// 2.文档加载完毕, 图片不加载的时候, 就可以执行这个函数
$(function() {
    alert(1);
});

// 方式三:
// 3.文档加载完毕, 图片也加载完毕的时候, 再执行这个函数
$(window).ready(function() {
    alert(1);
});
```

js 原生入口函数 & jQuery 入口函数的区别:
①: 重复的次数
- JS 的入口函数只能出现一次, 出现多次后前面的会被覆盖掉。
- jQuery 的入口函数, 可以出现任意多次, 并不存在事件覆盖问题。

②: 执行时机的不同:
- JS 是在所有文件资源加载完成后, 才执行。 包括: 页面文档、外部文件(js/css/img) 等
- jQuery 是在文档加载完成后, 就执行。文档加载完成指的是: DOM 树加载完成后, 就可以操作 DOM 了, 不用等到所有外部资源都加载完成。

文档的加载顺序: 从上往下, 边解析边执行。

### $ 符
jQuery 可以使用 `$` 符号代替。`$ === jQuery` 结果是 true

## JS 的 DOM 对象和 jQuery 对象比较
区别:
- 通过 jQuery 获取的元素是一个数组, 数组中包含着原生 JS 的 DOM 对象。 例如: 对于下面的 div 结构:
```html
<div>
    <div class="box"></div>
    <div id="box"></div>
    <div class="box"></div>
</div>
```

通过原生 js 获取这些元素节点的方式是:
```js
var myBox = document.getElementById("box");     // 通过 id 获取单个元素
var boxArr = document.getElementByClassName("box"); // 通过 class 获取的是数组
var divArr = document.getElementByTagName("div");   // 通过标签获取的是数组
```

而 jQuery 获取这些元素节点的方式是: (获取的都是数组)
```js
// 获取的都是数组, 里面的包含着原生 js 的 dom 对象
var myBox1 = $("#box");
var myBox2 = $(".box");
var myBox3 = $("div"); 
```

> jQuery 就是把 DOM 对象重新包装了一下, 让它具有 jQuery 方法。具体的实现, 等熟悉之后, 再去查看其源码。

### 二者之间的互相转换
1.DOM 对象转换为 jQuery 对象:
```js
// dom -> jquery
myBox1 = $(mybox);
myBox2 = $(boxArr);
myBox3 = $(divArr);
```

2.jQuery 对象转为 DOM 对象:
```js
jq对象[index];      // 1.推荐
jq对象.get(index);  // 2
```

jQuery 对象转换为 DOM 对象后, 可以直接调用 DOM 提供的一些功能。
```js
jqBox3[0].style.backgroundColor = "balck";
jqBox3.get(3).style.backgroundColor = "pink";
```
如果需要哪种方式设置属性或者方法。必须转换为该类型。

jQuery 简介实践
1.直接操作选择器
2.层级选择器
3.基本过滤选择器

    jQuery 的基本选择器:
    - :odd(奇数行选择器)
    作用: 选择序号为奇数的所有元素。
    例如: `$("li:odd")`, 会选择出序号为奇数的所有元素
    - :even(偶数行选择器)
    作用: 选择序号为偶数的所有元素
    例如: $("li:even"), 会选择出序号为偶数的所有元素
    - :eq(index)相等选择器
    作用: 选择序号为 index 的一个元素
    例如: $("li:eq(1)"), 会选择出序号为1的一个 li 元素
    
4.