function moveMessage() {  
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;

    var elem = document.getElementById("message");
    // elem.style.left = "200px";

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);

    if(xpos == 200 && ypos == 100) {
        // xpos++;
        return true;
    }
    if(xpos < 200) {
        xpos++;
    }
    if(xpos > 200) {
        xpos--;
    }
    if(ypos < 100) {
        ypos++;
    }
    if(ypos > 100) {
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    movement = setTimeout("moveMessage()", 10);

}

// addLoadEvent(positionMessage);
addLoadEvent(moveMessage);