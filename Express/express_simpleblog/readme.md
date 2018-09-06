# express 多博客系统搭建
学习:
- 多博客用户系统的原理
- 后端的 Nodejs & express
- pug 模板引擎
- passport 认证系统
- mongodb
- bower 管理前端
- cookies 操作
- express-messages && express-session && express-validator && connect-flash
- and so on ...

## 适合人群
- 刚开始学 nodejs 的小朋友
- 计划与安排
    - 小商城系统
开始趴..... emmm

## 老规矩
- npm init  生成 package.json 或者使用 `npm init -y` 就不用手动回车了
- npm install express --save 
    - express@4.16.3
- npm install nodemon --save-dev
    - nodemon@1.18.4

- 创建 app.js 应用程序(入口文件)

## pug 模板引擎
- https://github.com/pugjs/pug 
- npm install pug --save
    - pug@2.0.3
- 使用参考: https://pugjs.org/language/includes.html
- 设置 pug 引擎和路径, 并且创建 views 目录, 目录里面创建 index.pug 模板文件
     

## 在本地中安装 MongoDB 
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

安装方式一：(使用 .deb 包安装, 推荐)
- 1.导入系统管理公钥:
    ```
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
    ```
- 2.创建一个列表文件: ubuntu16.04
    ```
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
    ```
- 3.`sudo apt-get update`
- 4.安装最新版本, 指定版本参考官网安装链接
    ```
    sudo apt-get install -y mongodb-org
    ```
### 启动 MongoDB (Ubuntu 16.04)
不同操作系统, 应该是不一样的命令
- Start MongoDB
    ```
    sudo service mongod start
    ```
- Stop MongoDB：
    ```
    Stop MongoDB
    ```
- Restart MongoDB
    ```
    sudo service mongod restart
    ```

mongo 进入 数据库命令行:
- show dbs;  查看本地的数据库

### 如何创建自己的数据库？
- 1.数据库名字: 
    - use express_blog
- 2.创建数据库表
    - db.createCollection('articles')
    - 查看数据库的中的表: `show collections;`
- 3.创建一条数据库记录:
    - db.articles.insert({ title: "Article 1", author: "alvinmi", body: "this is one!"});
    - 查看插入的记录: `db.articles.find();`
    - 使用好看的格式查看: `db.articles.find().pretty();`

或者使用一个库使客户端命令行高亮:
- https://github.com/TylerBrock/mongo-hacker
- http://tylerbrock.github.io/mongo-hacker/
- npm install -g mongo-hacker 试着安装了一下, 但好像没成功。
- 然后使用源码安装成功了。

### 使用 mongoose 库
- https://github.com/Automattic/mongoose
- npm install mongoose
- 具体学习怎么看文档
这里简单学习 nodejs 把库连接起来, 将数据读取出来。

在 app.js 导入
- 连接数据库已经成功.
- 也可以从数据库中读取数据。(注意 mongo 中的 model 在数据库是 复数形式)
样例看具体的例子。

## 创建一篇文章
- 安装解析读取内容的库.
    - `npm install body-parser --save`
    - body-parser@1.18.3
    - 安装完成, 导入. 然后使用中间件的形式把它使用起来(官方文档)
    - 然后就能读取到数据: 现在需要在 post 中提交到数据库
    - 目前, 已经能实现, 与数据库进行连接, 并且创建新的文章提交到数据库, 但样式还很粗糙。 

## 引入 bootstrap 
使用 bower 来管理 bootstrap 和 jQuery 
- 新增目录放静态文件 public，该文件可以包含：html,css,js,png,jpg,etc...

使用 bower 工具来管理静态文件:
- https://bower.io/ 和 npm 很像, 只是 bower 倾向于前端样式的库.
    - npm 是安装在 `node_modules` 目录下的
    - bower 则是在 `bower_components/` 目录下的.
- npm install -g bower
- npm install bower --save
    - bower@1.8.4
