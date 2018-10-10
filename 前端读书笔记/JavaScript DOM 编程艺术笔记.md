# JavaScript DOM 编程艺术
- 实践部分参考: 基础知识/DOM/ 目录下面的 JavaScript DOM 编程艺术实践.
- 你也可以参考[这里](http://htmlpreview.github.io/?https://github.com/clamaa/javascript-dom/blob/ce12af2e8e42d46d0ca62e02ceb29627b08ff2df/JavaScript.DOM%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF(%E7%AC%AC2%E7%89%88)%E9%99%84%E5%BD%95%E5%8F%8A%E6%BA%90%E7%A0%81/JavaScript%20DOM%E7%BC%96%E7%A8%8B%E8%89%BA%E6%9C%AF(%E7%AC%AC2%E7%89%88)-%E6%BA%90%E4%BB%A3%E7%A0%81/index.html)的目录结构。

## 第一章 JavaScript 简史
简单的介绍。(略)
## 第二章 JavaScript 语法
复习 JavaScript 语法。
- 语句
- 变量和数组
- 操作符
- 条件语句和循环语句
- 函数与对象

QA:
- 01 为什么最好的做法是将 js 文件放到 HTML 标签的最后, `</body>` 标签之前？(第五章说到)

- 02 宿主对象, 包含 Form、Image、Element等, 可以通过这些对象获取关于网页上的表单、图像和各种表单元素等信息; 也可以用来获取网页上的任何一个元素的信息，它就是 document 的对象。
## 第三章 DOM
理解 DOM!
- D（document): 当创建了一个网页并把它加载到 Web 浏览器中时，编写的网页文档转化成了一个文档对象。
- O (Object): JavaScript 语言里的对象可以分为三种类型:
    - 用于自定义对象: 由程序员自己创建的对象。
    - 内建对象: 内建在 JavaScript 语言里的对象, 如 Array、Math 和 Date 等。
    - 宿主对象: 由浏览器提供的对象。

最基础的对象 Window 对象(即浏览器窗口本身), 该对象的属性和方法通常称为 BOM(浏览器对象模型), BOM 提供了 window.open 和 Window.blur 等方法。document 对象的主要作用就是处理网页内容.
- M (model), 有可以看成(Map): DOM 把一份文档表示为一棵树，具体来讲是一颗家谱树，把文档成为节点树更准确些。

### 节点的概念
节点 node 表示网络中的一个连接点，一个网络就是由一些节点构成的集合。
DOM 其中的三种节点:
- 元素节点
- 文本节点。包含了文本的元素节点。
- 属性节点。属性节点用来对元素做出更具体的描述(总是被包含在元素节点中)。

DOM 并不是唯一与网页结构打交道的，还可以通过 CSS(叠层样式表)告诉浏览器如何显示一份文档的内容。

获取元素：
三种获取 DOM 方法可获取元素的节点, 分别是通过元素 ID、标签名和类名字获取。
- 1.getElementById
    返回一个对象。事实上文档中的每一个元素都是一个对象。利用 DOM 提供的方法能得到任何一个对象。
- 2.getElementByTagName
    返回一个对象数组。
- 3.getElementByClassName

获取和设置属性：
前面获取到元素后, 现在就来设法获取它的各个属性。 getAttribute 方法就是用来做这个的, setAttribute 方法则可以更改属性节点的值。

- getAttribute 方法不属于 document 对象, 所有不能通过 document 对象调用，它只能通过元素节点对象调用。例如与 getElementByTagName 结合使用获取每个 `<p>` 元素的 title 属性。
- setAttribute 方法一样也只能用于元素节点。

### 小结
5 个常用 DOM 方法
- getElementById
- getElementsByTagName
- getElementByClassName
- getAttribute
- setAttribute
DOM 还提供了其他的属性和方法。例如: `nodeName`、`nodeValue`、`childNodes`、`nextSibling` 和 `parentNode` 等。

## 第四章 案例研究: JavaScript图片库
学习重点：
- 利用 DOM 所提供的方法去编写图片库脚本。
- 利用时间处理函数把 JavaScript 代码与网页集成在一起。

书中的例子:
- 当点击某个链接时, 希望能留在这个网页而不是跳转到另一个窗口。
- 当点击某个链接时, 希望能够在这个网页上同时看到那张图片以及原有的图片清单。
实现目标需要完成几项改进:
- 通过添加一个`占位符`图片的方法在这个主页上为图片预留一个浏览区域。
- 在点击某个链接时, 拦截这个网页的默认行为。
- 在点击某个链接时, 把 `占位符` 图片替换为那个链接对应的图片。
见练习里面的 例程!

