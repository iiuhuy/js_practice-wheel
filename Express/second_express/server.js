var express = require('express');
var bodyParser = require('body-parser');    // 导入body-parser
var fs = require('fs');     

var app = express();

app.set('view engine', 'ejs');      // 设置 ejs 模板引擎

var multer = require('multer');     // 导入 mutler, 这个是文件上传的组件. 还有 formidable

/* --- 单图 (不能改名字的))--- */
// var upload = multer({ dest: 'upload/' });     
// // 单图上传 
// app.get('/form', function(req, res) {
//     var form = fs.readFileSync('./form.html', {encoding: 'utf-8'});
//     res.send(form);
// });

// // 单图上传后, 把它放到 /upload 目录下, 
// app.post('/upload', upload.single('logo'), function(req, res) {
//     res.send({ 'res_code': 0 });    // 浏览器会看到返回 json 格式, 本地根目录下的 upload 目录下会多出文件, 名字是乱的
// });


/* --- 单图可以修改名字的(从文档复制过来) --- */
// 修改路径名参考: https://www.cnblogs.com/chyingp/p/express-multer-file-upload.html
// var createFolder = function(folder){
//     try{
//         fs.accessSync(folder); 
//     }catch(e){
//         fs.mkdirSync(folder);
//     }  
// };

// // 还是放在 upload 目录, 上传成功, 会生成 logo-xxxxxxxxx 文件
// var uploadFolder = './upload/';

// createFolder(uploadFolder);

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, uploadFolder)
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// 通过 storage 选项来对 上传行为 进行定制化
// var upload = multer({ storage: storage })

// app.get('/form', function(req, res) {
//     var form = fs.readFileSync('./form.html', {encoding: 'utf-8'});
//     res.send(form);
// });

// app.post('/upload', upload.single('logo'), function(req, res) {
//     res.send({ 'res_code': 0 });    // 浏览器会看到返回 json 格式, 本地根目录下的 upload 目录下会多出文件, 名字是乱的
// });


/* ------------------------------ 使用文件原文件的名字 -------------- */
// 通过 storage 选项来对 上传行为 进行定制化
// 最后在 Postman 中使用 post 试一下. 以为不行的, 折腾半天。 重启 Postman 重新上传就行了
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

// 还是放在 upload 目录, 上传成功, 会生成 logo-xxxxxxxxx 文件
var uploadFolder_one = './upload/';     

createFolder(uploadFolder_one);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder_one);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // 修改一下名字
    }   
});

var upload = multer({ storage: storage })

app.get('/form', function(req, res) {
    var form = fs.readFileSync('./form.html', {encoding: 'utf-8'});
    res.send(form);
});

app.post('/upload', upload.single('logo'), function(req, res) {
    console.dir(req.file);
    res.send({ 'res_code': 0 });    // 浏览器会看到返回 json 格式, 本地根目录下的 upload 目录下会多出文件, 名字是乱的
});



/* ----------------------- 多图上传 ------------------------ */
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

// 还是放在 upload 目录, 上传成功, 会生成 logo-xxxxxxxxx 文件
var uploadFolder = './uploads/';

createFolder(uploadFolder);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // 修改一下名字
    }   
});

// var upload = multer({ dest: 'uploads/' });       // 不对名字做处理
var upload = multer({ storage: storage })

app.get('/form', function(req, res, next) {
    var form = fs.readFileSync('./form.html', {encoding: 'utf-8'});
    res.send(form);
});

app.post('/uploads', upload.array('logo', 2), function(req, res, next) {
    res.send({ret_code: '0'});
});


/* ----------------------------- 模板引擎入门 -------------------------- */
app.get('/form/:name', function(req, res) {
    // var person = req.params.name;
    var data = {age: 18, job: 'Soft Engineer', hobbies:['eating', 'fighting']};
    res.render('form', {data: data});       // 第一个 person 是 ejs 里面的, 第二个是上面的变量 person
});

/* ----------------------------- 增加模板引擎 -------------------------- */
app.get('/about', function(req, res) {
    res.render('about');       // 第一个 person 是 ejs 里面的, 第二个是上面的变量 person
});




// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});


app.post('/', urlencodedParser, function(req, res) {
    console.dir(req.body);
    res.send(req.body.name);
});

app.get('/profile/:id/user/:name', function(req, res) {
    console.dir(req.params);
    res.send("You requested to see a profile with the name of " + req.params.name);
});

app.get('/ab?cd', function(req, res) {
    res.send('/ab?cd');
})



app.listen(3000);
console.log('listening to port 3000');