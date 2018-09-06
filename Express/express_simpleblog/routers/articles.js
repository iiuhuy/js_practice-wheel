// import express from 'express';   // 这里没有用到 ES6 语法
const express = require('express');
const { check, validationResult } = require('express-validator/check');


let router = express.Router();
let Article = require('../models/article');  // 导入 article module 
let User = require('../models/user');

router.get('/', function(req, res) {
    // 当操作 Article model 的时候, 它会去操作数据库的的 articles(复数形式).
    // articles 是  Mongo 中自动转换的, 例如官网例子 Cat, 对应数据库中的 cats
    Article.find({}, function(err, articles) {
        res.render('articles/index', {
            articles: articles
        });
    });
});

// new.pug 的路由
router.get('/new', ensureAuthenticated, function(req, res) {
    res.render('articles/new', {
        title: "Add Article"
    });
});

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

// 提交到数据库, 创建操作
router.post('/create', [
    // 根据文档在数组中添加
    // check('title').isEmail(),
    check('title').isLength({min: 1}).withMessage("Title 不能为空"),
    // check('author').isLength({min: 1}).withMessage("Author 不能为空"),   // 在权限验证中屏蔽
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

        article.author = req.user._id;  // 这个 id 在 passport 中登录了之后就会有这个实例。

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
router.post('/update/:id', function(req, res) {
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

// 权限验证的中间件
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login.');
        res.redirect('/users/login');
    }
}


// export default router;
module.exports = router;