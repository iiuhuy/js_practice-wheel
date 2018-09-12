let express = require('express');
let app = express();    // 创建一个实例


app.get('/say', function (req, res) {  
    let {wd, cb} = req.query;
    console.log(wd);
    res.end(`${cb}('恩, 真香~')`);
});
app.listen(3000);