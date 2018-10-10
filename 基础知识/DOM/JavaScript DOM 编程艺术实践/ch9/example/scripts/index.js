// window.onload = function () {
//     var paras = document.getElementsByTagName("p");
//     for (let i = 0; i < paras.length; i++) {
//         paras[i].onclick = function () {
//             alert("You clicked on a paragraph!");
//         }
//     }
//     let example = document.getElementById("example");
//     console.log(this);
//     alert("This font size is:" + example.style.fontSize);
// }

function styleHeaderSiblings() {  
    if (!document.getElementsByTagName) return false;
    
    var headers = document.getElementsByTagName("h1");
    var elem;
    for(let i = 0; i < headers.length; i++) {
        elem = getNextElement(headers[i].nextSibling);

        elem.style.fontWeight = "blod";
        elem.style.fontSize = "1.2em";
    }
}

function getNextElement(node) {  
    if(node.nodeType == 1) {
        return node;
    }
    if(node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

addLoadEvent(styleHeaderSiblings);