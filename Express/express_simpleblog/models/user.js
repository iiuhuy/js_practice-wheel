let mongoose = require('mongoose');

// 定义 collection 的结构, 类 json 的结构
let userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    // 密码肯定是必要的
    password: {
        type: String,
        require: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);