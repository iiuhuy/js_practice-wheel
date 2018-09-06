var LocalStrategy = require('passport-local');
const User = require('../models/user');     // // 将 user models 引入进来
const bcrypt = require('bcrypt');

module.exports = function(passport) { 
    // 第①步
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }

            if (!user) { return done(null, false, { message: "No User Found!"}); }

            // if (!user.verifyPassword(password)) { return done(null, false); }
            // 导入 bcrypt 包, 比较密码  
            // 回调函数第一个参数 err, 第二个参数为 是否匹配上
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) { return done(err); }  // 匹配错误, 则返回错误
                // 如果匹配了
                if(isMatch) {
                    return done(null, user);    // 默认就是返回 user
                } else {
                    return done(null, false, { message: "密码错误！Password mistake"});
                }
            });
          });
        }
    ));

    // 第②步 session 不需要怎么改动
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // 第③步 使用中间件引用, 在 app.js 中

    // 第④步 app.post, 在 users.js 中
}
