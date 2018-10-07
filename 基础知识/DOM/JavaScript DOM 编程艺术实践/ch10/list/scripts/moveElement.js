function moveElement(elementID, final_x, final_y, interval) {  
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;

    var elem = document.getElementById(elementID);

    // 测试是否存在, 存在的情况下使用 setTimeout
    if(elem.movement) {
        clearTimeout(elem.movement);
    }
    // 如果 left & top 属性没有被设置则设置它默认为 0px
    if(!elem.style.left) {
        elem.style.left = "0px";
    }
    if(!elem.style.top) {
        elem.style.top = "0px";
    }

    var xpos = parseInt(elem.style.left);   
    var ypos = parseInt(elem.style.top);

    if(xpos == final_x && ypos == final_y) {
        return true;
    }

    if(xpos < final_x) {
        // xpos++;
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if(xpos > final_x) {
        // xpos--;
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if(ypos < final_y) {
        // ypos++;
        var dist = Math.ceil((final_y - xpos)/10);
        ypos = ypos + dist;
    }
    if(ypos > final_y) {
        // ypos--;
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID +"', " + final_x + "," + final_y + "," + interval + ")";
    // movement = setTimeout(repeat, interval);
    elem.movement = setTimeout(repeat, interval);
}