var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    FONT_HEIGHT = 15,       // 字体宽度
    MARGIN = 35,            // 外框 
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SPACING = 20,   // 数字间距
    RADIUS = canvas.width/2 - MARGIN,   // 半径
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

// Functions...............................
// 绘制表面为钟面的圆形
function drawCircle() {  
    context.beginPath();
    
    // arc(x,y,r,startAngle,endAngle,anticlockwise(可选))
    context.arc(canvas.width/2, canvas.height/2,
        RADIUS, 0, Math.PI*2, true);
    context.stroke();
}

// 绘制数字
function drawNumerals() {
    var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    angle = 0,
    numeralWidth = 0;

    numerals.forEach(function(numeral) {
        angle = Math.PI/6 * (numeral - 3);
        numeralWidth = context.measureText(numeral).width;
        // fillText 绘制文字, 并不会创建路径而是直接渲染到 canvas
        context.fillText(numeral,
            canvas.width/2 + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
            canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3);
    });
}

// 组合调用 beginPath、arc、fill 绘制中心小圆点
function drawCenter() {  
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
    context.fill();
}

// 时钟的指针绘制
function drawHand(loc,isHour) {  
    var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
        handRadius = isHour? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
                           : RADIUS - HAND_TRUNCATION;
        context.moveTo(canvas.width/2, canvas.height/2);
        context.lineTo(canvas.width/2 + Math.cos(angle)*handRadius,
                       canvas.height/2 + Math.sin(angle)*handRadius);
        context.stroke();
}

// 绘制
function drawHands() {  
    var date = new Date,
        hour = date.getHours();

        hour = hour > 12? hour - 12: hour;

        drawHand(hour*5 + (date.getMinutes()/60) * 5, true, 0.5);
        drawHand(date.getMinutes(), false, 0.5);
        drawHand(date.getSeconds(), false, 0.2);
}

// 画时钟的函数
function drawClock() {
    context.clearRect(0, 0, canvas.width, canvas.height);   // 擦除 canvas , 后面重新绘制

    drawCircle();   // 调用钟面圆形函数
    drawCenter();   // 调用中心点函数
    drawHands();    // 绘制时分秒指针
    drawNumerals(); // 绘制时钟数字
}

// Init...
context.font = FONT_HEIGHT + 'px Arial';
loop = setInterval(drawClock, 1000);    // setInterval 制作时钟的动画效果
