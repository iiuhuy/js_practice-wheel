var express = require('express');

var app = express();

app.use(express.static('public'));      // 如何访问, 直接在浏览器中输入名字就能访问
// 可以带路由的访问
app.use('/assets', express.static('public')); // 浏览器访问的时候需要加, /assets 前缀访问

app.use(function(req, res, next) {
    console.log("first middleware");
    next();         // 必须要使用　next 传递给下一个中间件
    console.log("first middleware after")
});

app.use('/home', function(req, res, next) {
    console.log("second middleware");
    res.send('OK');
    // next();
});
// 这个路由的处理, 可以直接放在 app.use 中间中处理
// app.get('/', function(req, res, next) {
//     res.send("OK");
// });


app.listen(3000);
console.log('listening to port 3000');