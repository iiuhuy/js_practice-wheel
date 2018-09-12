# 什么是矢量图形？
通常会和两种类型的图片打交道 — 位图和矢量图:
- 位图使用像素网格来定义 — 一个位图文件精确得包含了每个像素的位置和它的色彩信息。流行的位图格式包括 Bitmap (.bmp), PNG (.png), JPEG (.jpg), and GIF (.gif.)
- 矢量图使用算法来定义 — 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。 SVG 格式可以让我们创造用于 Web 的精彩的矢量图形。

- MDN 上的在线例子, https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/vector-versus-raster.html png & 矢量图的区别, 当放大的时候 png 会越来越模糊, 矢量图看起来仍然很清晰。
- 矢量图形相较于同样的位图，通常拥有更小的体积，因为它们仅需储存少量的算法，而不是逐个储存每个像素的信息。

# SVG 是什么？
SVG 是用于描述矢量图像的 XML 语言。 用于标记图形, 而不是内容。

其他的优点:
- 矢量图像中的文本仍然可访问（这也有利于 SEO)）。
- SVG 可以很好地适应样式 / 脚本，因为图像的每个组件都是可以通过 CSS 或通过 JavaScript 编写的样式的元素。

那么缺点呢？
- SVG 非常容易变得复杂，这意味着文件大小会增加; 复杂的 SVG 也会在浏览器中占用很长的处理时间。
- SVG 可能比栅格图像更难创建，具体取决于您尝试创建哪种图像。 这也是为什么会有人想使用光栅图形而不是 SVG？
- 旧版浏览器不支持 SVG，因此如果您需要在网站上支持旧版本的 IE，则可能不适合（SVG 从 IE9 开始得到支持）。

## 将 svg 添加到页面
方便的方式: img
要通过 `<img>` 元素嵌入 SVG，只需要按照预期的方式在 src 属性中引用它。将 height 或 width 属性（或者 SVG 没有固有的宽高比）.的图片 。
```html
<img 
    src="equilateral.svg" 
    alt="triangle with all three sides equal"
    height="87px"
    width="100px" />
```

这样的优点:
- 快速，熟悉的图像语法与alt属性中提供的内置文本等效。
- 可以通过在 `<a>` 元素嵌套 `<img>`，使图像轻松地成为超链接。

缺点:
- 无法使用 JavaScript 操作图像。
- 如果要使用 CSS 控制 SVG 内容，则必须在 SVG 代码中包含内联 CSS 样式。 （从 SVG 文件调用的外部样式表不起作用）
- 不能用 CSS 伪类来重设图像样式（如:focus）。

## 在 HTML 中引用
## 使用 iframe 嵌入 svg