拓展:
- childNodes: 在一棵节点树上，childNodes 属性可以用来获取任何一个元素的所有子元素，它是一个包含这个元素全部子元素的数组
- nodeType: nodeType 共有 12 种可取的值, 但其中 3 种具有实用价值
    - 元素节点的 nodeType 属性值是 1。
    - 属性节点的 nodeType 属性值是 2。
    - 文本节点的 nodeType 属性值是 3。

### 本章小结:
介绍了一个简单的 JavaScript 案例, 还介绍了 DOM 提供的几个新属性, 它们是:
- childNodes
- nodeType
- nodeValue
- firstChild
- lastChild

本章学习的重点, 在开头就已经写出来了。

## 第五章 最佳实践
- 平稳退化: 确保网页在没有 JavaScript 的情况下也能正常工作。
- 分离 JavaScript: 把网页的结构和内容与 JavaScript 脚本的动作行为分开
- 向后兼容: 确保老版本的浏览器不会因为你的 JavaScript 脚本而死掉
- 性能考虑: 确定脚本执行的性能最优

平稳退化:
如果正确地使用了 JavaScript 脚本，就可以让访问者在他们浏览器不支持 JavaScript 的情况下仍能顺利地浏览你的网站，这就是所谓的平稳退化 (graceful degradation)，就是说虽然某些功能无法使用，但最基本的操作仍能顺利完成。

JavaScript 使用 window 对象的 open() 方法来创建新的浏览器窗口，这个方法有三个参数:
`Window.open(url, name, features);`, 这三个参数都是可选的。
- 第一个参数是想在新窗口打开的网页的 URL 地址。如果省略, 会弹出一个空白的窗口。
- 第二个参数是新窗口的名字。 可以在代码里面通过这个名字与新窗口进行通信。
- 最后一个参数是以逗号分隔的字符串, 其内容是新窗口的各种属性。

典型的用法:
```js
function popUp(winURL) {
    window.open(winURL, "popup", "width=320, height=480");
}
```
调用 popUp 方法的一个办法是使用伪协议(pseudo-protocol).
#### 1.javascript: 伪协议(pseudo-protocol)
**真** 协议用来在因特网上的计算机之间传输数据包，如 HTTP 协议、FTP 协议等，伪协议则是一种非标准化的协议，伪协议让我们通过一个链接来调用 JavaScript 函数。
如下的做法:
```js
<a href="javascript:popUp('http://www.example.com/');">Example</a>
```
这条语句在支持 “javascript:” 伪协议的浏览器中运行正常，较老的浏览器会失败，支持这种伪协议但禁用了 JavaScript 功能的浏览器什么也不会做。总之在 HTML 文档中通过 “javascript:” 伪协议调用 JavaScript 代码的做法非常不好。

#### 2.内嵌的事件处理函数
前面已经见过事件处理函数的使用方法了: 把 onclick 事件处理函数作为属性嵌入 `<a>`标签, 该处理函数将在 onclick 事件发生时调用图片切换函数。

如下:
```html
<a href="#" onclick="popUp('http://www.example.com/'); return false;"> Example </a> 
```
因为在上面这条 HTML 指令里使用了 return false 语句，这个链接不会被真的被打开。

然而，这个技巧这个方法与通过 “javascript:” 伪协议调用 JavaScript 代码的做法同样糟糕，因为不能平稳退化。对于禁用了 JavaScript 功能的浏览器什么也不会做。

#### 3.为何反复强调 平稳退化 ？
让那些不支持或禁用了 JavaScript 功能的浏览器也能顺利的访问自己的网站真的那么重要吗？

例如，搜索机器人（searchbot）是一种自动化的程序，它们浏览 Web 的目的是为了把各种网页添加到搜索引擎侧数据库里。目前只有极少数搜索机器人能理解 JavaScript 代码。如果你的 JavaScript 网页不能平稳退化，它们在搜索引擎上的排名就可能大受损害。一个解决办法，具体到 popUp（）函数，把 href 属性设置为真实存在的 URL 地址，让它成为一个有效的链接：
```html
<a href="http://www.example.com/" onclick="popUp('http://www.example.com'); return false;">Example</a>
```
使用 this 和 getAttribute() 方法提取出 href 属性值:
```html
<a href="http://www.example.com/" onclick="popUp(this.getAttribute('href')); return false;">Example</a>
```
使用由 DOM 提供的 `this.href`  属性(推荐):
```html
<a href="http://www.example.com/" onclick="popUp(this.href); return false;">Example</a> 
```
### 向 CSS 学习
- 1.结构与样式的分离: 

    借鉴 CSS，真正能从 CSS 技术获益的方法，是把样式全部转移到外部文件中去。
    
    作为 CSS 技术的突出优点，文档结构和文档样式的分离可以确保网页都能平稳退化。具备 CSS 支持的浏览器可以把网页呈现得美轮美奂，不支持或禁用了 CSS 功能的浏览器同样可以把网页的内容按照正确的结构显示出来。

