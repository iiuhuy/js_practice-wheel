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