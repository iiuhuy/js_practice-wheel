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
可以直接修改节点的文本，方法有两种：
- 第一种: 修改`innerHTML`属性, 这个方式非常强大。不但可以修改一个 DOM 节点的内容, 还可以直接通过 HTML 片段修改为 DOM 节点内部的子树。
```js
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');

// 设置文本为 abc
p.innerHTML = 'ABC';    // <p id="p-id">ABC</p>

// 设置 HTML
p.innerHTML = 'ABC <span style="color: red">RED</span> XYZ'; // <p>...</p> 的内部结构已修改
```
使用 `innerHTML` 时要注意, 是否需要写入 HTML, 如果写入的字符串是通过网络拿到了，要注意对字符编码来避免 XSS 攻击。

- 第二种: 修改`innerText`或`textContent`属性，这样可以自动对字符串进行 HTML 编码，保证无法设置任何 HTML 标签：
```js
// 获取 <p id="p-id">...</p>
var p = document.getElementById('p-id');

// 设置文本
p.innerText = '<script>alert("Hi")</script>';
// HTML 被自动编码, 无法设置一个 <script> 节点
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>
```

两者的区别在于读取属性时, `innerText` 不返回隐藏元素文本, 而 `textContent` 返回所有的文本。**IE<9 不支持 textContent**。

修改 CSS 也是经常需要的操作。DOM 节点的style属性对应所有的 CSS，可以直接获取或设置。因为 CSS 允许font-size这样的名称，但它并非 JavaScript 有效的属性名，所以需要在 JavaScript 中改写为驼峰式命名fontSize：
```js
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');

// 设置 CSS
p.style.color = '#ff0000';
p.style.fontSize = '20px';
p.style.paddingTop = '2em';
```
练习下面的 HTML 结构:
```html
<!-- HTML结构 -->
<div id="test-div">
  <p id="test-js">javascript</p>
  <p>Java</p>
</div>
```

尝试获取指定节点并修改：
```js
// 获取<p>javascript</p>节点
var js = document.getElementById('test-js');

// 修改文本为JavaScript:
// TODO:
js.innerHTML = 'JavaScript';
js.innerText = 'JavaScript';

// 修改CSS为: color: #ff0000, font-weight: bold
// TODO:
js.style.color = '#ff0000';
js.style.fontWeight = 'bold';
```

`innerHTML` & `innerText` 的区别:
- `innerHTML` 指的是从对象的起始位置到终止位置的全部内容, 包括 HTML 标签。
- `innerText`   指的是从起始位置到终止位置的内容, 但它去除 HTML 标签。

顺带说一下`outerHTML`:
`outerHTML` 指的是除了包含 `innerHTML` 的全部内容外, 还包含对象标签本身。


## 02 遍历
遍历该 DOM 节点下的子节点，以便进行进一步操作



## 03 添加
在该 DOM 节点下新增一个子节点，相当于动态增加了一个 HTML 节点。
如果这个 DOM 节点是空的，例如，`<div></div>`，那么，直接使用 `innerHTML = '<span>child</span>'`就可以修改 DOM 节点的内容，相当于 “插入” 了新的 DOM 节点。

如果这个 DOM 节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点。

有两个办法可以插入新的节点。一个是使用 `appendChild`，把一个子节点添加到父节点的最后一个子节点。例如：
HTML 结构:
```html
<!-- HTML结构 -->
<p id="js">JavaScript</p>
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```

把`<p id="js">JavaScript</p>`添加到`<div id="list">`的最后一项：
```js
var js = document.getElementById('js'),
    list = document.getElementById('list');
list.appendChild(js);
```
然后就变成了下面这样:
```html
<!-- HTML结构 -->
<!-- 因为我们插入的js节点已经存在于当前的文档树，因此这个节点首先会从原先的位置删除，再插入到新的位置。 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="js">JavaScript</p>
</div>
```

