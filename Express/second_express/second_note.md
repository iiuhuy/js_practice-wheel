# Express

## 资源
- http://expressjs.com/
- https://github.com/expressjs/express
- https://github.com/hfpp2012/hello-nodejs

自己总结：
- 是一个简单的路由系统, 写一些路由比较简单，清晰好维护。
- 集成了很多模板引擎
- 中间件系统


## 创建项目
```
npm init
```
然后回车。

```
npm install express --save  
```

在入口文件 `server.js` 写入代码:
```js
var express = require('express');

var app =  express();

app.get('/', function(req, res) {
    res.send('this is the homepage');
});

app.listen(3000);
```
然后运行, 运行前，先安装一个模块。 (可能需要 sudo)
```
npm install -g nodemon 
```
-g 是全局性的安装。

安装完成后执行: 

```
nodemon 
```

它回去找到你自己的入口文件, 这里以 server.js 为例。

然后在浏览器中打开 `localhost:3000`， 就会显示相应的内容。

app.get() 匹配的是路由的路径, 和浏览器的路径一样。

### 查询字符串
例如, 在浏览器中输入, 相应的 ?find=xxx 然后取出这个值。
```js
// 取出目录下, 问号后面的参数
app.get('/', function(req, res) {
    console.dir(req.query);
    // find 自定义的名称
    res.send("Home page: " + req.query.find); 
});
```

