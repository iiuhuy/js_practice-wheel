# 记录一下小例程
实现一个简单的 TODO list:
- 
- 

## 进入目录
初始化项目:
```
nmp init
```
会生成一个 `package.json` 文件。

再下载一些会用到的包:
- `npm install --save express`  
    - express@4.16.3    
- `npm install ejs body-parser`         
    - ejs@2.6.1 模板引擎
    - body-paser@1.18.3  处理表单

## app.js
根目录下新增 app.js 文件, 写好基本的配置。

```js
var express = require('express');

var app = express();

app.set('view engine', 'ejs');  // 设置模板引擎

app.use(express.static('./public'));

app.listen(3000);

console.log("app.js running....  to port 3000");
```

### Controllers
路由模块, 实现 controllers 。

todoControllers.js:
```js
module.exports = function(app) {
    app.get('/todo', function(req, res) {

    });

    app.post('todo', function(req, res) {

    });

    // 删除一个项目的路由
    app.delete('todo', function(req, res) {

    });
}
```

app.js:
```js
var express = require('express');
var todoController = require('./controllers/todoControllers');


var app = express();

app.set('view engine', 'ejs');  // 设置模板引擎

app.use(express.static('./public'));

// 引用 todoControllers
todoController(app);

app.listen(3000);

console.log("app.js running....  to port 3000");
```

## 实现页面
还是使用模板引擎, 新增 views 目录。 创建 `todo.ejs` 模板引擎。

- 引入 jQuery 库, 可以在 https://www.bootcdn.cn/ 这个网站搜索一下。找到 jQuery, 复制进来！
- 引入本地的资源。链接本地资源的时候需要注意。
- 写好 html body 内容。进行 render 就可以了

todo.ejs:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <title>Todo list</title>
    <!-- 这里可以这么引入的原因是, app.js app.use(express.static('./public')); 指定了(中间件内容)-->
    <link rel="stylesheet" href="/assets/styles.css" type="text/css">
    <script src="/assets/todo-list.js"></script>
</head>
<body>
    <div id="todo-table">
        <form>
            <input type="text" name="item" placeholder="Add new item ..." required>
            <button type="submit">Add Item</button>
        </form>
        <ul>
            <li>项目 1</li>
            <li>项目 2</li>
            <li>项目 3</li>
        </ul>
    </div>
</body>
</html>
```

todoControllers.js:
```js
module.exports = function(app) {
    app.get('/todo', function(req, res) {
        res.render('todo');
    });

    app.post('todo', function(req, res) {

    });

    // 删除一个项目的路由
    app.delete('todo', function(req, res) {

    });
}
```

## 实现功能
额，首先在没有数据库的情况下。实现功能, 把数据存在内存中: 即可以创建一个数组, 从数组中取数据。
todoControllers.js:
```js
var data = [ {item: 'get milk'}, {item: 'walk dog'}, {item: 'coding'} ];
```

向数组中添加元素. data.push.

取出 post 数据的时候, 用到的库 `body-parser`. 

```js
var bodyParser = require('body-parser');

//  create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
```

最后的参考代码: 最好看一下本地的 todo-list.js 的实现

controllers/todoController.js:
```js
var bodyParser = require('body-parser');

//  create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = [ {item: 'get milk'}, {item: 'walk dog'}, {item: 'coding'} ];

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});      // todos: data 从 data 取数据进行渲染
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });

    // 删除一个项目的路由
    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.json(data);     // 响应内容还是 json 
    });
}
```

views/todo.ejs:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <title>Todo list</title>
    <!-- 这里可以这么引入的原因是, app.js app.use(express.static('./public')); 指定了(中间件内容)-->
    <link rel="stylesheet" href="/assets/styles.css" type="text/css">
    <script src="/assets/todo-list.js"></script>
</head>
<body>
    <div id="todo-table">
        <form>
            <input type="text" name="item" placeholder="Add new item ..." required>
            <button type="submit">Add Item</button>
        </form>
        <ul>
            <!-- <li>项目 1</li>
            <li>项目 2</li>
            <li>项目 3</li> -->
            <% todos.forEach(function(todo) { %>
                <li><%= todo.item %></li>
            <% }) %>
        </ul>
    </div>
</body>
</html>
```

这样就简单实现了从数组中读取内容。

## mongoDB 
以 JSON 的格式, 将数据存储在磁盘中。

- 节约学习成本, 使用 [mLab](https://mlab.com/)  需要自备梯子
    - 注册账号, 然后创建 new database 和在 Users 添加 database user
- 1.安装 [mongoose](https://github.com/Automattic/mongoose)
    ```
    npm install mongoose --save
    ```
    - mongoose@5.2.12
- 2.填入连接
    - mongoose.connect('mongodb://localhost/my_database');
    - 连接根据自己的用户的 database 用户填写
- 3.Defining a Model。 相当于创建数据库的表模板。

```js
var bodyParser = require('body-parser');

const mongoose = require('mongoose');   // 导入 mongoose 数据库

// mongoose.connect('mongodb://localhost/my_database'); // 然后连接
mongoose.connect('mongodb://alvinmi:alvinmi0620@ds239682.mlab.com:39682/express_study'); // 连接自己创建的地址

const todoSchema = new mongoose.Schema({
    item: String,
    // author: ObjectId,
    title: String,
    body: String,
    date: Date
});

// 定义一个 module
var Todo = mongoose.model('Todo', todoSchema); // 以刚才创建的 module 为例

var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
    if(err) throw err;
    console.log("item saved 已经保存了！！！");
});

//  create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = [ {item: 'get milk'}, {item: 'walk dog'}, {item: 'coding'} ];

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});      // todos: data 从 data 取数据进行渲染
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });

    // 删除一个项目的路由
    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.json(data);     // 响应内容还是 json 
    });
}
```

## 将数据存到 mogoodb 中

```js
var bodyParser = require('body-parser');

const mongoose = require('mongoose');   // 导入 mongoose 数据库

// mongoose.connect('mongodb://localhost/my_database'); // 然后连接
mongoose.connect('mongodb://alvinmi:alvinmi0620@ds239682.mlab.com:39682/express_study'); // 连接自己创建的地址

const todoSchema = new mongoose.Schema({
    item: String,
    // author: ObjectId,
    title: String,
    body: String,
    date: Date
});

// 定义一个 module
var Todo = mongoose.model('Todo', todoSchema); // 以刚才创建的 module 为例

// var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
//     if(err) throw err;
//     console.log("item saved 已经保存了！！！");
// });

//  create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var data = [ {item: 'get milk'}, {item: 'walk dog'}, {item: 'coding'} ];

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {todos: data});      // todos: data 从 data 取数据进行渲染
        });
    });

    // 可以参考上面屏蔽的 var itemOne 改成动态数据. 上面那个是写死了的
    app.post('/todo', urlencodedParser, function(req, res) {
        var itemOne = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);

            console.log("item saved 已经保存了！！！");
        });  
        // data.push(req.body);
    });

    // 删除一个项目的路由
    app.delete('/todo/:item', function(req, res) {
        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // 找到这条记录再删除掉, replace 里面 反过来操作
        Todo.find({item: req.params.item.replace(/-/g, " ")}).remove( function(err, data) { 
            if(err) throw err;
            res.json(data);     // 响应内容还是 json 
        });
    });
}
```

- 最后还有一个 [mongolass](https://github.com/mongolass/mongolass). 这个库操作也可以

