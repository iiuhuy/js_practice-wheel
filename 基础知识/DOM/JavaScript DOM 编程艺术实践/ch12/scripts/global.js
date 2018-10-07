/* Global */
// addLoadEvent 方法
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// insertAfter 方法, 和 insertBefore 对应
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// addClass 函数
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

// highlightPage 
// 1.取得导航列表中所有链接
// 2.循环遍历这些链接
// 3.如果发现了与当前 URL 匹配的链接, 为它添加 here 类
function highlightPage(href) {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;

    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;

    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;

    // 取得导航栏然后遍历它们
    var links = navs[0].getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        for (let i = 0; i < links.length; i++) {
            let linkURL = links[i].getAttribute("href");

            if (window.location.href.indexOf(linkURL) != -1) {
                links[i].className = "here";

                // 相当于在 body 标签中添加 id="home"
                var linktext = links[i].lastChild.nodeValue.toLowerCase();
                document.body.setAttribute("id", linktext);
            }
        }
    }
}

/* Home */
// 把第十章的 moveElement 函数复制过来。
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;

    var elem = document.getElementById(elementID);

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);

    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        xpos++;
    }
    if (xpos > final_x) {
        xpos--;
    }
    if (ypos < final_y) {
        ypos++;
    }
    if (ypos > final_y) {
        ypos--;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "', " + final_x + "," + final_y + "," + interval + ")";
    movement = setTimeout(repeat, interval);
}

// 创建幻灯片元素并准备相应链接了, 直接把幻灯片放到文档中的 intro 段落后面
function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;

    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");

    // 导航中的 div 链接也能触发幻灯片
    let frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);

    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you.");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    // var links = intro.getElementsByTagName("a");
    // 将 intro.getElement 改为 document.getElement
    let links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        links[i].onmouseover = function () {
            let destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5);
            }
        }
    }
}

// about: 单击一个内部链接, 应该只会显示相关的部分. 
// showSection() 修改每个部分的 display 样式属性, 
function showSection(id) {
    let sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++) {
        // 传入 id 对应部分的 display 属性被设置为 block，其他部分的 display 被设置为 none
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

// 在 article 中的 nav 所包含的链接被单击时调用 showSection 函数
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    // 如果 articles 不为空, 那么就继续执行
    if (articles.length == 0) return false;
    let navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    // 遍历出 article 中 nav 中的链接
    var links = nav.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        // 要提取每一部分的 id 值， 使用 split 方法， 难道 # 后面的字符
        // split 方法得到后的元素有两个, # 前面的字符和后面的字符. 前面的是空字符, 需要拿到后面的字符
        let sectionId = links[i].getAttribute("href").split("#")[1];
        console.log(links[i].getAttribute("href").split("#")[1]); // 空字符
        if (!document.getElementById(sectionId)) continue;
        console.log("test");

        // 页面加载后默认隐藏所有部分
        document.getElementById(sectionId).style.display = "none";

        // 声明 sectionId, 将 id 值传递给 showSection. 
        // 由于 sectionId 是一个局变量, 只能在 prepareInternalnav 执行的期间存在, 等到事件处理函数执行的时候就不存在了
        // 解决这个问题, 为每个链接创建一个自定义的属性, 例如下面的 destination, 然后将 sectionId 的值赋值给它
        links[i].destination = sectionId; // 这个属性的作用域是持久存在的.
        // 点击链接时调用 showSection 方法
        links[i].onclick = function () {
            showSection(this.destination);
            return false;
        }
    }
}

// photos
// showPic
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