- 2.渐进增强

    所谓 “渐进增强” 就是用一些额外的信息层去包裹原始数据，按照 **渐进增强** 原则创建出来的网页几乎都符合平稳退化原则。如果说 CSS 是提供关于 “表示” 的信息，则 JavaScript 是提供 “行为” 的信息。
    
    把 CSS 代码从 HTML 文档里分离出来可以让 CSS 工作得更好，这同样适用于 JavaScript 行为层。

### 分离 JavaScript 
如何实现当这个链接被点击时，它将调用 popUp() 函数呢？

```html
<a href="http://www.example.com/" class="popup">Example</a>
```
JavaScript 语言不要求事件必须在 HTML 文档里处理，可以在外部 JavaScript 文件里把一个事件添加到 HTML 文档中的某个元素上，可以利用 class 或 id 属性来解决。步骤如下:
- 1.把文档中所有链接全放入一个数组里。
- 2.遍历数组。
- 3.如果某个链接的 class 属性等于 popup，就表示这个链接在被点击时应调用 `popUp()` 函数。
于是, 
A.把这个链接的 href 属性值传递给 popUp() 函数
B.取消这个链接的默认行为, 不让这个链接把访问者带离当前窗口。
如下:
```js
var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++) {
    if(links[i].getAttribute("class")=="popup") {
        links[i].onclick = function() {
            popUp(this.getAttribute("href"));
            return false;
        }
    }
}
```
惊了, 原来这才是 js 和 html 之间的正确食用方式。
以上代码将把调用 `popUp()` 函数的 onclick 事件添加到有关的链接上。

只要把它们存入一个外部 JavaScript 文件，就等于是把这些操作从 HTML 文档里分离出来了。这就是 “分离 JavaScript” 的含义。

然而，当把这段代码存入外部 JavaScript 文件，它们将无法正常运行。因为第一行：
```js
var links = document.getElementsByTagName("a");
```
这条语句将在 JavaScript 文件被加载时立刻执行。如果 JavaScript 文件是从 HTML 文档的 `<head>` 部分用 < script > 标签调用的，它将在 HTML 文档之前加载到浏览器里。

同样，如果 `<head>` 标签位于文档底部 `</body >` 之前，就不能保证哪个文件最先结束加载（浏览器可能一次加载多个）。因为脚本加载时文档可能不完整，所以模型也不完整。没有完整的 DOM，getElementsByTagName 等方法就不能正常工作。

必须让这些代码在 HTML 文档全部加载到浏览器之后就马上开始执行。HTML 文档全部加载完成将会触发一个事件, 这个事件有它自己的处理函数。

将上面内容打包到一个函数中, 顺便把 `popUp` 函数也放进同一个文件。

### 向后兼容
检测浏览器对 JavaScript 的支持程序。这个解决方案很容易实现: 只要把某个方法打包放在一个 if 语句里, 就可以根据这条 if 语句的条件表达式的求值结果 true(这个方法存在)，还是 false(这个方法不存在) 来决定应该采取怎样的行动。

这种检测称为对象检测(object detection)。:
```js
if(method) {
    statements;
}

// 例如使用 getElementById() 方法, 就可以在使用它之前对它进行检测
function myFunction() {
    if(document.getElementById) {
        statements using getElementById;
    }
}
```
如果浏览器不支持 getElementById 方法, 就不会执行使用这个方法的代码。

这样做有个缺点就是这个函数最重要的语句就会深埋在一层又一层的花括号里，这样的代码往往很难阅读和理解。使用 逻辑非 操作符 `if(!method)`.

用来测试 getElementById 是否存在的语句如下:
```js
if(!getElementById) return false;
```
如果需要测试多个方法或者属性的存在, 可以使用 逻辑或 操作符将其合并:
```js

if(!getElementById || getElementsByTagName) return false;
```

#### 浏览器嗅探技术
浏览器嗅探 指通过提取浏览器供应商提供的信息来解决向后兼容问题。这是一种风险很多的技术, 原因如下:
- 浏览器有时会撒谎，将自己报告成另外一种浏览器。
- 为适用于多种浏览器，嗅探脚本会越来越复杂。
- 许多嗅探脚本在进行此类测试时，要求浏览器版本号必须得到精确匹配，因此需要一直修改。这种技术正在被更简单更健壮的对象检测技术所取代。

