# 编写更好的 jQuery 代码
>原文:https://modernweb.com/writing-better-jquery-code/

建议遵循下面的指南

### 缓存变量
DOM 遍历是昂贵的, 所以尽量将重用的元素缓存。
```js
// bad
h = $('#element').height();
$('#element').css('height', h-20);

// good
$element = $('#element');
h = $element.height();
$element.css('height', h-20);
```

### 避免全局变量
jQuery 与 JavaScript 一样，一般来说, 最好确保你的变量在函数作用域内。
```js

```

