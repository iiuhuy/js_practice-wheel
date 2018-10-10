alert(typeof document.getElementById("purchases")); // 返回的是对象 Object
alert(document.getElementsByTagName("li").length);  // 返回 li 列表项的个数

// 利用 for 循环将列表项里面的元素遍历出来
var items = document.getElementsByTagName("li");
for(var i = 0; i < items.length; i++) {
    alert(typeof items[i]);
}

alert(document.getElementsByTagName("*").length + "个标签元素");

// 返回一个数组, 包含 sale 类名的所有元素
document.getElementsByClassName("sale");

alert(document.getElementsByClassName("important sale").length);

// 如果想知道在 id 为 purchases 的元素中有多少类名包含 sale 列表项, 
// 可以先找到那个特定的对象, 然后调用 getElementByClassName
var shopping = document.getElementById("purchases");
var sales = shopping.getElementsByClassName("sale");
alert(sales.length + "个 sale 元素");
// 下面这个函数能适用于老的浏览器
/*
 * @params
 * node: 表示 DOM 树中的搜索起点
 * className: 搜索的类名字
 */
function getElementByClassName(node, className) {
    if(node.getElementByClassName) {
        // 使用现有的方法
        return node.getElementByClassName(className);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        for(var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(className) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results; 
    }
}
// 如果使用上面的例子来获取购物列表的操作
var shopping_func = document.getElementById("purchases");
var sales_func = getElementByClassName(shopping_func, "sale");
alert(sales_func.length + " 个 sales_func");

// getAttribute & getElementByTagName 获取 p 中的 title 属性
var paras = document.getElementsByTagName("p");
// for(var i = 0; i < paras.length; i++) {
//     alert(paras[i].getAttribute("title"));
// }
// 简洁点
for(var i = 0; i < paras.length; i++) {
    var title_text = paras[i].getAttribute("title");
    if(title_text) alert(title_text);
}

// setAttribute 方法
// 都喜欢用 for 循环来处理这样的更改？
var parasSet = document.getElementsByTagName("p");
for(var i = 0; i < parasSet.length; i++) {
    var title_text = parasSet[i].getAttribute("title");
    if(title_text) {
        alert("我是setAttribute设置之前的 title: " + parasSet[i].getAttribute("title"));
        parasSet[i].setAttribute("title","哈哈哈哈哈哈");
        alert("我是setAttribute 设置之后的 title: " + parasSet[i].getAttribute("title"));
    }
}

