let express = require('express');
let app = express();

let whitList = ['http://localhost:3000'];

// 中间件, 不要忘记加 next
app.use(function(req, res, next) {  
    // 取出源
    let origin = req.headers.origin;

    if(whitList.includes(origin)) {
        // 设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin', origin);
        // 设置请求头
        res.setHeader('Access-Control-Allow-Headers', 'name');
        // 给 PUT, 加允许的方法
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        // 设置允许携带 cookie 
        res.setHeader('Access-Control-Allow-Credentials', true);
        // 设置预检测 多久再发
        res.setHeader('Access-Control-Max-Age', 6);
        // 允许返回的头
        res.setHeader('Access-Control-Expose-Headers', 'name');

        if(req.method === 'OPTIONS'){
            res.end();  // OPTIONS 直接停掉, 不做任何处理
        }
    }

    // 中间价需要加 next
    next();
});

app.put('/getData', function (req, res, next) {  
    console.log(req.headers);
    res.setHeader('name', 'Wangjingze.'); 
    res.send("emmm,真的很香啊~");
});

app.get('/getData', function(req, res) { 
    console.log(req.headers);
    res.send("就是饿死, 也不会吃你饭一口。emmmm, 真香~");
});

app.use(express.static(__dirname));
app.listen(4000);
console.log("listening port 4000");