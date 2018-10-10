// 使用 DOM 来创建 HTML 注释的列表，步骤如下:
/*  1.遍历这份文档中的所有 abbr 元素
 *  2.保存每个 abbr 元素的 title 属性
 *  3.保存每个 abbr 元素包含的文本
 *  4.创建一个 定义列表 元素 (dl 元素)
 *  5.遍历刚才保存的 title 属性和 abbr 元素的文本
 *  6.创建一个 定义标题 元素(dt 元素)
 *  7.把 abbr 元素的文本插入到这个 dt 元素
 *  8.创建一个 定义描述 元素 (dd 元素)
 *  9.把 title 属性插入到这个 dd 元素
 *  10.把 dt 元素追加到 第四步创建的 dl 元素上
 *  11.把 dd 元素追加到 第四步创建的 dl 元素上
 *  12.把 dl 元素追加到 index.html 文档的 body 元素上
 *  
 *  13.检查兼容性
*/
function displayAbbreviations() {
    if(!document.getElementsByTagName || !document.createElement 
        || !document.createTextNode) return false;

    /* 取得所有缩略词 */
    // 找到 abbr 及诶单, 返回 abbr 元素节点的集合
    var abbreviations = document.getElementsByTagName("abbr");
    // 先判断文档中是否有缩略图, 查询一下 abbreviations 数组的 length 属性
    if(abbreviations.length < 1) return false;
    // 获取并保存每个 abbr 元素的属性
    var defs = new Array();

    /* 遍历这些缩略词 */
    for(var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];

        // 保证 displayAbbreviations 函数能在 IE 中能够平稳退化: 如果当前元素没有zijiedian, 就立刻开始下一次循环
        if(current_abbr.childNodes.length < 1) continue;    

        // 使用 getAttribute 方法得到 title 属性的值, 并把值保存到 变量
        var definition = current_abbr.getAttribute("title");
        // 拿到 缩略语文本, 需要 nodeValue 属性
        var key = current_abbr.lastChild.nodeValue;
        // 将缩略语以及解释保存到 defs 数组
        defs[key] = definition;
    }

    /* 创建定义列表 */
    var dlist = document.createElement("dl");
    // 使用 for/in 循环把某个数组下的 标(键) 临时赋值给一个变量
    for (key in defs) { // 对于 defs 关联数组里的每个键, 把它赋值给变量 key
        var definition = defs[key];
        
        // 每次循环都需要创建 dt & dd 
        /* 创建定义标题 */
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);    // 把文本节点添加到元素节点
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);

        /* 把它们添加到 定义列表 */
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;

    // 在 body 中插入这个 定义列表
    // 给它创建一个 标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);        // 将元素文本节点添加到元素节点
    document.body.appendChild(header);
    document.body.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);