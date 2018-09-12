# 02 JS & CSS 写的 Clock

## 实现效果
[!img]()

## 关键点
- 表盘上指针的样式: 旋转的样式。
- 获取实时的时间。
- 每一秒改变一次指针状态。

### 涉及到的特性
- transform-origin
- transform: rotate()
- transition
- transition-timing-function: cubic-bezier(x,x,x,x)
- setInterval(callback, time)
- new Date()

### 页面布局
```html
<div class="clock">
    <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
    </div>
</div>
```

### CSS 部分
CSS 样式:
```css
  <style>
    html {
      background: #018DED url(http://unsplash.it/1500/1000?image=881&blur=50);
      background-size: cover;
      font-family: 'helvetica neue';
      text-align: center;
      font-size: 10px;
    }

    body {
      margin: 0;
      font-size: 2rem;
      display: flex;
      flex: 1;
      min-height: 100vh;
      align-items: center;
    }

    .clock {
      width: 30rem;
      height: 30rem;
      border: 20px solid white;
      border-radius: 50%;
      margin: 50px auto;
      position: relative;
      padding: 2rem;
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1),
      inset 0 0 0 3px #EFEFEF,
      inset 0 0 10px black,
      0 0 10px rgba(0, 0, 0, 0.2);
    }

    .clock-face {
      position: relative;
      width: 100%;
      height: 100%;
      transform: translateY(-3px);
      /* account for the height of the clock hands */
    }

    .hand {
      width: 50%;
      height: 6px;
      background: black;
      position: absolute;
      top: 50%;
      transform-origin: 100%;
      transform: rotate(90deg);
      transition: all 0.05s;
      transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    }
  </style>
```


- 1.调整指针的初始位置以及旋转的轴点 `[transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)`.
    ```
    transform-origin: 100%;   // right
    ```
- 2.调整时钟指针跳动的过滤效果
    ```
    transition: all .5s;      // 设置动画时间为 0.5 秒
    ```
- 3.调整 `transition-time-function` 的值, 以实现秒针 `滴答滴答` 的效果. `transform` 中的 `rotate` (旋转)属性由角度来控制。
    
    Chrome 调试
    - 对于角度这样的值, 点击后按住 shift 或者 Ctrl 不放, 按上下箭头可以快速调整值。
    - 点击图标可以图形化调整 `cubic-bezier` 的值。
- 4.用伪元素给表盘添加一个中心点
    ```css
        .clock-face:after {
        width: .8em;
        height: .8em;
        left: 50%;
        top: 50%;
        position: absolute;
        display: block;
        transform: translate(-50%, -50%);
        content: '';
        background-color: #a8c5d1;
        border-radius: 50%;
        box-shadow:
                0 0 0 2px rgba(0,0,0,0.1),
                0 0 10px rgba(0,0,0,0.2);
    }
    ```
    需要注意的小细节, 指针旋转轴与表盘中心并不重合。解决办法是将指针设置为垂直居中。

    ### JS 部分
