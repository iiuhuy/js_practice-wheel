module.exports = {
    // 这样以后使用的时候, 该这个两个地址就好了。 因为数据库不一样
    // 然后在 app.js 导入使用
    database: 'mongodb://localhost/express_blog',
    secret: 'keyboard cat',
}