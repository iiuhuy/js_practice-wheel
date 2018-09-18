# 根据 《HTML5、Canvas核心技术图形、动画与游戏开发》 
- 参考源码: 已经不能打开源码的链接了。
- Canvas 有关的测试用例: HTML5、Canvas核心技术图形、动画与游戏开发
- Runfield 游戏: http://fhtr.org/runfield/runfield/

## 第一章 基础知识
- example-1.1
- example-1.1.1

这两个是使用 Canvas 来设置 canvas 元素的大小。canvas 元素实际上有两套尺寸。 一个是元素本身大小, 一个是元素绘图表面的大小。

两个属性和三个方法:
- width
- height
- getContext
- toDataURL(type, quality)
- toBlob(callback, type, args...)

### Canvas 的绘图环境
CanvasRenderingContext2D 对象所含的属性
- 1.canvas
- 2.fillstyle
- 3.font
- 4.globalAlpha
- 5.globalCompsiteOperation
- 6.lineCap
- 7.lineWidth
- 8.lineJoin
- 9.miterLimit
- 10.shadowBlur
- 11.shadowColor
- 12.shadowOffsetX
- 13.shadowOffsetY
- 14.strokeStyle
- 15.textAlign
- 16.textBaseline

在 Canvas 中，有一个与 2D 绘图环境对应的 3D 绘图环境, 叫做 WebGL。

Canvas 状态的保存与恢复:
- save()
- restore() 

本书程序清单的规范格式
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Canvas Title</title>

    <style>
        ... #canvas {
            ...
        }
    </style>
</head>

<body>
    <canvas id='canvas'>
        Canvas not supported
    </canvas>

    <script src='example.js'></script>
</body>

</html>
```

example.js
```js
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');  // 获取绘图环境变量
// Use the context...
```

谈一谈 User Agent
在 Canvas 规范中, 将 canvas 元素的实现者称为 User Agent. 

### 开始学习 HTML5
简述 HTML5 开发环境, 包括了运行应用程序所应用的的浏览器. 以及性能分析器(profiler), 时间轴(timeline) 等开发过程中经常用到的开发工具。
规范:
- HTML5 Canvas
- 基于脚本的定时控制动画(Time control for script-based animation)
- HTML5 视频与音频

关于兼容性, 如果所实现的基于 Canvas 的应用程序必须支持 IE6、IE7、IE8的话, 有两个选择。 
- 使用 explorercanvas，可以在老版本的 Internet Explorer 浏览器中增加对于 Canvas 的支持。
- 使用 Google Chrome Frame 。它将 IE 引擎替换成 Google Chrome 浏览器的引擎。

性能: 如下的三个工具的用法
- 性能分析器(Profiler)
- 时间轴工具(Timeline)
- jsPerf
前面两个工具直接由浏览器提供，或者通过安装**附加元件**来取得。jsPerf 是一个网站，可以在上面创建性能测试，并将其发布给大众。

通过性能分析器能祥尽的观察到程序代码在函数级别的性能表现。可以显示每个函数被调用的次数，以及这些函数调用所话费的时间等。
jsPerf 创建并分享 JavaScript 性能测试。

基本的绘制: 带指针的时钟，用到的 Canvas API 如下
- arc()
- beginPath()
- clearRect()
- fill()
- fillText()
- lineText()
- lineTo()
- moveTo()
- stroke()