### 性能考虑
- 1.尽量少访问 DOM 和尽量减少标记

    访问 DOM 的方式对脚本性能会产生非常大的影响。不管是什么时候, 只要是查询 DOM 中的某些元素, 浏览器都会搜索整个 DOM 树, 从中查找可能匹配的元素。

    在多个函数都会取得一组类似元素的情况下, 可以考虑重构代码，把搜索结果保存到一个全局变量里或者把一组元素直接以参数的形式传递给函数。

- 2.合并和放置脚本

    传统上，都是把脚本文件放在文档的 `<head>` 区域, 这种放置方法有一个问题。位于 `<head>` 块中的脚本会导致浏览器无法并行加载其他文件(例如图像和其他脚本)。

    一般来说，根据 http 规范，浏览器每从同一个域名中最多只能同时下载两个文件。而在下载脚本期间，浏览器不会下载其他任何文件，即使是来自不同域名的文件也不会下载, 所有的其他资源都要等到脚本加载完成后才能下载。

    把所有 `<script>` 标签都放到文档的末尾，`</body>` 标记前，可以让页面变得更快。
 
 - 3.压缩脚本

    可以加快加载速度。
    所谓压缩脚本, 指的是把脚本文件中不必要的字节, 如空格和注释，统统删掉，从而达到**压缩**文件的目的。一般压缩的文件都会加 `min` 字样的脚本文件。例如`jquery.min.js`


## 第六章 案例研究: 图片库改进版
- 把事件处理函数移出文档
- 向后兼容
- 确保可访问

回顾第四章、第五章的内容。分析第四章的代码: 

### 它支持平稳退化吗？
- 第一个问题是: 如果 JavaScript 功能被禁用， 会怎么样？

    仔细检查代码后, 即使 JavaScript 功能已经被禁用, 用户也可以浏览图片库里的所有图片，网页里的所有链接也都可以正常工作。

- 它的 JavaScript 和 HTML 标记是分离的吗？

    现在我们需要关注网页的行为层（JavaScript）是作用在结构层（HTML）上的，还是两种代码混杂在一起？

    具体回到图片库这个例子, 答案当然是 它们混杂在一起了。
    把 JavaScript 代码移出 HTML 文档不是难事，但为了让浏览器知道页面里都有哪些链接有着不一样的行为，必须找到一种 “挂钩” 把 JavaScript 代码与 HTML 文档中的有关标记关联起来。
    
    可以像下面这样给图片清单里的每个链接添加一个 class 属性：

    ```html
    <li> 
        <a href="./image/01.jpg" onclick="showPic(this); return false" title="images/01.jpg">image 01.jpg</a>
    </li>
    ```
    但这种方法不够理想，这与给它们分别添加事件处理函数同样麻烦。图片清单里的各个链接有一个共同点：它们都包含在同一个列表清单元素里。因此，可以考虑给整个清单添加一个 ID 属性:
    ```html
    <ul id="imagegallery">
        <li>
            <a href="./image/01.jpg" onclick="showPic(this); return false" title="images/01.jpg">image 01.jpg</a>
        </li>
        <li>
            <a href="./image/02.jpg" onclick="showPic(this); return false" title="image 02.jpg">image 02.jpg</a>
        </li>
        <li>
            <a href="./image/03.jpg" onclick="showPic(this); return false" title="image 03.jpg">image 03.jpg</a>
        </li>
        <li>
            <a href="./image/壁纸.jpg" onclick="showPic(this); return false" title="image 壁纸.jpg">image 壁纸.jpg</a>
        </li>
    </ul>
    ```
    看到虽然只有一个 挂钩 ，但是对 JavaScript 来说已经足够了。

- 添加事件处理函数:

    需要编写一个简短的函数把有关操作关联到 onclick 事件上, 命名为 prepareGallery
    下面是这个函数需要完成的工作:
    - 检查当前浏览器是否理解 getElementsByTagName
    - 检查当前浏览器是否理解 getElementById
    - 检查当前网页是否存在一个 id 为 imagegallery 元素
    - 遍历 imagegallery 元素中的所有链接
    - 设置 onclick 事件, 让它在有关链接被点击的完成一下操作：
        - 把这个链接作为参数传递给 showPic 函数
        - 取消链接被点击时的默认行为， 不让浏览器打开这个链接
    ```js
    function prepareGallery() {
        if(!document.getElementsByTagName) {return false;}
        if (!document.getElementById) {return false;}
        if (!document.getElementById("imagegallery")) {return false;}
        var gallery = document.getElementById("imagegallery");
        var links = gallery.getElementsByTagName("a");
        for(var i = 0; i < links.length; i++) {
            links[i].onclick = function() {
                // this 代表这里的 links[i]
                showPic(this);  
                return false;
            }
        }
    }
    ```

