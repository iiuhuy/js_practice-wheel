# 多媒体相关练习
- 音频和视频内容
- 从 `<object>` 到   `<iframe>` —— 其他嵌入技术
- 在页面中添加矢量图像。
    介绍什么是矢量图像，以及如何在网页中添加流行的 SVG 格式图像。
- 响应式图片
    指创建可以自动更改其功能以适应不同屏幕尺寸，分辨率等的网页。知道 HTML 中创建响应式图像的工具。

## HTML 图片
使用 HTML5 的 `<figure>` 和 `<figcaption>` 元素，为图片提供一个语义容器，在标题和图片之间建立清晰的关联。我们之前的例子可以重写为:
```html
<figure>
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">

  <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
</figure>
```

注意 `<figure>` 里不一定要是一张图片，只要是一个这样的独立内容单元：
- 用紧凑、易于掌握的方式表达你的意图。
- 可以放在页面线性流的中几个地方（Could go in several places in the page's linear flow）
- 为主要内容提供重要的补充说明。
- `<figure>` 可以是几张图片、一段代码、音视频、方程、表格或别的。

### CSS 背景图
可以使用 CSS 把图片嵌入网站中（JavaScript 也行，不过那是另外一个故事了），这个 CSS 属性 background-image 和另其他 background-* 属性是用来放置背景图片的。比如，为页面中的所有段落设置一个背景图片，你可以这样做：
```css
p {
  background-image: url("images/dinosaur.jpg");
}
```

### video 标签
当中的属性:
- src: 同 `<img>` 标签使用方式相同，src 属性指向你想要嵌入网页当中的视频资源，他们的使用方式完全相同。
- controls: 用户必须能够控制视频和音频的回放功能。你可以使用浏览器提供的控制接口，同时你也可以在 JavaScript （JavaScript API）当中使用这些控制接口。至少，这些媒体应该包括开始和停止，以及调整音量的功能。

像 MP3、MP4、WebM 这些术语叫做容器格式。他们是用不同的方式来播放音频或者视频的 — 也就是说这些容器是用不同的音频轨道、视频轨道、元数据来呈现媒体文件的。

视频和音频都有不同的格式，如下:
- WebM 容器通常包括了 Ogg Vorbis 音频和 VP8/VP9 视频。主要在 FireFox 和 Chrome 当中支持。
- MP4 容器通常包括 AAC 以及 MP3 音频和 H.264 视频。主要在 Internet Explorer 和 Safari 当中支持。
- 老式的 Ogg 容器往往支持 Ogg Vorbis  音频和 Ogg Theora 视频。主要在 Firefox 和 Chrome 当中支持，不过这个容器已经被更强大的 WebM 容器所取代。

参考: https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats#

新的特性:
- width 和 height:

    你可以用属性控制视频的尺寸，也可以用 CSS 来控制视频尺寸。 无论使用哪种方式，视频都会保持它原始的长宽比 — 也叫做纵横比。如果你设置的尺寸没有保持视频原始长宽比，那么视频边框将会拉伸，而未被视频内容填充的部分，将会显示默认的背景颜
- autoplay:

    这个属性会使音频和视频内容立即播放，即使页面的其他部分还没有加载完全。建议不要应用这个属性在你的网站上，因为用户们会比较反感自动播放的媒体文件。
- loop: 

    这个属性可以让音频或者视频文件循环播放。同样不建议使用，除非有必要。
- meted:

    这个属性会导致媒体播放时，默认关闭声音。
- poster:

    这个属性指向了一个图像的 URL，这个图像会在视频播放前显示。通常用于粗略的预览或者广告。
- preload:

    这个属性被用来缓冲较大的文件，有 3 个值可选：
    - "none" ：不缓冲
    - "auto" ：页面加载后缓存媒体文件
    - "metadata" ：仅缓冲文件的元数据

### audio 标签
和 vedio 有一些细微的差别比如下面的边框不同，一个典型的例子如下：
```html
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p>
</audio>
```

一些与 HTML5 `<video>` 的差异如下：
- `<audio>` 标签不支持 width/height 属性 — 由于其并没有视觉部件，也就没有可以设置 width/height 的内容。
- 同时也不支持 poster 属性 — 同样，没有视觉部件。
- 其他都和 vedio 基础一致。


## 作业实践
实践学习：在网站上嵌入你自己的视频或音频。
在这个实践学习当中，我们希望你能够走出去，并且记录一些你自己的视频或者音频 — 如今，大多数手机都能够非常方便的记录视频或者音频，并且你可以将他们上传到你的电脑上面，你可以使用这些功能来记录你的视频或音频。在这时候，你可能需要做一些格式转换，如果是视频的话，你需要将它们转化为 WebM 或者 MP4 ，如果是音频的话，你需要将它们转化为 MP3 或者 Ogg 。 不过你并不需要担心，有许多的程序都能够帮你解决这些问题，例如 Miro Video Converter 和 Audacity.。

使用提供的样板视频:
- 将你的音频或者视频文件保存在你电脑上的一个新目录中。
- 创建一个新的 HTML 文件在相同的路径下，命名为 index.html。
- 在页面上添加 `<audio>` 和 `<video>` 标签；并使用浏览器默认的控件来显示它们。
- 在当中添加 `<source>` 标签，并添加 type 属性，以便于浏览器能够找到其能够支持的格式并加载它。
- 在 `<video>` 标签中添加 poster 属性，这会显示在视频播放之前。

官方参考例子: [传送门~](https://github.com/iandevlin/iandevlin.github.io/tree/637f38c5c5165beb3e7dd2fc5e64771f449e9a64/mdn/video-player-with-captions). 这个目前还没完全弄懂, 后面得研究一下这方面的。

