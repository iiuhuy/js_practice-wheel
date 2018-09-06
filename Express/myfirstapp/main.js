var express = require('express');
var randomInt = require('./random-Integer');

var app = express();

const fs = require('fs');


app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, function() {
    console.log('Exress Listening on port 3000');
});




// 进行测试自己写的随机函数
console.log(randomInt()); 
console.log(randomInt()); 
console.log(randomInt()); 
console.log(randomInt()); 