- 共享 onload 事件

    window.load 事件只执行最后一个。所以需要用一个弹性最佳解决方案——不管在页面加载完毕时执行多少个函数, 它都可以应付自如。addLoadEvent， 下面是 addLoadEvent 函数将要完成的操作:
    - 把现有的 window.onload 事件处理函数的值存入变量 oldonload 
    - 如果在这个处理函数还没有绑定任何函数, 就像平时那样把新函数添加给它
    - 如果在这个处理函数上已经绑定一些函数, 就把新函数追加到现有指令的末尾
    ```js
    function addLoadEvent(func) {
        var oldonload = window.onload;
        if(typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                oldonload();
                func();
            }
        }
    }
    ```
    这将把那些在页面加载完毕时执行的函数创建为一个队列, 如果想把 prepareGallery 函数添加到这个队列里面, 只需要这样写:
    ```js
    addLoadEvent(prepareGallery);
    ```
    到这一步, prepareGallery 函数就已经足够安全了, 至少在目前看来是非常实用的。
- 不要做太多假设

    之前的 showPic() 函数没有进行任何测试和检查, 在代码中用到的 id 属性值等于 placeholder 和 description 的元素，但并没有对这些元素是否存在做任何检查工作。

最终的例子在 ch6 中已经练习, 由于没有做缩略图, 就不演示缩略图了, 还是显示文字。知道怎么用就行。

### 本章小结
- 尽量让 JavaScript 代码不再依赖于那些没有保证的假设, 为此引入了许多测试和检查。能够使 JavaScript 代码平稳退化。
- 没有使用 onkeypress 事件处理函数, 这使 JavaScript 代码的可访问性得到了保证。
- HTML 结构与 JavaScript 行为分离。(可能结构与行为的分离程度越大越好)

## 第七章 动态创建标记
- 传统技术: document.write 和 innerHTML
- 深入剖析 DOM 方法: createElement、createTextNode、appendChild 和 insertBefore

#### document.write
可以方便快捷的把字符串插入到文档中。

document.write 最大的缺点是它违背了**行为应该与表现分离** 的原则。避免在 `<body>` 部分乱用 `script` 标签, 避免使用 `document.write` 方法

#### innerHTML 属性
innerHTML 属性可以用来读、写某个给定元素里的 HTML 内容。

innerHTML 方法要比 document.write 方法更加值得推荐, 使用 innerHTML 就能将 JavaScript 从代码标记中分离出来。

### DOM 方法
需要明白, 实际上在浏览器看来，DOM 节点树才是文档。里面的方法并不能改变文档的物理结构。不用浏览器打开这个文档是看不到任何变化的。因为浏览器实际显示的是那棵 DOM 节点树。

这样以动态方式实时创建标记就不那么难理解了。并不是在创建标记, 而是在改变 DOM 节点树。

- createElement 方法

    创建一个 p 元素节点:
    ```js
    document.createElement("p");
    ```
- appendChild 方法

    把新创建的节点插入到某个文档的节点树最简单的办法是, 让它成为这个文档某个现有节点的一个子节点。
    ```js
    var para = document.createElement("p");
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
    ```
- createTextNode 方法

    简单理解为创建一个文本节点。
    如上已经创建了 p 元素节点, 把一些文本放入这个 p 元素, 可以使用 createTextNode 来实现。
    ```js
    var txt = document.createTextNode("Hello world");
    para.appendChild(txt);
    ```

### 重回图片库
编写一个 `preparePlaceholder` 函数并把它放进 js 文件中, 然后在文档加载时调用这个函数。下面是这个函数要做的任务:
- 1.创建一个 img 元素节点
- 2.设置这个节点的 id 属性
- 3.设置这个节点的 src 属性
- 4.设置这个节点的 alt 属性
- 5.创建一个 p 元素节点
- 6.设置这个节点的 id 属性
- 7.创建一个文本节点
- 8.把这个文本节点追加到 p 元素上
- 9.把 p 元素和 img 元素插入到 html 文档中