// 图片库
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;

    var placeholder = document.createElement("img"); // 1.
    placeholder.setAttribute("id", "placeholder"); // 2.
    placeholder.setAttribute("src", "images/placeholder.gif"); // 3.
    placeholder.setAttribute("alt", "placeholder.gif"); // 4.
    var description = document.createElement("p"); // 5.
    description.setAttribute("id", "description"); // 6.
    var desctext = document.createTextNode("选择一张图"); // 7.
    description.appendChild(desctext); // 8.
    // HTML-DOM 提供的属性 body 来简写:
    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);
    // 食用 insertAfter 方法
    var gallery = document.getElementById("imagegallery"); // 得到图片清单
    // description 中的文本被放到 placeholder 图像的上方. 
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

// prepareGallery 方法: 点击缩略图显示到 图片占位符 的位置
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this);
        }
    }
}

// 第 9 章中的 stripeTables
function stripeTables() {
    if (!document.getElementsByTagName) return false;

    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (let i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (let j = 0; j < rows.length; j++) {
            if (odd == true) {
                rows[j].style.backgroundColor = "#ffc";
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        // console.log("当前的 this" + this);
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            // console.log("onmouseover" + this);
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function () {
            // console.log("onmouseout" + this);
            this.className = this.oldClassName;
        }
    }
}

function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement ||
        !document.createTextNode) return false;

    /* 取得所有缩略词 */
    // 找到 abbr 及诶单, 返回 abbr 元素节点的集合
    let abbreviations = document.getElementsByTagName("abbr");
    // 先判断文档中是否有缩略图, 查询一下 abbreviations 数组的 length 属性
    if (abbreviations.length < 1) return false;
    // 获取并保存每个 abbr 元素的属性
    let defs = new Array();

    /* 遍历这些缩略词 */
    for (let i = 0; i < abbreviations.length; i++) {
        let current_abbr = abbreviations[i];

        // 保证 displayAbbreviations 函数能在 IE 中能够平稳退化: 如果当前元素没有zijiedian, 就立刻开始下一次循环
        if (current_abbr.childNodes.length < 1) continue;

        // 使用 getAttribute 方法得到 title 属性的值, 并把值保存到 变量
        let definition = current_abbr.getAttribute("title");
        // 拿到 缩略语文本, 需要 nodeValue 属性
        let key = current_abbr.lastChild.nodeValue;
        // 将缩略语以及解释保存到 defs 数组
        defs[key] = definition;
    }

    /* 创建定义列表 */
    let dlist = document.createElement("dl");
    // 使用 for/in 循环把某个数组下的 标(键) 临时赋值给一个变量
    for (key in defs) { // 对于 defs 关联数组里的每个键, 把它赋值给变量 key
        let definition = defs[key];

        // 每次循环都需要创建 dt & dd 
        /* 创建定义标题 */
        let dtitle = document.createElement("dt");
        let dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text); // 把文本节点添加到元素节点
        let ddesc = document.createElement("dd");
        let ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);

        /* 把它们添加到 定义列表 */
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;

    // 在 body 中插入这个 定义列表
    // 给它创建一个 标题
    let header = document.createElement("h3");
    let header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text); // 将元素文本节点添加到元素节点

    let articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    // document.body.appendChild(header);
    // document.body.appendChild(dlist);
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}

// contact 
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    let labels = document.getElementsByTagName("label");

    for (let i = 0; i < labels.length; i++) {
        // 如果 label 有 for 属性, 添加一个事件处理函数
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            // 提取 for 的属性值, 这个值就是相应表单字段的 id 值
            let id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            let element = document.getElementById(id);
            element.focus();
        }
    }
}

