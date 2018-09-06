let mongoose = require('mongoose');

// 定义 collection 的结构, 类 json 的结构
let articleSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
});

let Article = module.exports = mongoose.model('Article', articleSchema);