#### insertBefore() 方法
在已有元素前面插入一个新元素, 在调用此方法时, 必须告诉它三件事:
- 1.新元素: 想插入的元素(newElement)
- 2.目标元素: 想把元素插入到哪个元素(targetElement)之前
- 3.父元素: 目标元素的父元素(parentElement)
该方法的调用语法:
```js
parentElement.insertBefore(newElement, targetElement)
```

#### insertAfter() 方法
可惜，DOM 没有提供这个方法, emmm. 利用已经有的 DOM 方法和属性写一个 insertAfter 函数。
```js
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
```
这个函数用到了 DOM 方法和属性:
- parentNode 属性
- lastChild 属性
- appendChild 方法
- insertBefore 方法
- nextSibling 属性
执行的过程:
- 1.该函数有两个参数: 一个是将被插入的新元素, 另一个是目标元素、 这两个参数通过变量 newElement 和 targetElement 被传递到这个函数。
- 2.把元素的属性值放到变量 parent 中
- 3.检查目标元素是不是 parent 的最后一个子元素，即比较 parent 元素的 lastChild 属性值与目标元素是否存在 等于 关系。
- 4.如果是，就把新元素追加到 parent 元素上, 这样新元素就被恰好被插入到目标元素之后。
- 5.如果不是，就把新元素插入到目标元素和目标元素的下一个兄弟元素之间。目标元素的下一个兄弟元素即目标元素的 nextSibling 属性。用 insertBefore 方法把新元素插入到目标元素的下一个兄弟元素之前。

### Ajax
使用 Ajax, 需要注意同源策略。跨域相关的知识, Hijax 会在 12 章综合练习中学习。
#### XMLHttpRequest 对象
Ajax 的核心就是 XMLHttpRequest 对象, 

## 第八章 充实文档内容
- 一个为文档创建**缩略语列表**的函数
- 一个为文档创建**文献来源链接**的函数
- 一个为文档创建**快捷键清单**的函数

两项原则:
- 渐进曾强: 渐进增强原则基于这样一种思想,应该总是从最核心的部分，也就是从内容开始。应该根据内容使用标记实现良好的结构; 然后再逐步加强这些内容。
- 平稳退化: 渐进增强的实现必然支持平稳退化。如果按照渐进增强的原则去充实内容，为内容添加的样式和行为就自然支持平稳退化。

### 例子1 显示缩略语列表
本例子包含了缩略词, 已经用 `<abbr>` 标签标识出来。

- 在例子中使用 DOM 来创建希望定义的列表, 使用 displayAbbreviations 函数。
- 创建标记。用 createElement 方法创建这个定义列表, 并把新创建的元素赋值给变量 dlist 

浏览器地雷。abbr 在 IE 中到了 IE7 才支持 abbr 元素。

### 显示文献来源链接表
blockquote 元素中包含了一个属性 cite。 这是一个可选属性, 可以给它一个 URL 地址， 告诉大家 blockquote 元素的内引用自哪里。

使用以下的步骤将文献以链接的形式显示出来:
- 1.遍历这个文档里所有 blockquote 元素
- 2.从 blockquote 元素提取出 cite 属性
- 3.创建一个标识文本是 source 的链接
- 4.把这个链接赋值为 blockquote 元素的 cite 属性值
- 5.把这个链接插入到文献节选的末尾

编写 displayCitations 函数, 保存到 displayCitations.js 文件中。

### 显示 快捷键清单
编写一个 accesskey, 不同值代表的含义: http://clagnut.com/blog/193/ 

动态创建一份快捷键清单, 步骤如下:
- 1.把文档里的所有链接全部提取到一个节点集合里
- 2.遍历这个节点集合里的所有链接
- 3.如果某个链接带有 accessKey 属性, 就把它的值保存起来
- 4.把这个链接在浏览器窗口里的屏显标识文字也保存起来。
- 5.创建一个清单
- 6.为拥有快捷键的各个链接分别创建一个列表项(li 元素)
- 7.把列表项添加到 快捷键清单 里
- 8.把 快捷键清单 添加到文档里

在需要对文档里的现有信息进行检索时, 以下 DOM 方法最有用:
- getElementById
- getElementsByTagName
- getAttribute

在需要把信息添加到文档里去时, 以下 DOM 方法最有用:
- createElement
- createTextNode
- appendChild
- insertBefore
- setAttribute

**JavaScript 脚本只应该用来充实文档的内容, 要避免使用DOM技术来创建核心内容！**

## 第九章 CSS-DOM
- style 属性
- 如何检索样式
- 如何改变样式

分离:
- 使用 (X)HTML 去搭建文档的结构
- 使用 CSS 去设置文档的呈现样式
- 使用 DOM 脚本去实现文档的行为

