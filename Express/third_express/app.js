var express = require('express');
var todoController = require('./controllers/todoControllers');


var app = express();

app.set('view engine', 'ejs');  // 设置模板引擎

app.use(express.static('./public'));

// 引用 todoControllers
todoController(app);

app.listen(3000);

console.log("app.js running....  to port 3000");