var section = document.querySelector('section');
var createBtn = document.querySelector('.create');
var resetBtn = document.querySelector('.reset');

// 创建盒子
function createBox() {
    var box = document.createElement('div');
    box.textContent = 'This is a box';
    section.appendChild(box);

}

// 点击 create box 执行 createBox 函数, 创建新盒子
createBtn.onclick = createBox;

resetBtn.onclick = function() {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
}

// createBox();
// createBox();
// createBox();