DOM 属性的值和 CSS 属性的值是一样的， DOM 一律采用驼峰命名法来表示它们。例如: CSS属性 `background-color` 对应着 DOM 属性 `backgroundColor`。依次类推！

在外部样式表里声明的样式不会进入 style 对象。 在文档 `<head>` 部分里声明的样式也是如此。

何时该用 DOM 脚本设置样式? 
绝大多数场合, 应该使用 CSS 去声明样式。在使用 CSS 不方便的场合, 还是可以利用 DOM 对文档的样式做一些小的增强。

为表格添加斑马线效果, 只要隔行设置样式就行了(命名为 stripeTables):
- 1.把文档里的所有 table 元素找出来
- 2.对每个 table 元素, 创建 odd 变量并把它初始化为 false
- 3.遍历这个表格里的所有数据行
- 4.如果变量 odd 的值是 true， 设置样式并把 odd 变量修改为 false
- 5.如果变量 odd 的值是 false， 不设置样式，但把 odd 变量修改为 true

## 第十章 用 JavaScript 实现动画效果
- 动画的基础知识
- 用动画丰富网页的浏览效果

动画基本知识:
- 1.位置: position
- 2.时间: setTimeout。能够让某个函数在经过一段预定的时间之后才开始执行。
    - 取消的话使用: clearTimeout

既不能使用全局变量， 又不能使用局部变量, 需要一种介乎在它们二者之间的东西。 那就是属性！例如: element.style、element.firstChild。
JavaScript 允许为元素创建属性:
```js
element.property = value;
```
类似创建一个变量, 区别在于这个变量是专属于某个特定的元素。

改进动画效果, 可以看看它的解决思路. 导致最后效果可以做到迅速和平滑。

## 第十一章 HTML5
- 什么是 HTML5
- 今天怎么使用 HTML5
- 对 HTML5 中一些特性的简单介绍, 包括 Canvas、视频、音频和表单。

音频和视频:
为了确保 HTML5 的最大兼容性, 至少要包含下列三个版本:
- 基于 H.264 和 AAC 的 MP4
- WebM (VP8+Vorbis))
- 基于 Theora 视频和 Vorbis 音频的 Ogg 文件
自定义控件:
- currentTime, 返回当前播放的位置, 以秒表示
- duration, 返回媒体的总时长, 以秒表示, 对于流媒体返回无穷大
- paused, 表示媒体是否处于暂停状态

一些与特定媒体相关的事件，可以用来触发脚本，主要的有:
- play，在媒体播放开始的时候发生
- pause， 在媒体暂停时发生
- loadeddata, 在媒体可以从当前播放位置开始播放时发生
- ended， 在媒体已播放完成而停止时发生

**表单**
新输入控件类型:
- email， 用于输入电子邮件地址
- url, 用于输入 URL
- date， 用于输入日期和时间
- number， 用于输入数值
- range，用于生成滑动条
- search，用于搜索框
- tel，用于输入电话号码
- color，用于选择颜色

新的属性:
- autocomplete，用于为文本输入框添加一组建议的输入项
- autofocus，用于让表单元素自动获得焦点
- form，用于对 `<form>` 标签外部的表单元素分组
- min、max 和 step， 用在范围(range)和数值(number) 输入框中
- pattern， 用于定义一个正则表达式，以便于验证输入的值
- placeholder, 用于在文本输入框中显示临时性的提示信息
- require， 表示必填

## 第十二章 综合示例
- 组织内容
- 应用样式
- 使用 JavaScript、DOM 和 ajax 增强功能

站点的目录结构:
- /images
- /styles
- /scripts

需要创建的几个页面。创建对应的 HTML 页面。
- Home
- About
- Photos
- Live
- Contact

每个页面划分的几个区域。
- 头部区域，包含站点的品牌信息， 也是放 logo 的地方。 这个区域使用 `<header>` 元素
- 导航区域，包含一组链接， 指向各个页面。 这个使用 `<nav>` 元素
- 内容区域，包含每一页的实质性内容，这个区域使用 `<article>` 元素

因为要使用 HTML5 元素, 所有需要在 head 元素中包含 Modernizr 库。 

关于设计, 拿到资料后, 那么外观就不那么难做了。 可以用 Photoshop 或者其他的图形设计工具,做出适合的任何风格的设计方案，然后放到 images 文件夹中。这里的例子从 Friend-of-ED 下载
书上的例子已经不能访问了, 可以网上找一下。 或者在本 [github 仓库]() 下拿到资源。

