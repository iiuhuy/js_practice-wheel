// 实现左右两边点击箭头切换图片的效果

// 当页面加载完后, 
window.onload = function () {
    // 通过 id 获取容器、list、buttons、prex、next
    var container = document.getElementById('container');
    // 先获取 div, 在获取 span
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1; // 小圆点的标志位
    var animated = false;   // 动画是否在运行始状态的存放
    let timer = 0;  // 动画定时器

    function showButton() {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    };

    function animate(params) {
        animated = true;
        var newLeft = parseInt(list.style.left) + params; // 目标值

        let timer = 300; // 位移总时间
        let interval = 10   ; // 位移间隔时间，设置的是 10ms 以后掉
        let speed = params / (timer / interval); // 每一次的位移speed量

        // 还需要一个函数做位移的函数
        function go() {
            // 满足做位移的情况
            if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left < newLeft))) {
                list.style.left = newLeft + speed + 'px';
                // go(); //  递归, 自己调用自己
                // 设置定时器
                setTimeout(go, interval);
            } else {
                animated = false;   
                list.style.left = newLeft + 'px';

                // parseInt 转换成数字
                // list.style.left = parseInt(list.style.left) + params + 'px';
                if (newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
                if (newLeft > -600) {
                    list.style.left = -3000 + 'px';
                }
            }
        }
        go();   // 调用一下函数, 执行

    }

    // 动画切换, 自动播放
    function play() {
        timer = setInterval(function () {
            next.onclick();
        }, 3000);
    };
    // 当鼠标放上去的时候, 就停止
    function stop() {
        clearTimeout(timer);    // 将时钟清除就好了
    };

    // 添加事件绑定
    next.onclick = function () {
        // 每次点击图片后, 都需要改变一下 index 的值, 使其对应上图片
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        showButton();
        if(!animated) {
            animate(-600);
        }
    };

    prev.onclick = function () {
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        showButton();
        if(!animated) {
            animate(600);
        }
    };

    // 小圆点的点击事件
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {

            // 当前的 className 为 on 的时候, 就不用往后面执行了。
            if (this.className == 'on') {
                return;
            }

            let myIndex = parseInt(this.getAttribute('index'));
            // 计算小圆点的偏移量
            var offset = -600 * (myIndex - index);
            index = myIndex;
            showButton();
            if(!animated) {
                animate(offset);
            }
            // debugger;
        }
    }
    container.onmouseover = stop;
    container.onmouseout = play;        
    play(); // 一开始就自动播放的状态
}