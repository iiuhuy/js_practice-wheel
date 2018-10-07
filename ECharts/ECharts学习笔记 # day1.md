# Echarts 学习笔记①
有天突然在 羡辙 的微博上, 看到她和 钰猫 在 B站上出了 ECharts 相关的视频。 emmm, 赶紧去学习了一下。 [B站传送门](https://www.bilibili.com/video/av31172702?t=613)

## 搭建本地环境
- fork ECharts 仓库项目: https://github.com/apache/incubator-echarts
- 还需要 fork zrender 这个库 https://github.com/ecomfe/zrender

- 将两个项目放到同一个目录下,  然后 
```
cd incubator-echarts
npm i
```

- 接下来需要做的事情是, 把 echarts 下面的 zrender 给删除；
```
rm -rf node_modules/zrender
```

- 然后把它软链接到下载的 zrender 项目:
```
ln -s /media/alvinmi/Data/1_alvinmi/ECharts_Practice/zrender /media/alvinmi/Data/1_alvinmi/ECharts_Practice/incubator-echarts/node_modules/zrender
```

- 这个路径根据自己存放 clone 到本地项目的路径为准。最后验证一下, 看是否能够打出 `node_modeles/zrender` 目录:
```
ls node_modules/zrender
```

会有以下这些文件:
```
404.html  build  dist  index.html  index.js  jsdoc.json  LICENSE  package.json  README.md  src  test  zrender.all.js
```

这样本地的环境就算搭建完成了。Ubuntu 16.04 & MAC-OS 是没问题的。Windows 下命令不一样。

## 运行
如果需要运行的话：

```
node build/build.js
```
我 build 的时候, 报了一个错: `Error: Cannot find module 'rollup'`，然后需要安装以下这个包:

```
npm install rollup --save 
```

再重新 `node build/build.js`。
这样的一个操作会把 echarts 是源代码进行解析, 生成到 echarts 的 dist 目录下. 目前生成的名字就是 `echarts.js` 文件。 你是用 vscode 的话, 也可以看到当前目录下, 只有 echarts.js & echarts.js.map 文件是更新的。

现在去 test 目录下, 去运行一个例子。然后可以看到它会 `require` echarts, 这个 echarts 就是刚刚生成的 echarts.js 文件。

# ECharts 学习笔记②

## 一个图片是怎么渲染出来的？

- 如何使用 Canvas & SVG 对图标进行渲染呢？

Canvas 绘制矩形的三种方式:
- 1.方法一: 直接使用填充的形式绘制矩形
```js
ctx.fillRect(x, y, width. height);
```
- 2.方法二: 填充一个矩形路径
```js
ctx.rect(x, y, width, height);
ctx.fill();
```

- 3.方法三: 
```js
ctx.beginPath()     // 创建一个路径
ctx.moveTo(x, y);   // 移动到矩形的左上角
ctx.lineTo(x + width, y);   // 生成到矩形右上角的路径
ctx.lineTo(x + width, y)    // 生成到矩形的右下角路径
ctx.lineTo(x, y + height);  // 生成到矩形的左下角路径
ctx.lineTo(x, y);           // 生成到矩形左上角的路径
ctx.fill();         // 填充路径
```

ECharts 则就是采取第三种方式.

SVG 绘制矩形的方式
方法: 在 SVG 中增加一个 `<rect>` 节点
```js
<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100"/>
</svg>
```

**问题: 如何与 Canvas统一?**
```js
// canvas
var chart = echarts.init(document.getElementById('main'), null, {});    // null, {} 可省略

// svg
var chart = echarts.init(document.getElementById('mian'), null, {
    renderer: 'svg';
});

chart.setOPtion({/* 这部分对 canvas 与 SVG 都是相同的 */});
```

对于 ECharts 的开发者而言, 如何去使得上层的操作对于底层的绘制不进行影响呢？
- ECharts 地测的渲染引擎, zrender.
- 从 API 来看, https://ecomfe.github.io/zrender-doc/public/ 做的事情。
例如动画相关的、元素、事件的处理、渐变、组和、矩阵、旋转屏、缩放屏等。对于 echarts 而已, 它只是在进行绘制的时候, 就使用 ZRender 在场景中添加元素 的方式去定义一个圆, 而不是使用 canvas 的路径操作以及 SVG 的操作, 在我们切换它们渲染引擎的时候, 只要对 zrender 初始化的时候, 传入渲染的类型就可以了。

以[画这 7 条柱状图的例子来说](http://www.echartsjs.com/examples/editor.html?c=bar-simple)：
- 在什么地方画？(x, y, width, height)
- 以什么样的形式去画呢？(fill, stroke, ...)

引入坐标系的概念。在 [官方文档](http://echarts.baidu.com/option.html#title) 配置项中, 对于笛卡尔坐标系而言, 是通过 grid 配置项来实现的。可以看到有 left、top、right、bottom 四个属性和它的默认值。

对于横轴来说, 这里的 7 个, 是不是把横向的坐标系的宽度, 除以 7 , 每个中间再加点间隙就行了。 一般来说大概的思路是这样的, 但是还有很对细节需要处理。 对于大数据, 数据很多的时候, 那么是怎么处理的呢? 显然不可能全部都显示出来。

ECharts 中的做法就是会计算出它每个标签的宽度, 看看标签标签之间会不会有重叠, 如果有重叠呢就每隔一定的间隙去对它进行展示。

纵坐标来说, 纵坐标是数值的类型, 也就是连续的类型。那如何决定纵向的高度呢？
对于这里的简单例子而言, 它的数值的都是正数, 因此不需要考虑负数的情况, 那么它的最大值是由什么来决定的呢？ 是不是就是我们数据中的最大值呢？ 验证一下。 将例子的最大数值从 200 改为 201, 显示的值为 250 这样的最大值。 其实就是 echarts 内部进行的调整、 具体实现后面可以看看源码. 这里我们只需要知道, 这里的最大最小值也不是根据数字的大小来决定的。

再来看看柱子的样式是怎么决定的？ 比如填充色、描边色等等。 
对于这点我们可以通过 `itemStyle` 进行设置。连包括了 color、borderColor 等等。那么这里的 `itemStyle` 就唯一决定了图形的样式吗？ 答案是否定的。 其实还可以通过 `data:[{` 下面的 `itemStyle` 来覆盖掉整个系列的设置。也就是说可以通过这个可以为每一个柱子设置不同的颜色。如果没有设置, 它就会使用上一层的配置项, 也就是系列级别的颜色, 如果在系列中也找不到它的配置项, 就会找顶层的配置项。

下面通过源码的方式来了解下, 通过笔记①中安装的 ECharts 来查看, 在`ECharts_Practice/incubator-echarts/src/model/Model.js` 中找到一个 get 方法.

> 作业: 再次看配置项手册, 它是个树状的结构。 如果能仔细看它的每个配置项就最好。

# ECharts 学习笔记③
- 本期解决 issue: https://github.com/apache/incubator-echarts/issues/6735
- commit: https://github.com/ecomfe/echarts-doc/commit/09c6726262b4e4e80d9fb2c8ef97784bc3711605
- 作业：浏览 https://github.com/apache/incubator-echarts/projects/3 ，了解每个 issue 大致是什么问题。


课程总结:
- 不要被 渐进式渲染、视觉隐射，等给吓到了，可能需要该的部分真的很小, 跟着羡辙&钰猫一起 debug 的方法, 学习怎么去解决遇到的问题。

- 热力图动画关不掉(视频中遇到的问题)。

    引起这个问题的主要原因是因为数据量较大的时候会默认开启渐进式渲染，而不是 “动画(animation)”。
    
    热力图默认会在数据量大于 3000 的情况下开启渐进式渲染，这个值可以通过 `series.progressiveThreshold` 修改；每次渲染 400 个，这个值可以通过 `series.progressive` 修改。之前文档漏了这部分的说明，已在上面的 commit 中修复。
    
    因此，对于这个例子而言，如果不希望出现所谓的 “动画”，可以通过将 `series.progressiveThreshold` 设大一点，比如例子中数据有 20000 个点，如果 `series.progressiveThreshold` 大于这个值将会一下子渲染出结果了。但是实际上会由于数据量较大，有几秒的白屏时间，体验上有些损失。出于用户体验的考虑，建议保留渐进式渲染的结果。