const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session')
const path = require('path');
const passport = require('passport');
const config = require('./config/database');


// mongoose.connect('mongodb://localhost/express_blog');   // 连接的数据库根据自己创建的名字来 
mongoose.connect(config.database);   
let db = mongoose.connection;

const app = express();  // 生成一个实例

// express-session
app.use(session({
    // secret: 'keyboard cat',     // secret(秘密), 不能暴露出来
    secret: config.secret,  // 换成配置文件的内容
    resave: false,
    saveUninitialized: true
}));

// express-messages & connect-flash 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// body-parser 中间件导入
app.use(bodyParser.urlencoded({ extended: false }))
// 使用中间件导入静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 使用中间件导入, 然后执行一下 passport 本地策略的函数, 传入参数就行
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// 定义 logout 时, 需要使用的中间件变量
// 这个中间件访问任何请求, 都会先执行这个
app.get('*', function (req, res, next) {    
    res.locals.user = req.user || null;    // res.locals 是 Express 提供的, 可以定义一个变量
    next();     // 中间件需要加 next 
});

let Article = require('./models/article');  // 导入 article module 

db.once('open', function() {
    console.log("Connet succeed... emmmm");
});

// 连接出错了， 会打印出错误
db.on('err', function(err) {
    console.log(err);  
});

app.set('views', path.join(__dirname, 'views')); // 路径
app.set('view engine', 'pug');  // 设置模板引擎为 pug

// use artilces
let articles =  require('./routers/articles');
let users = require('./routers/users');

app.use('/articles', articles);
app.use('/users', users);

app.get('/', function(req, res) {
    // 当操作 Article model 的时候, 它会去操作数据库的的 articles(复数形式).
    // articles 是  Mongo 中自动转换的, 例如官网例子 Cat, 对应数据库中的 cats
    Article.find({}, function(err, articles) {
        // 渲染的是 articles 下面的 index.pug
        res.render('articles/index', {
            articles: articles
        });
    });
});

app.listen(5000, function() {
    console.log("running listen to port 5000");
});