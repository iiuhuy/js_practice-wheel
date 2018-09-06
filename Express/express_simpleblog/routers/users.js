const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const passport = require('passport');

let router = express.Router();
let User = require('../models/user');   // import User models

// 路由, 声明 注册页面 模板文件
router.get('/register', function(req, res) {
    res.render('users/register');

});

// 提交到数据库, 创建操作
router.post('/register', [    // 地址改为 register
    // 根据文档在数组中添加
    // check('title').isEmail(),
    check('name').isLength({min: 1}).withMessage("Name 不能为空"),
    check('username').isLength({min: 1}).withMessage("Username 不能为空"),
    check('email').isLength({min: 1}).withMessage("Email 不能为空"),
    // check('password').isLength({min: 1}).withMessage("Password 不能为空"),
    check('email').isEmail().withMessage("Email 格式不对."),
    check("password", "invalid password")
        .isLength({ min: 1 })
        .custom((value,{req, loc, path}) => {
            if (value !== req.body.password_confirmation) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match ( 密码不匹配 )");
            } else {
                return value;
            }
    }),
], function(req, res) {
    // 捕获一下, 然互再进行判断是否为空.
    const errors = validationResult(req);
    // 判断一下 errors 是不是为空的, 如果不为空的话将 errors.array 显示出来
    if (!errors.isEmpty()) {
        // console.log(errors.array()); // 如果验证不通过, 那么就报错
        res.render('users/register', {
            errors: errors.array()
        });
    } else { 
        let user = new User(req.body);
        // 还需要做验证通过后, 将密码的数据保存到数据库
        // 关于参数, 根据文档去理解
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) {
                    console.log(err);
                    return;
                } 
                
                user.password = hash;   // 将处理过的 hash 密码放到 user.password 
                // 怎么保存到数据库？ 之前操作过, 是 .save(), 即接个回调函数
                user.save(function(err) {
                    if(err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash("success", "User 注册成功, 现在可以去登录!");
                        // res.redirect('/');      // 跳转到首页
                        res.redirect('/users/login');    // 注册之后也跳转到登录页面
                    }
                }); 
            });
        });
    }  
});

// 路由, 声明 登录页面 模板文件
router.get('/login', function(req, res) {
    res.render('users/login');
});

// // 登录点击 Submit 后的路由
// router.post('/login', function(req, res) {
//     res.render('users/login');
// });

router.post('/login', function (req, res, next) { 
    // 使用本地策略 local
    // successRedirect 成功后跳转到 / 目录
    // failureRedirect 失败后跳转到 /login 目录
    // failureFlash 失败后显示 Flash
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: 'Welcome!'
    })(req, res, next);
});

// logout 逻辑
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');  // 退出后去到登录页面
});

module.exports = router;