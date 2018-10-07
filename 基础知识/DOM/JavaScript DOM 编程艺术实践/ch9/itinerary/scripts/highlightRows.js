function highlightRows () {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for(let i = 0; i < rows.length; i++) {
        console.log("当前的 this" + this);
        rows[i].onmouseover = function () {  
            console.log("onmouseover" + this);
            this.style.fontWeight = "blod";
        }
        rows[i].onmouseout = function () {  
            console.log("onmouseout" + this);
            this.style.fontWeight = "normal";
        }
    }
}

addLoadEvent(highlightRows);