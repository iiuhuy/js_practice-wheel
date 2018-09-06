var Max = 100;

function randomInteger() {
    return Math.floor(Math.random() * Max);
}

// 暴露出去: 每个模块只能通过 module.exports 暴露一个变量
module.exports = randomInteger;
