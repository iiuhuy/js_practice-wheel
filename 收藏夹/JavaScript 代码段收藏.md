# 代码段总结

## 来自 《JavaScript DOM 编程艺术》

### 01 addLoadEvent 方法
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

食用方式:
```js
addLoadEvent(func);
```

### 02 insertAfter() 方法
DOM 没有提供这个方法, 利用已经有的 DOM 方法和属性写一个 insertAfter 函数。
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

