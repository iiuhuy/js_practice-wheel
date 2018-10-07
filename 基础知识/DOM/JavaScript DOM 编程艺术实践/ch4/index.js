/**
 * 函数描述
 *    为了把 占位符 替换为想要看到的图片，就要改变它的 src 属性
 * 
 * @param {string} whichpic 参数1的说明
 * @return {null} 返回值描述
 */
function showPic(whichpic) {
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    
    // 用 JavaScript 改变这段文字的描述 
    var text = whichpic.getAttribute("title");
    var description = document.getElementById("description");
    description.childNodes[0].nodeValue = text; // 利用 nodevalue 刷新这段描述

}

// 非 DOM 解决方案: 下面语句等同于 placeholder.setAttribute("src", source);
// placeholder.src = source;

/**
 * 函数描述
 *    alert 一个对话框,显示 body 元素的子元素的总个数
 * 
 * @param {null} null 参数1的说明
 * @return {null} 返回值描述
 */
// function countBodyChildren() {
//     var body_element = document.getElementsByTagName("body")[0];
//     alert(body_element.childNodes.length);
//     alert(body_element.nodeType);

// }

// 拓展, 使图片库的 title 属性和它对应的图片显示在同一网页上
// 因为每份文档只有一个 body 元素, 所以它是 getElementsByTagName("body") 返回的数组中的第一个元素
// var body_element = document.getElementsByTagName("body")[0].childNodes;
// console.log(body_element);

// window.onload = countBodyChildren;