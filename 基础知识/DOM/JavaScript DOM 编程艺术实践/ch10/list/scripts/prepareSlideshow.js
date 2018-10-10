function prepareSlideshow() {  
    // 确保浏览器支持 DOM 方法
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;

    // 确保元素存在
    if(!document.getElementById("linklist")) return false;
    // 标签里面删除了就不需要这句了
    // if(!document.getElementById("preview")) return false;    

    // 为图片应用样式
    var slideshow = document.createElement("div");  // 创建 div
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");    // 创建 img
    preview.setAttribute("src", "images/topics.gif");
    preview.setAttribute("alt", "building blocks of web design!");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);     // 添加到元素节点
    var list = document.getElementById("linklist");
    insertAfter(slideshow, list);
    
    // 在 moveElement 中判断了 left &　top　就不用下面这两句了
    // preview.style.left = "0px";      
    // preview.style.top = "0px";

    // 取得列表中的所有链接
    // var list = document.getElementById("linklist");
    var links = list.getElementsByTagName("a");

    // 为 mouseover 事件添加动画效果
    links[0].onmouseover = function() {  
        moveElement("preview", -100, 0, 10);
    }
    links[1].onmouseover = function() {
        moveElement("preview", -200, 0, 10);
    }
    links[2].onmouseover = function() {  
        moveElement("preview", -300, 0, 10);
    }
}

addLoadEvent(prepareSlideshow);