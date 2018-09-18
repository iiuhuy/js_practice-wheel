var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');  // 获取绘图环境变量

context.font = '38pt Arial';    // 设置字体
context.fillStyle = 'pink';  // 设置填充颜色 
context.strokeStyle = 'blue';   // 设置轮廓颜色
// 设置 canvas 的宽度和高度时, 不能使用 px 后缀
context.fillText('余辉', canvas.width/2 -150,
                                 canvas.height/2 + 15);  // 填充体

context.strokeText('余辉', canvas.width/2 -150,
                                 canvas.height/2 + 15);  // 边框