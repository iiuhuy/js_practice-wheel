// document.write("<p>This is inserted.</p>");

// function insertParagraph(text) {
//     var str = "<p>";
//     str += text;
//     str += "</p>";
//     document.write(str);
// }

// window.onload = function () {  
//     // var testdiv = document.getElementById("testdiv");
//     //// alert(testdiv.innerHTML);
//     // testdiv.innerHTML = "<p>I inserted <em>this</em> content.</p>";

//     var para = document.createElement("p");
//     var info = "nodeName: ";
//     info += para.nodeName;
//     info += " nodeType: ";
//     info += para.nodeType;
//     alert(info);
// }

// ------------------------------------------------------------------------------- //

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

// insertAfter 方法
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 图片库
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;

    var placeholder = document.createElement("img"); // 1.
    placeholder.setAttribute("id", "placeholder"); // 2.
    placeholder.setAttribute("src", "image/placeholder.gif"); // 3.
    placeholder.setAttribute("alt", "placeholder.gif"); // 4.
    var description = document.createElement("p"); // 5.
    description.setAttribute("id", "description"); // 6.
    var desctext = document.createTextNode("选择一张图"); // 7.
    description.appendChild(desctext); // 8.
    // document.getElementsByTagName("body")[0].appendChild(placeholder);  // 9.
    // document.getElementsByTagName("body")[0].appendChild(description);  // 9.
    // HTML-DOM 提供的属性 body 来简写:
    document.body.appendChild(placeholder);
    document.body.appendChild(description);

    // 在元素前增加一个元素 insertBefor 
    // var gallery = document.getElementById("imagegallery");  // 得到图片清单
    // gallery.parentNode.insertBefore(placeholder, gallery);  
    // gallery.parentNode.insertBefore(description, gallery);

    // 食用 insertAfter 方法
    var gallery = document.getElementById("imagegallery"); // 得到图片清单
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
    // 在开头新增几条语句，判断浏览器是否支持
}

// prepareGallery 方法
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
        links[i].onkeypress = links[i].onclick;
    }
}

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

// window.onload = preparePlaceholder;
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);