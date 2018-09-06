const button = document.querySelector('like-btn');
const buttonText = button.querySelector('.like-text');

let isLiked = false;
button.addEventListener('click', () => {
    isLiked = !isLiked;
    if(isLiked) {
        buttonText.innerHTML = "取消";
    } else {
        buttonText.innerHTML = "点赞";
    }
},fasle);