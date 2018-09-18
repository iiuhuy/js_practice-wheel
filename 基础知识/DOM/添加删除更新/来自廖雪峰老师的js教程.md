# 操作 DOM
始终记住 DOM 是一个树形结构。操作一个 DOM 节点实际上就是这么几个操作：
更新、遍历、添加、删除。

在操作一个 DOM 之前我们需要通过各种方式拿到这个 DOM 节点。最常用的方法是`document.getElementById()`和`document.getElementByTagName()`， 以及 CSS 选择器`document.getElementByClassName()`.

由于 ID 在 HTML 文档中是唯一的，所以`document.getElementById()`可以直接定位唯一的一个 DOM 节点。`document.getElementsByTagName()`和`document.getElementsByClassName()`总是返回一组 DOM 节点。要精确地选择 DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

如下:
```js
// 返回 ID 为 `test` 的节点
var test = docement.getElementById('test');

// 先定位 ID 为`test-table` 的节点, 再返回其内部所有的 tr 节点。
var trs = document.getElementById('test-table').getElementByTagName('tr');

// 先定位 ID 为 `test-div` 的节点, 再返回其内部所有 class 包含的 red 节点
var reds = document.getElementById('test-div').getElementByClassName('red');

// 获取节点 test 下所有的直属子节点:
var cs = test.children;

// 获取 test 节点下第一个、最后一个子节点
var first = test.firstElementChildren;
var last = test.lastElementChildren;
```

第二种是使用 `querySelector()` 和 `querySelectorAll()`, 需要了解 `selector` 语法, 然后使用条件来获取节点。

```js
// 通过 querySelector 获取 ID 为 q1 的节点。
var q1 = document.querySelector('#q1');

// 通过 querySelectorAll 获取 q1 节点内符合条件的所有节点
var ps = q1.querySelectorAll('div.highlighted > p'); 
```
> 低版本的 IE<8 不支持 `querySelector` 和 `querySelectorAll`.

练习: 将下面的 HTML 结构选出指定的节点

```html
<!-- HTML结构 -->
<div id="test-div">
    <div class="c-red">
        <p id="test-p">JavaScript</p>
        <p>Java</p>
    </div>
    <div class="c-red c-green">
        <p>Python</p>
        <p>Ruby</p>
        <p>Swift</p>
    </div>
    <div class="c-green">
        <p>Scheme</p>
        <p>Haskell</p>
    </div>
</div>
```

```js
// 选择出 <p>JavaScript</p>
var js = document.getElementById('test-p');
var js = document.querySelector('#test-p');

// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
var arr = document.getElementsByClassName("c-red c-green")[0].children;

// 选择<p>Haskell</p>:
var haskell = document.getElementsByClassName('c-green')[1].lastElementChild;
var haskell = document.getElementsByClassName('c-green')[1].children[1];

// -------------------------- 不适用索引 --------------------------//
// 选择<p>JavaScript</p>:
var js = document.getElementById("test-p");

// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
var arr = document.querySelectorAll(".c-green.c-red p");

// 选择<p>Haskell</p>:
var haskell = document.querySelector("#test-div .c-green:not(.c-red) :last-child");
```

## 01 更新
更新该 DOM 节点的内容，相当于更新了该 DOM 节点表示的 HTML 的内容。



## 02 遍历
遍历该 DOM 节点下的子节点，以便进行进一步操作



## 03 添加
在该 DOM 节点下新增一个子节点，相当于动态增加了一个 HTML 节点。


## 04 删除
将该节点从 HTML 中删除，相当于删掉了该 DOM 节点的内容以及它包含的所有子节点。

