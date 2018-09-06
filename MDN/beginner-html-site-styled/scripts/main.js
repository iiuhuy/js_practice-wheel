    var myImage = document.querySelector('img');
    myImage.onclick = function() {
        var mySrc = myImage.getAttribute('src');

        if(mySrc === 'images/chrome.jpeg') {
            myImage.setAttribute('src', 'images/firefox-icon.png')
        } else {
            myImage.setAttribute('src', 'images/chrome.jpeg');
        }
    }

    var myButton = document.querySelector('button');
    var myHeading =  document.querySelector('h1');


    function setUserName() {
        var myName  = prompt('Please Enter Your Name !');
        localStorage.setItem('name', myName);
        myHeading.textContent = 'Mozilla is cool,' + myName;
    }

    // 简单的 if 判断
    if(!localStorage.getItem('name')) {
        setUserName();
    } else {
        var storedName = localStorage.getItem('name');
        myHeading.textContent = 'Mozilla is cool,' + storedName;
    }

    // 将 onclick 时间处理器绑定到按钮上
    myButton.onclick = function() {
        setUserName();
    }