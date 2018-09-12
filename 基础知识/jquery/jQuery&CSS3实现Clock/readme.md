# jQuery & CSS3 实现 Clock

## 标签
这个时钟不需要很多的 HTML, 因为很大一部分都是动态的,像工作日的名称和数字都是动态生成的。

index.html:
```html
<div id=”clock” class=”light”>
    <div class=”display”>
        <div class=”weekdays”></div>
        <div class=”ampm”></div>
        <div class=”alarm”></div>
        <div class=”di  gits”></div>
    </div>
</div>
```
- 主元素为 `#clock` 的 div
- 包含 `.display` 的 div, 用于容纳工作日的名称和数字都是动态生成的。    

为每个数字生成一个标签:
```html
<div class=”zero”>
    <span class=”d1”></span>
    <span class=”d2”></span>
    <span class=”d3”></span>
    <span class=”d4”></span>
    <span class=”d5”></span>
    <span class=”d6”></span>
    <span class=”d7”></span>
</div>
```
`.digits` 元素包含 6 个像这样的带 span 的 div, 每个 div 为时钟的一个数字, 这些 div 拥有一个从 0~9 的样式名称,并且包含了 7 个带独立样式的 span 元素。

这些样式全都由 CSS 设置, 默认情况下设置 `opacity:0`, 
