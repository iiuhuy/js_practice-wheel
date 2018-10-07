function getNewContent() {
    var request = getHTTPObject();
    if(request) {
        request.open("GET","example.txt", true);
        // 事件处理函数, 在服务器给 XMLHttpReact 对象送回响应的时候被触发执行
        request.onreadystatechange = function () {  
            // 处理响应
            // readyState 有 5 个可能的值.
            if(request.readyState == 4) {
                alert("Response Received!");
                var para = document.createElement("p");
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById('new').appendChild(para);
            }
        };
        // 发送请求
        request.send(null);
    } else {
        alert("Sorry! your browser doesn\'t suppot XMLHttpRequest");
    }
    alert("Function Done");
}
addLoadEvent(getNewContent);