CSS(color.css):
不管是哪个元素应用什么颜色, 都要同时给它一个背景色。否则，可能会导致意外，看不到某些文本。

布局(layout.css):放了内边距的东西。
为了让导航中的链接水平排列，需要应用一些浮动效果。熟悉 CSS 最好不过了。不熟悉就多学多练多积累。

版式(typography.css):放了外边距的东西。

### about 页面
制作 `about.html`, 实现单击内部链接, 应该只会显示相关的部分.

例如, 如果有一个常见问题页面, 那么每个问题都可以作为内部链接来处理. 单击这个问题, 就会显示出与该问题对应的答案, 与此同时其他问题的答案并不显示.

### photos 页面
制作 `photos.html`, 使用 JavaScript 构建图片库的理想之所.

提供了四张照片, 大小为 400x300px:
- concert.jpg
- bassist.jpg
- guitarist.jpg
- crowd.jpg

制作四张缩略图:
- thumbnail_bassist.jpg
- thumbnail_concert.jpg
- thumbnail_crowd.jpg
- thumbnail_guitarist.jpg

将这些图片放到 `images` 目录下的新建的 `photos` 下面:

添加 `photos.html` ，更新 `layout.css` 让缩略图从垂直排列成水平排列。
```css
#imagegallery li {
    display: inline;
}
```

制作占位符图片, 命名为 `placeholder.gif`, 放到 `images` 目录下。

点击缩略图之后, 会显示在 占位符图片 的窗口。

### 增强表格
Live 页面包含了巡演的日程。 使用表格来显示。

`live.html`, 将 table 放到 `live.html` 中的 article 元素内。

在 `layout.css` 中为表格中的单元格应用一些样式:
```css
td {
    padding: .5em 3em;
}
```

更新 `color.css`， 为表格和表格选定指定的颜色:
```css
th {
    color: #edc;
    background-color: #455;
}

tr td {
    color: #223;
    background-color: #eb6;
}
```

用第 9 章的 3 个函数:
- stripeTables
- highlightRows
- displayAbbreviations
对 `highlightRows & displayAbbreviations` 函数稍作修改:
- highlightRows

    使用 addClass 函数添加了 highlight 类, 会在用户鼠标悬停在表格行上的时候应用。

- displayAbbreviations

    修改了最后几行代码，因为这里要找的是 article 元素， 而不是第 8 章 id 为 content 的 div 元素。

### 增强表单
添加 `contact.html`， 更新 `layout.css`。

添加 `submit.html` 新文件。包含了感谢信息, 不处理表单提交信息。

为 label 添加文本单击行为:
- 取得文档中 label 元素
- 如果 label 被单击时, 添加一个事件处理函数
- 在 label 被单击时, 提取 for 属性的值。 这个值就是相应表单字段的 id 值
- 确保存在相应的表单字段
- 让相应的表单字段获得焦点
- 命名为 focusLabels 

#### 表单验证
使用 JavaScript 编写验证表单的脚本时, 记住三件事:
- 验证脚本写得不好, 不如没有验证
- 千万不要依赖 JavaScript 。 客户端验证并不能取代 服务器端 的验证。 即使有了 JavaScript 验证, 服务器端照样还应该对接收到的数据再次验证
- 客户端验证的目的在于帮助用户填好表单， 避免他们提交未完成的表单， 从而节省他们的时间。 服务器端验证的目的在于保护数据库和后台系统的安全。

动画加载 GIF, 去 http://ajaxload.info/ 创建一个。放到 images 目录下。



### 小结
内容都放到了有效的、语义化的 HTML5 标签里面, 并用外部样式表实现了整个外观设计。 最后用 JavaScript & DOM 为它添加了诸多交互功能及可用性方面的增强。

web 的无处不在是它的魅力. 保证任何人都能无障碍的使用它, 是一个基本的原则。
- 使用有意义的标记来构建页面的结构
- 把表现性的信息都分离到 CSS 样式表中
- 负责任地使用不唐突的 JavaScript 来应用行为增强， 同时确保平稳退化

## 附录: JavaScript 库
了解库的特点, 作出正确的选择。

全面考察自己看中的每一个侯选库, 搞清楚如何处理库之间的冲突， 功能太少还是太多， 有没有坚强的社区做后盾, 或者说能否得到及时的及时的技术支持。选择了库以后要尽可能发挥出这个库的最大效用。 
最好能进一步理解库的工作原理， 依赖库不要紧, 关键是不要只停留在简单的使用这个表面上。

<<<<<<< HEAD
=======


>>>>>>> 1802f81121e20beea3a6936690dfdb8ac6b7948f
