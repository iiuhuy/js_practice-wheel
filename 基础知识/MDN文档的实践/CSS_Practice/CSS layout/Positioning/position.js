var table = document.querySelectorAll('.info-box li a');
var panels = document.querySelectorAll('.info-box article');

// 遍历所有的选项卡
for(i = 0; i < table.length; i++) {
    var tab = table[i];
    setTabHandler(tab,i);
}

//  创建 onclick 事件, 点击的时候会发生下面的事情:
//  - 1.用 for 循环清楚所有标签当前存在的类
//  - 2.点击时在标枪创建一个 active 类
//  - 3.用 for 清除所有面板当前存在的类
//  - 4.当标签被点击的时候在和标签相对应的面板上创建了一个 active-panel 类
function setTabHandler(tab, tabPos) {
    tab.onclick = function() {  
        for(i = 0; i < table.length; i++) {
            if(table[i].getAttribute('class')) {
                table[i].removeAttribute('class');
            }
        }

        tab.setAttribute('class', 'active');

        for(i = 0; i < panels.length; i++) {
            if(panels[i].getAttribute('class')) {
                panels[i].removeAttribute('class');
            }
        }

        panels[tabPos].setAttribute('class', 'active-panel');
    }
}