- 怎么用呢？ 
    - 在项目的根目录下新增一个 `.bowerrc` 的配置文件。
    ```json
    {
        "directory": "public/bower_components"
    }
    ```
    这样就把安装的包, 放到了 public 目录下。
    - 试着安装一下: `bower install bootstrap`
    我安装的时候出错了:
    ```
    express_simpleblog $ bower install bootstrap
    /usr/lib/node_modules/bower/lib/node_modules/configstore/index.js:54
                                    throw err;
                                    ^
    Error: EACCES: permission denied, open '/home/alvinmi/.config/configstore/bower-github.json'
    You don't have access to this file.
    ```

    解决方法, 网上搜一下:
    ```bash
    sudo chown -R $USER:$GROUP ~/.npm
    sudo chown -R $USER:$GROUP ~/.config
    ```
    ok, 重新安装之后, 下载 bootstrap 。
    - bootstrap#4.1.3 public/bower_components/bootstrap
- 在 layout.pug 中使用:
    - 可以在 bootstrap 官网找到相关的样式, 使用 [htmltojade](https://html2jade.org/) 进行转换
    - 导入 script 静态资源。
    - bower install jquery 并导入
    - 在浏览器中刷新并查看源码是否能访问资源。

## 显示文章的内容
- 在 pug 中做 a 标签,  使得可以点击。
- 点击后写 get 的路由, 获取 id 的记录, 看看能不能拿到, 拿到写 render, 然后写页面就行了。
- 在写页面, show.pug 

## 修该文章的内容
添加加两个按钮(show.pug)

- 点击 `Edit` 按钮, 后跳转的路由和页面要写出来.
    - `a.btn.btn-primary(href="/articles/" + article.id + "/edit") Edit`  创建 Edit 按钮
    - 在 app.js 中添加 Edit 的 get 路由.
    - 在页面出来后, 原有的内容没有. 所以还要给 HTML 设置 value 值
        - value=article.title
        - value=article.author
        - value=article.body
    - app.post 和之前的 create 很类似(注意 id 顺序)

- 删除
    - `a.btn.btn-danger.delete-article(href="#", data-id=article._id ) Delate` 使用 jQuery 来动态获取 data-id 的内容 
    - 做删除的动作, 不能跳转, 不能说用 get 方法, 跳转到一个页面来删除, 这样是不安全的。 删除有个删除的方法 delate, 也不用 post 方法。使用 jQuery 来提交。 发送 ajax 请求.      
    - 在 public 目录下, 创建 css、js 目录, 分别存放 style.css 和 mian.js 文件。
    - 引入 css 代码和 js 代码. 和之前一样, 在 layout.pug 中引入.
    - 引入 jQuery 的时候, 需要注意先后顺序。
    - 在 jQuery 中获取 id 参数, 利用 ajax 发出 delete 请求, 在服务端查询这个 id 参数就删除。

## 显示 flash 信息
- 使用 express-session 来实现
- https://github.com/expressjs/session
- 安装:
  ```
  npm install express-session --save
  ```
  - express-session@1.15.6
- 带入进 app.js, 然后使用中间件(app.use)的形式来使用就行了.
- 实现 flash 可以使用一个库来解决: [express-messages](https://github.com/expressjs/express-messages) 而 express-messages 还要安装 [connect-flash](https://github.com/jaredhanson/connect-flash), 那就一起安装吧。
- `npm install express-messages connect-flash --save`
    - express-messages#1.0.1
    - connect-flash@0.1.1
- 在 views 目录下, 新建一个文件 message.pug 来显示 flash 信息。
  ```pug
  .messages
  each type in Object.keys(messages)
    ul(class="#{type}")
      each message in messages[type]
        li= message  
  ```
  怎么调用呢？ 文档中有:Call the message template(调用 message 模板)

  ```jade
  != messages('my_message_template', locals)
  ```
  我们在 layout.pug 中, 放在 `.container` 下面:
  ```jade
  != messages('message', locals)
  ```
- 然后添加信息, 在 app.js 中, 在添加文件
  ```js
  app.post('/articles/create', function(req, res) {
    // console.log(req.body);
    let article = new Article(req.body);

    // 这三行直接可以放在参数里面, 当做对象传递
    // article.title = req.body.title;
    // article.author = req.body.author;
    // article.body = req.body.body;

    // 怎么保存到数据库？ 之前操作过, 是 .save(), 即接个回调函数
    article.save(function(err) {
        if(err) {
            console.log(err);
            return;
        } else {
            req.flash("success..", "Article Add!");
            res.redirect('/');      // 跳转到首页
        }
    }); 
  });
  ```
  修改一下样式 message.pug 中修改:
  ```pug
  .messages
  each type in Object.keys(messages)
    each message in messages[type]
      div(class="alert alert-" + type) #{message}
  ```

## 表单验证
- 使用[express-validator](https://github.com/express-validator/express-validator)库来验证.
- https://express-validator.github.io/docs/
- 安装: `npm install express-validator --save`
    - express-validator@5.3.0
- 导入:
    - `const { check, validationResult } = require('express-validator/check');`
    - 在 app.post('/articles/create') 函数中添加第二个参数为数组。
    ```js
    // 提交到数据库, 创建操作
    app.post('/articles/create', [
        // 根据文档在数组中添加
        // check('title').isEmail(),
        check('title').isLength({min: 1}).withMessage("Title 不能为空"),
        check('author').isLength({min: 1}).withMessage("Author 不能为空"),
        check('body').isLength({min: 1}).withMessage("Body 不能为空"),
    ], function(req, res) {
        // 捕获一下, 然互再进行判断是否为空.
        const errors = validationResult(req);
        // 判断一下 errors 是不是为空的, 如果不为空的话将 errors.array 显示出来
        if (!errors.isEmpty()) {
            // console.log(errors.array());
            res.render('new', {
                title: 'Add Article',
                errors: errors.array()
            });
        } else {
            let article = new Article(req.body);
            // 怎么保存到数据库？ 之前操作过, 是 .save(), 即接个回调函数
            article.save(function(err) {
                if(err) {
                    console.log(err);
                    return;
                } else {
                    req.flash("success", "添加成功!");
                    res.redirect('/');      // 跳转到首页
                }
            }); 
        }  
    });
    ```

## 代码重构
使用路由中间件重构代码:
在入口文件 `app.js` 中, 有很多代码, 目前将要把 `articles` 相关的代码放到另外的文件. 前面已经接触到了路由中间件.

- 首先新建一个文件夹 `routes`, 在里面创建一个 `articles.js` 
- 将 `app.js` 中 articles 相关的代码移到 `articles.js` 中, 改为:
    ```js
    router.get('/', function(req, res) {
        // 当操作 Article model 的时候, 它会去操作数据库的的 articles(复数形式).
        // articles 是  Mongo 中自动转换的, 例如官网例子 Cat, 对应数据库中的 cats
        Article.find({}, function(err, articles) {
            res.render('index', {
                articles: articles
            });
        });
    });

    // new.pug 的路由
    router.get('/articles/new', function(req, res) {
        res.render('new', {
            title: "Add Article"
        });
    });

    // 文章点击后的路由: show.pug
    router.get('/articles/:id', function(req, res) {
        // 这 id 是动态的, 代表查询的参数。 在数据中找到, 然后显示出来
        // err: 错误。   
        // article: 找到一个记录
        Article.findById(req.params.id, function(err, article) {
            res.render('show', {
                article: article    
            });
        });
    });

    // Edit 的路由
    router.get('/articles/:id/edit', function(req, res) {
        // err: 错误。   
        // article: 找到一个记录
        Article.findById(req.params.id, function(err, article) {
            // 创建 edit.pug
            res.render('edit', {
                title: "Edit Article",
                article: article
            });
        });
    });

    // 提交到数据库, 创建操作
    router.post('/articles/create', [
        // 根据文档在数组中添加
        // check('title').isEmail(),
        check('title').isLength({min: 1}).withMessage("Title 不能为空"),
        check('author').isLength({min: 1}).withMessage("Author 不能为空"),
        check('body').isLength({min: 1}).withMessage("Body 不能为空"),
    ], function(req, res) {
        // 捕获一下, 然互再进行判断是否为空.
        const errors = validationResult(req);
        // 判断一下 errors 是不是为空的, 如果不为空的话将 errors.array 显示出来
        if (!errors.isEmpty()) {
            // console.log(errors.array());
            res.render('new', {
                title: 'Add Article',
                errors: errors.array()
            });
        } else {
            let article = new Article(req.body);
            // 怎么保存到数据库？ 之前操作过, 是 .save(), 即接个回调函数
            article.save(function(err) {
                if(err) {
                    console.log(err);
                    return;
                } else {
                    req.flash("success", "添加成功!");
                    res.redirect('/');      // 跳转到首页
                }
            }); 
        }  
    });

    // 提交到数据库, 更新操作.和上面的创建操作有点不一样
    router.post('/articles/update/:id', function(req, res) {
        // 原有的文章, 需要查出来, 再来更新.
        let query = { _id: req.params.id };     

        Article.update(query, req.body, function(err) {
            if(err) {
                console.log(err);
                return;
            } else {
                req.flash("success", "Article Update");
                res.redirect('/');      // 跳转到首页
            }
        }); 
    });

    // Delete, 使用 jquery 来获取 id 参数, 然后发出 delete 请求, express 获取 id， 然后删除
    router.delete('/articles/:id', function(req, res) {
        let query = { _id: req.params.id };

        Article.remove(query, function(err) {
            if(err) {
                console.log(err);   
            }
            res.send("remove success...");
        });
    });
    ```
- 然后在 `app.js` 引入. (最后参考例程的代码)
- views 相关的也在 views 下面新建一个 `articles` 文件夹, 将相应的文件移进去。 render 的时候加上前缀。

## 显示注册用户的表单
- 新建 models `user.js`, copy 之前的 `article.js` 修改即可。
- 在 app.js 中导入:
  ```js
  let users = require('./routers/users');
  app.use('/users', users);
  ```
- 在 routers 目录下, 新建 users.js 路由, 声明模板文件:
  ```js
  const express = require('express');

  let router = express.Router();

  // 路由, 声明模板文件
  router.get('/register', function(req, res) {
      res.render('users/register');

  });

  module.exports = router;
  ```
- 新的 views 文件夹 `users`, 存放 `register.pug`, 复制 `new.pug` 中的内容修改。
    ```jade
    extends ../layout

    block content
        h1 Register 
        form(method="post", action="/users/register")
            .form-group
                label Name:
                input.form-control(name="name", type="text")
            .form-group 
                label Email:
                input.form-control(name="email", type="text")
            .form-group
                label Username:
                input.form-control(name="username", type="text")
            .form-group
                label Password:
                input.form-control(name="password", type="password")    
            .form-group
                label Password Confirmation:
                input.form-control(name="password_confirmation", type="password")  
            br
            input.btn.btn-primary(type="submit", value="Submit")
    ```

## 注册页面表单验证
根据之前 `articles.js` 的 router.post('/register') 修改, 已经实现添加 User 成功, 但是验证还少一些内容:
- 邮箱的验证, 验证是邮箱格式的。 去官网看文档, 有个 email 的, 使用 `isEmail()` 也是挺简单的。
- 再来就是两个密码是要相等的:
    - 参考 https://stackoverflow.com/questions/46011563/access-request-body-in-check-function-of-express-validator-v4
    有这样一份代码:
    ```js
    router.post(
    "/submit",
    [
    // Check validity
    check("email", "Invalid email").isEmail(),
    check("password", "invalid password")
        .isLength({ min: 4 })
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.confirmPassword) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
    ],
    (req, res, next) => {
        // return validation results
        const errors = validationResult(req);

        // do stuff 
    });
    ```
    copy 其中的 check("password") 这段, 修改一下。
这样就实现了表单验证的效果。

## 注册页面密码加密保存到数据库
- 用到一个库 [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)
- 安装:`npm install bcrypt --save`.
    - bcrypt@3.0.0
- 导入:`const bcrypt = require('bcrypt');`
- 哈希密码:
    ```js
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash {
        // Store hash in your password DB.
        });
    });
    ```
- 首先将 user 放到一个 model 中, 然后对秘密进行加密, 将加密后的密码放到 `password` 中, 最后保存。
- 去数据库查看是否有保存的加密记录。 进入数据库, 使用 `db.users.dind()` 即可查看:
```
{
  "_id": ObjectId("5b8f494ecb21611a849da7ce"),
  "name": "alvinmi",
  "email": "854328319@qq.com",
  "username": "alvinmi",
  "password": "$2b$10$8RffGPLXHA6ZJ1dMAqOhwe2sro1aWBZlv655466Js0L2NFgrVZaKO",
  "__v": 0
}
```
可见是有加密的数据记录的, 表示已经完成。     

## 登录
前面的注册页面已经完成； 现在写出登录页面, 只需要定义一个路由, 渲染一个模板就好了。
- app.get('/login')
- 模板放到 views/users 下面, login.pug. 还是类似的修改一下, 就能出来了。
- 将登录按钮设置到导航条上来:
    ```
    ul.navbar-nav.narbar-right
      li.nav-item
        a.nav-link(href='/users/register') Register
      li.nav-item
        a.nav-link(href='/users/login') Login  
    ```
    就能将导航条加到右上角去
- 登录点击 Submit 之后的路由:
    - 关于 cookie & session 相关的知识.
    - HTTP 协议是无状态协议, 每两个请求之间, 是没有联系的, 根本不能标记为同一个用户在发送请求, 它最多记录的就是同一个 ip     
    - 如何标记为同一个用户呢？
    - 使用浏览器的数据库功能.   
        - Local Storage
        - Cookies

## 登录认证工具 Passport
- [Passport](https://github.com/jaredhanson/passport) 是很强大的.
- 提供了很多的策略, 官网给出的是 500+ ， 什么是策略呢？ 例如在其他的网站上需要登录, 可以使用 github 账号登录这是一种策略, 使用 账号密码登录, 是一种策略。
- 这里使用本地策略, 即用户名和密码的策略。
- 官方文档, 主要看 Authenticate(认证)、Configure(配置)、Username & Password、Log In、Log Out.

### github 文档
- 安装`npm install passport --save`
- Usage: 
    - 第一步, 指定使用什么策略, 用户名密码, 数据库对用户进行查找, 匹配密码。
    - 第二步, session, 可以存储一些数据的, 也可以存储在很多地方的。 序列化与反序列化的过程(就是数据传输的时候， 这个数据是怎么存储的。)例如储存一个 user.id， 登录之后把 user.id 存储起来, 以后就用这个 id 作为传输标识, 解析的话就在数据库中去查找。
    - 第三步, 中间件(Middleware)
    - 第四步, 在路由中添加 Passport,  

#### 安装本地策略(passport local)
- npm install passport-local --save
    - passport-local@1.0.0
- 将 `passport.js` 抽出来, 放到 `config` 目录下, 当然也可以直接放在 app.js 中。最好还是分别整理, 步骤和上面的流程一样. 具体参考代码。

- 使用 css 样式美化一下, message 提示。
    - 在 layout.pug 是引入的 css 文件, 在 `public/css/style.css` 文件中新增样式:
    ```css
    .alert-error {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }

    .alert-success_msg {
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
    }
    ```

还有登录成功也需要消息提示. 在文档中有, 在 users.js `router.post` 回调函数中加入就行了。

关于项目中 `config` 目录下放置配置文件, 可以放置很多的配置文件, 例如数据库的地址、还有 secret key 内容。可以将他们抽出来放到 `database.js` 

## 注销的效果
首先需要显示注销的按钮, 注销按钮需要判断, 要登录后才能显示. 判断的条件是什么？

需要使用个中间件, 定义一个变量, 由 Express 提供。

在 `layout.pug` 中进行判断:
```
ul.navbar-nav.narbar-right
  if user
    li.nav-item
      a.nav-link(href='/users/logout') Logout 
  else 
    li.nav-item
      a.nav-link(href='/users/register') Register 
    li.nav-item
      a.nav-link(href='/users/login') Login  
```

实现退出的逻辑: `users.js`
```js
// logout 逻辑
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');  // 退出后去到登录页面
});
```

## 权限认证问题
结合 article.
### 需求1:
- 在用户没有登录的时候, add article 中是不能添加的, 在用户登录之后, add article 中的 author 就不用填写了, 默认就当前用户。

- 在 views 目录下, new.pug 里的 author 给删除。
- 在 routers 目录下, articles.js 中, `router.post('/create')` 函数中的 author 也删掉。
- 在使用这个 `article.author = req.user._id;` 之后, 用户登录之后天剑文章, 这个时候显示的是用户的 id，我们使它显示成用户名。在 `router.get('/:id')` 中:
```js
// 文章点击后的路由: show.pug
router.get('/:id', function(req, res) {
    // 这 id 是动态的, 代表查询的参数。 在数据中找到, 然后显示出来
    // err: 错误。   
    // article: 找到一个记录
    Article.findById(req.params.id, function(err, article) {
        User.findById(article.author, function (err, user) {  
            res.render('articles/show', {
                article: article,
                author: user.name,    
            });
        })
    });
});
```
### 需求2:
- 在用户么有登录的时候, `Add Article` 按钮是不显示出来的, 在 `layout.pug` 中加一个判断:
```
if user
  li.nav-item
    a.nav-link(href='/articles/new') Add Articles
```

- 这样按钮是可以了, 但是还是能通过路由来添加文章, http://localhost:5000/articles/new 。 这个就要进行权限的验证了, 如何控制？
在 `articles.js` 中写一个中间件来控制它, 然后将这个中间件放到 new、edit 的函数中。

### 需求3:
- 另一个用户不能修改和删除当前用户的文章。 (例如目前是可以注册另一个用户访问当前用户的文章, 并进行编辑和删除。) 这样不行, 需要进行限制它。按钮也不能看到！

- 在 show.pug 中进行判断:
```
if user && user.id == article.author  
  a.btn.btn-primary.mr-2(href="/articles/" + article.id + "/edit") Modify
  //- 可以使用 jQuery 来获取下面动态 data-id 的内容
  a.btn.btn-danger.delete-article(href="#", data-id=article._id ) Delate 
```
这样虽然按钮不见了, 但是还是和之前一样. 可以通过地址来访问它。

在 `articles.js` 中, 在 `router.get('/:id/edit', ,)` 中进行判断一下当前用户和文章作者的用户是否相等。相等则可以编辑, 不相等就跳转。
```js
// Edit 的路由
router.get('/:id/edit', ensureAuthenticated, function(req, res) {
    // err: 错误。   
    // article: 找到一个记录
    Article.findById(req.params.id, function(err, article) {
        // 创建 edit.pug
        if(article.author != req.user._id) {    // 如果不相等则跳转
            req.flash('danger', '不是作者本人');
            return res.redirect('/');

        }
        res.render('articles/edit', {
            title: "Edit Article",
            article: article
        });
    });
});
```

删除按钮同理:
```js
// Delete, 使用 jquery 来获取 id 参数, 然后发出 delete 请求, express 获取 id， 然后删除
router.delete('/:id', function(req, res) {
    // 删除中也需要处理用户不同时候的权限问题
    if(!req.user._id) {
        return res.status(500).send();  // 返回一个 500 的错误
    }

    let query = { _id: req.params.id };

    Article.findById(req.params.id, function (err, article) {  
        if(article.author != req.user._id) {    // 如果不相等的时候, 返回一个 500 的错误
            return res.status(500).send();  
        } else {
            Article.remove(query, function(err) {
                if(err) {
                    console.log(err);   
                }
                res.send("remove success...");
            });           
        }
    })
});
```