### 处理 POST 请求
POST 请求一般用到表单, 这里不使用表单, 使用 [body-parser](https://github.com/expressjs/body-parser)来模拟。

首先安装: 
```
npm install body-parser --save
```
`+ body-parser@1.18.3` 安装成功。

在最下面有一个 example, 写好 demo 过后, 怎么模拟一个 POST 请求呢？ 
- 使用 Chrome 插件 Postman 
对应的获取表单的代码, 在 Postman 里面输入 key-value。 注意输入的时不要有其他字符, 例如空格。
```js
// 获取表单的数据
app.post('/', function(req, res) {
    console.dir(req.body);
    res.send(req.body.name );
    // res.send(req.body.name);
});
```

####　处理　JSON　的数据
参考文档：
```js
// create application/json parser
var jsonParser = bodyParser.json()

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
})
```

### 怎么处理文件的上传？ 
参考资源：
- https://www.npmjs.com/package/multer
- https://github.com/richardgirges/express-fileupload     这个库也是很不错的.
- https://www.cnblogs.com/chyingp/p/express-multer-file-upload.html   参考一下这篇文章。(这个博客以及 github 可以好好看一下)
在 HTML 中添加表单, 然后在 `server.js` 中添加表单路由。

需添加 `fs` 模块。
简单的 html 入下:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Express_form</title>
</head>
<body>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <h2>图上传</h2>
        <input type="file" name="logo">
        <input type="submit" value="提交" >
    </form>
</body>
</html>
```

`server.js` 写好路由 res , 还需要处理 POST, 处理 PSOT 需要用到一个模块(库) [multer](https://www.npmjs.com/package/multer)， 它处理文件上传的。
- 安装 `npm install --save multer`
- 用法 :
    ```js
    var multer  = require('multer')
    var upload = multer({ dest: 'uploads/' })
    ```

```js
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


app.listen(3000);
console.log("listening to port 3000");
```

## 使用模板引擎
Express 中使用模板引擎, 模板引擎有很多, 这里以 EJS 为例：

```
npm install ejs --save
```

```js
app.set('view engine', 'ejs');
```

然后在项目目录下新建一个目录`views`, 在 views 里面创建 `form.ejs`, 将之前的 `form.html` 复制进来。
```html
<!-- form.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Express_form</title>
</head>
<body>
    <h1>
        <%= person %>
    </h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <h2>图上传</h2>
        <input type="file" name="logo">
        <input type="submit" value="提交表单一" >
    </form>
</form>
</body>
</html>
```

```js
// <!-- server.js -->
app.set('view engine', 'ejs');      // 设置 ejs 模板引擎, 其他模板引擎, 例如 pug 的写法和 HTML 有点区别

app.get('/form/:name', function(req, res) {
    var person = req.params.name;
    // res.sendFile(__dirname + './form.html');
    res.render('form', {person: person});       // 第一个 person 是 ejs 里面的, 第二个是上面的变量 person
});
```

模板引擎的作用, 主要嵌入动态的数据。

### 进一步使用模板引擎
例如在 js 中声明一个对象, 在模板引擎中怎么取呢？

```js
// <!-- server.js -->
app.set('view engine', 'ejs');      // 设置 ejs 模板引擎, 其他模板引擎, 例如 pug 的写法和 HTML 有点区别

app.get('/form/:name', function(req, res) {
    var data = {age: 18, job: 'Soft Engineer', hobbies:['eating', 'fighting']};
    res.render('form', {person: person});       // 第一个 person 是 ejs 里面的, 第二个是上面的变量 person
});
```
在模板引擎里:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Express_form</title>
</head>
<body>
    <h1>
        <%= data.age %>
        <%= data.job %>
        <h2>hobbies</h2>
        <ul>
            <% data.hobbies.forEach(function(item) { %>
                <li><%= item %></li>
            <% }) %>
        </ul>     
    </h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <h2>图上传</h2>
        <input type="file" name="logo">
        <input type="submit" value="提交表单一" >
    </form>
</form>
</body>
</html>
```
在 ejs 模板里面, 使用 ul，遍历出数组的数据, 这样的方式是经常用到的。

### 模板公用的问题
例如网站的导航条, 很多时候是公用不变的, 不用每次每个页面都去写, 那么这个时候就用到了 **模板公用** 的问题。相同的部分, 作为一个模板!

在之前的 views 目录下, 新建一个 partials 目录, 再建一个 `header.ejs` 模板引擎, 然后导入以下代码:

```js
<nav>
    <ul>
        <li><a href="">home</a></li>
        <li><a href="">about</a></li>
    </ul>
</nav>
```

在 `server.js` 写好 app.get 方法:
```js
app.get('/about', function(req, res) {
    res.render('about');       // 第一个 person 是 ejs 里面的, 第二个是上面的变量 person
});
```

在 views 目录下新建 `about.ejs` 模板引擎. 现在就有这样的一个目录:

```
views
├── about.ejs
├── form.ejs
└── partials
    └── header.ejs
```

那么 about、form 怎么来公用这个 header 模板呢？ 
只需要这样引用, 官方的文档一般都会给出例程:
```
<%- include('partials/header.ejs') -%>
```
最后的模板如下:
```js
// <!-- form.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Express_form</title>
</head>
<body>
    <%- include('partials/header.ejs') -%>
    <h1>
        <%= data.age %>
        <%= data.job %>
        <h2>hobbies</h2>
        <ul>
            <% data.hobbies.forEach(function(item) { %>
                <li><%= item %></li>
            <% }) %>
        </ul>     
    </h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <h2>图上传</h2>
        <input type="file" name="logo">
        <input type="submit" value="提交表单一" >
    </form>
</form>
</body>
</html>
```

about 模板引擎:
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <%- include('partials/header.ejs') -%>
    <p>about 模板引擎</p>
</body>
</html>
```

header.ejs 模板引擎:
```js
<nav>
    <ul>
        <li><a href="">home</a></li>
        <li><a href="">about</a></li>
    </ul>
</nav>
```

## 中间件 middleware
一个请求发送到服务器后，它的生命周期是 先收到 request（请求），然后服务端处理，处理完了以后发送 response（响应）回去
参考　`server2.js`

- 中间的传递
- 中间件的执行顺序
- 内置的中间件(静态文件), 放到 public 中, 新增一个 public 目录。里面放置一个文件, 再浏览器 `localhost:3000` 后面输入这个名字就能访问。
    - 然后里面可以再新建目录和文件, 一样输入名字就能访问。


## 路由中间件
很类管理路由
在根目录下, 新建一个 `routes` 目录, 新增 index.js, 和 user.js ,在 server3.js (在根目录中新建) 中引入.

users.js:
```js
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('users');
});

module.exports = router;
```

index.js:
```js
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("root");
});

module.exports = router;
```

server3.js:
```js
var express = require('express');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000);
console.log('listening to port 3000');
```


