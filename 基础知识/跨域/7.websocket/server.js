let express = require('express');
let app = express();
let Websocket = require('ws');
let wss = new Websocket.Server({port:3000});    // 前面的请求端口是多少, 这里就是多少
// 安装 ws 包: npm install ws

wss.on('connection', function(ws) {  
    ws.on('message', function(data) {  
        console.log(data);
        // 服务器发给 web 端, 前端使用 socket.onmessage 接收
        ws.send("香个锤子....");
    })
})

console.log("running");
// app.listen(3000);
// console.log("listening to port 4000");