function displayCitations() {
    // 1.找到这个文档中的 blockquote 元素, 遍历出来
    var quotes = document.getElementsByTagName("blockquote");
    for(var i = 0; i < quotes.length; i++) {
        // 只有当 blockquote 元素有 cite 属性才执行
        if(!quotes[i].getAttribute("cite")) continue;   

        // 2.得到当前 blockquote 元素的 cite 属性
        var url = quotes[i].getAttribute("cite");
        // 返回所有的元素
        var quoteChildren = quotes[i].getElementsByTagName('*');
        // 找到最后一个元素节点
        if(quoteChildren.length < 1) continue;
        var elem = quoteChildren[quoteChildren.length - 1];
        /* 上面已经把创建一个链接所需要的东西准备好了。 
         *      url 包含了将成为那个链接的 href 属性值的字符串.
         *      elem 包含将成为那个链接在文档中插入位置的节点.
        */
    }

    // 3.创建新链接, 标识文本为 source 
    var link = document.createElement("a");
    var link_text = document.createTextNode("source");
    link.appendChild(link_text);
    link.setAttribute("href", url);

    // 插入链接
    var superscript = document.createElement("sup");
    // 把新连接放入 sup 元素
    superscript.appendChild(link);
    // 追加到 blockquote 元素的最后一个元素节点
    elem.appendChild(superscript);
}

addLoadEvent(displayCitations);