// resetFields: 接受一个 form 对象作为参数
// 1.检查浏览器是否支持 placeholder 属性, 支持则继续
// 2.循环遍历表单中的每个元素
// 3.如果当前元素是提交按钮, 跳过
// 4.为元素获得焦点的事件添加一个处理函数. 如果字段的值等于占位符文本, 则将字段的值设置为空
// 5.再为元素失去焦点的事件添加一个处理函数, 如果字段的值为空, 则为其添加占位符值
// 6.为了应用样式, 在字段显示占位符的时候添加 placeholder 类
function resetFields(whichform) {
    // if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        if (!element.getAttribute('placeholder')) continue;

        // onfocus 会通过用户在按 Tab 键或者点击表单字段时被触发
        element.onfocus = function () {
            if (this.value == this.getAttribute('placeholder')) {
                this.value = "";
            }
        }
        // 在用户把焦点移出表单字段时触发
        element.onblur = function () {
            if (this.value == "") {
                this.value = this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}



// 为 readFilds 传递对象
function prepareForms() {
    for (let i = 0; i < document.forms.length; i++) {
        let thisform = document.forms[i];
        resetFields(thisform);
        // 通过 onsubmit 事件处理函数来添加验证
        thisform.onsubmit = function () {
            if(!validateForm(this)) return false;
            let article = document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}

// 以表单元素作为参数
function isFilled(field) {
    if (field.value.replace(' ', '').length == 0) return false;
    let placeholder = field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}

// isEmail
function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

// validateFoem: 以一个 form 对象为参数
// 1.循环遍历表单的 elements 数组
// 2.如果发现了 required 属性， 把相应的元素传递给 isFilled 函数
// 3.如果 isFilled 函数返回 false, 显示警告消息, 并且 validateForm 函数也返回 false
// 4.如果找到了 email 类型的字段, 把相应的元素传递给 isEmail 函数
// 5.如果 isEmail 函数返回 false, 显示警告消息, 并且 validateForm 函数也返回 false
// 6.否则, validateForm 函数返回 true
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.getAttribute("required") == 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if (element.getAttribute("type") == 'email') {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

/* Ajax */

// 第 7 章的 getHTTPObject 函数
function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function () {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (e) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (e) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {}
            return false;
        }
    return new XMLHttpRequest();
}

// 创建一个加载图像, 在 Ajax 请求刚启动时把它添加到文档中。
// function displayAjaxLoading(element) {
//     // Remove the existing content.
//     while (element.hasChildNodes()) {
//         element.removeChild(element.lastChild);
//     }
//     //  Create a loading image.
//     let content = document.createElement("img");
//     content.setAttribute("src", "images/loading.gif");
//     content.setAttribute("alt", "Loading...");
//     // Append the loading element.
//     element.appendChild(content);
// }

// submitFormWithAjax 第一参数是 form 对象, 第二个参数是 目标对象
// 1.调用 displayAjaxLoading 函数, 删除目标元素的子元素, 并添加 loading.gif 图像
// 2.把表单的值组织成 URL 编码的字符串, 已便通过 Ajax 请求发送
// 3.创建方法为 POST 的 Ajax 请求, 把表单的值发送给 submit.html
// 4.如果请求成功, 解析响应并在目标元素中显示结果
// 5.入股请求失败, 显示错误消息
// function submitFormWithAjax(whichform, thetarget) {

//     // 检查是否存在有效的 XMLHttpRequest 对象
//     let request = getHTTPObject();
//     if (!request) {
//         return false;
//     }
//     displayAjaxLoading(thetarget);

//     // Collect the data.
//     // 这段代码如果看不懂回看 书上的 261页。 电子版在 278 左右。
//     var dataParts = [];
//     var element;
//     for (var i = 0; i < whichform.elements.length; i++) {
//         element = whichform.elements[i];
//         dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
//     }
//     var data = dataParts.join('&');

//     request.open('POST', whichform.getAttribute("action"), true);
//     request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//     // 
//     request.onreadystatechange = function () {
//         if (request.readyState == 4) {
//             if (request.status == 200 || request.status == 0) {
//                 var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
//                 if (matches.length > 0) {
//                     thetarget.innerHTML = matches[1];
//                 } else {
//                     thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
//                 }
//             } else {
//                 thetarget.innerHTML = '<p>' + request.statusText + '</p>';
//             }
//         }
//     };

//     request.send(data);

//     return true;
// };

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

// 增强表格
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

// 增强表单
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);