更多的时候, 会从零创建一个新的节点, 然后插入到指定位置。
```js
var list = document.getElementById('list'),
    haskell = document.createElement('p');  // 创建一个 p 标签
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
```
这样就能动态的添加一个新的节点:
```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="haskell">Haskell</p>
</div>
```
动态创建创建一个节点到 DOM 树中, 可以实现很多功能。举个例子. 如下的代码创建了一个`<style>`节点, 然后把它添加到 `<head>` 节点的末尾。这样就能动态地给文档添加新的 CSS 定义:
```js
var d = document.getElement('style');
d.setAttribute('type', 'text/css');
d.innerHTML = 'P {color: red}';
document.getElementsByTagName('head')[0].appendChild(d);
```

**insertBefor**
把子节点插入到指定的位置.
使用 `parentElement.insertBefore(newElement, referenceElement);`，子节点会插入到`referenceElement`之前。

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```
把 `Haskell` 插入到 `Python` 之前:
```js
var list = document.getElementById('list'),
    py = document.getElementById('python'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.innerBefore(haskell, py);
```
新的 HTML 结构如下:
```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="haskell">Haskell</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```
`insertBefore` 重点是要拿到一个 “参考子节点” 的引用。很多时候，需要循环一个父节点的所有子节点，可以通过迭代`children`属性实现：
```js
var i,c,
    list = document.getElementById('list');
for(i = 0; i < list.children.lenght; i++) {
    c = list.children[i];   // 拿到第 i 个子节点
}
```

练习:
```html
<!-- HTML结构 -->
<ol id="test-list">
    <li class="lang">Scheme</li>
    <li class="lang">JavaScript</li>
    <li class="lang">Python</li>
    <li class="lang">Ruby</li>
    <li class="lang">Haskell</li>
</ol>
```
按字符串顺序重新排序 DOM 节点：
```js
var ol = document.getElementById('test-list');
var list = ol.children;

for(var i = 0; i < list.length; i++) {
    for(var j = i; j < list.length; j++) {
        if(list[j].innerText < list[i].innerText) {
            ol.insertBefore(list[j], list[i]);
        }
    }
}

// ES6 写法
const ol = document.getElementById('test-list');
const list = [];
for(let i = 0; i < ol.children.length; i++) {
  list.push(ol.children[i]);
}
list.sort((x, y) => x.innerText > y.innerText);
list.map(x => ol.appendChild(x));
``` 

## 04 删除
将该节点从 HTML 中删除，相当于删掉了该 DOM 节点的内容以及它包含的所有子节点。

删除一个 DOM 节点就比插入要容易得多。

要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉：
```js
// 拿到待删除节点:
var self = document.getElementById('to-be-removed');

// 拿到父节点
var parent = self.parentElement;

// 删除
var remove = parent.removeChild(self);
removed === self;   // true
```
删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。

当遍历一个父节点的子节点并进行删除操作时，要注意，children 属性是一个只读属性，并且它在子节点变化时会实时更新。
如下：
```html
<div id="parent">
    <p>First</p>
    <p>Second</p>
</div>
```
当我们用如下代码删除子节点时：
```js
var parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[1]);     // 浏览器报错
```
浏览器报错：`parent.children[1]`不是一个有效的节点。原因就在于，当`<p>First</p>`节点被删除后，`parent.children`的节点数量已经从 2 变为了 1，索引`[1]`已经不存在了。

因此，删除多个节点时，要注意`children`属性时刻都在变化。

练习:
```html
<!-- HTML结构 -->
<ul id="test-list">
    <li>JavaScript</li>
    <li>Swift</li>
    <li>HTML</li>
    <li>ANSI C</li>
    <li>CSS</li>
    <li>DirectX</li>
</ul>
```
把与 Web 开发技术不相关的节点删掉：

```js
var parent = document.getElementById('test-list');
parent.removeChild(parent.children[1]);
parent.removeChild(parent.children[2]);
parent.removeChild(parent.children[3]);

// 或者
let parent = document.getElementById('test-list');
for(let i = parent.children.length - 1; i >= 0; i--) {
    if (parent.children[i].innerText !== 'JavaScript' && 
        parent.children[i].innerText !== 'HTML' && 
        parent.children[i].innerText !== 'CSS') {
            parent.removeChild(parent.children[i]);
    }
}
```