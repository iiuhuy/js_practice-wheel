let express = require('express');
let app = express();

// 使用中间件访问当前目录
app.use(express.static(__dirname));
app.listen(3000);
console.log("listening port 3000");