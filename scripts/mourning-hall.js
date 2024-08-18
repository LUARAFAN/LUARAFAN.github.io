/*----加载动画----*/

const sl = new SiteLoader()
const loadingContainer = document.querySelector('#loader')
const afterLoadContent= document.querySelector('#content')


sl.addEventListener('trueLoadFinish', () => {
    console.log("加载完")
    document.body.style.overflow="auto"
    loadingContainer.classList.add("loading-disappear") 
    loadingContainer.style.display="none"
    afterLoadContent.style.visibility="visible"
    console.log("加载完成")
})

sl.setTargetTextDom("#loaderNumber")
sl.progressSpeed = 12
sl.needSpeedUp = true
sl.startLoad()




/*---------音乐---------*/
var audio = document.getElementById('myAudio');

    // 检查音频是否播放结束
    audio.addEventListener('ended', function () {
      this.currentTime = 0;  // 重新设置播放时间为 0
      this.play();  // 重新开始播放
    });



/*--------背景动画----------*/
  // 定义星星的颜色
const STAR_COLOR = '#fff';
// 定义星星的大小
const STAR_SIZE = 3;
// 定义星星的最小缩放比例
const STAR_MIN_SCALE = 0.2;
// 定义溢出阈值
const OVERFLOW_THRESHOLD = 50;
// 定义星星的数量
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
// 获取canvas元素
const canvas = document.querySelector('canvas');
// 获取canvas的绘图上下文
const context = canvas.getContext('2d');
// 定义缩放比例
let scale = 1; // device pixel ratio
// 定义宽度和高度
let width;
let height;
// 定义星星数组
let stars = [];
// 定义鼠标指针的位置
let pointerX;
let pointerY;
// 定义速度对象
let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
// 定义触摸输入标志
let touchInput = false;
// 生成星星
generate();
// 调整大小
resize();
// 运行动画
step();
// 当窗口大小改变时，重新调整大小
window.onresize = resize;
// 当鼠标在canvas上移动时，更新鼠标指针位置
canvas.onmousemove = onMouseMove;
// 当触摸屏在canvas上移动时，更新鼠标指针位置
canvas.ontouchmove = onTouchMove;
// 当触摸屏离开canvas时，更新鼠标指针位置
canvas.ontouchend = onMouseLeave;
// 当鼠标离开文档时，更新鼠标指针位置
document.onmouseleave = onMouseLeave;
// 生成星星
function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
    }
}
// 将星星放置到随机位置
function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}
// 回收星星并重新放置到新的位置
function recycleStar(star) {
    // 初始化方向为 'z'
    let direction = 'z';
    // 获取速度的绝对值
    let vx = Math.abs(velocity.x);
    let vy = Math.abs(velocity.y);
    // 如果速度的绝对值大于1，则根据速度的大小随机确定方向
    if (vx > 1 || vy > 1) {
        let axis;
        // 如果水平速度大于垂直速度，则根据水平速度的比例随机确定水平或垂直方向
        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }
        // 根据方向确定具体的移动方向
        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }
    // 随机设置星星的缩放比例
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
    // 根据方向设置星星的位置
    if (direction === 'z') {
        // 如果方向为 'z'，则将星星放置在屏幕中心
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        // 如果方向为 'l'，则将星星放置在屏幕左侧
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        // 如果方向为 'r'，则将星星放置在屏幕右侧
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 't') {
        // 如果方向为 't'，则将星星放置在屏幕顶部
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
        // 如果方向为 'b'，则将星星放置在屏幕底部
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }
}
// 调整大小
function resize() {
    // 获取设备像素比例
    scale = window.devicePixelRatio || 1;
    // 设置画布的宽度和高度
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;
    canvas.width = width;
    canvas.height = height;
    // 将所有星星重新放置到屏幕上
    stars.forEach(placeStar);
}
// 动画的每一帧
function step() {
    // 清空画布
    context.clearRect(0, 0, width, height);
    // 更新星星的位置和速度
    update();
    // 绘制星星
    render();
    // 请求下一帧动画
    requestAnimationFrame(step);
}
// 更新星星的位置和速度
function update() {
    // 缓动速度
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;
    // 更新速度
    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;
    // 遍历所有星星
    stars.forEach((star) => {
        // 根据速度和缩放比例更新星星的位置
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        // 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        // 更新星星的缩放比例
        star.z += velocity.z;
        // 如果星星超出屏幕范围，则重新放置到屏幕上
        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star);
        }
    });
}
// 绘制星星
function render() {
    // 遍历所有星星
    stars.forEach((star) => {
        // 设置绘制星星的样式
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;
        // 绘制星星的路径
        context.beginPath();
        context.moveTo(star.x, star.y);
        // 计算星星的尾巴坐标
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        // 绘制星星的尾巴
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}
// 移动鼠标指针
function movePointer(x, y) {
    // 如果之前有记录鼠标指针的位置，则计算鼠标指针的移动距离，并更新速度
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        let ox = x - pointerX;
        let oy = y - pointerY;
        velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }
    // 更新鼠标指针的位置
    pointerX = x;
    pointerY = y;
}
// 当鼠标在canvas上移动时的事件处理函数
function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
}
// 当触摸屏在canvas上移动时的事件处理函数
function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
    event.preventDefault();
}
// 当鼠标离开canvas时的事件处理函数
function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}

/*-----------登记板-------*/
document.addEventListener('DOMContentLoaded', function() {
    const boardContainer = document.getElementById('boardContainer');
    const boardHeader = document.querySelector('.board-header');
    const boardBody = document.querySelector('.board-body');
    const registrationContainer = document.getElementById('registrationContainer');
    const nameInput = document.getElementById('nameInput');
    const registerBtn = document.getElementById('registerBtn');
    const namesList = document.getElementById('namesList');

    let isDragging = false;
    let offsetX, offsetY;

    // 加载已保存的名字
    async function loadNames() {
        try {
            const response = await fetch('/api/names');
            if (response.ok) {
                const names = await response.json();
                names.forEach(name => {
                    saveName(name);
                });
            } else {
                console.error('Failed to fetch names:', response.statusText);
            }
        } catch (error) {
            console.error('Error loading names:', error);
        }
    }
// 用户提交名字的简化处理
document.getElementById('registerBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name !== '') {
        saveName(name); // 在公告板上显示名字
        nameInput.value = ''; // 清空输入框
    }
});
    // 注册名字
    registerBtn.addEventListener('click', async function() {
        const name = nameInput.value.trim();
        if (name !== '') {
            try {
                const response = await fetch('/api/names', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name })
                });
                if (response.ok) {
                    const savedName = await response.json();
                    saveName(savedName.name);
                    nameInput.value = '';
                    registerBtn.style.display = 'none'; // 隐藏提交按钮
                } else {
                    console.error('Failed to save name:', response.statusText);
                }
            } catch (error) {
                console.error('Error saving name:', error);
            }
        }
    });

    // 展开/收起登记板
    boardHeader.addEventListener('click', function() {
        if (!isDragging) {
            boardBody.classList.toggle('expanded');
            // 调整登记板宽度和高度
            if (boardBody.classList.contains('expanded')) {
                boardContainer.style.width = '200px';
                boardContainer.style.height = 'auto';
            } else {
                boardContainer.style.width = '30px';
                boardContainer.style.height = '30px';
            }
        }
    });

    // 拖拽功能
    boardHeader.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - boardContainer.offsetLeft;
        offsetY = e.clientY - boardContainer.offsetTop;
        // 禁止文本选择
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            boardContainer.style.left = `${e.clientX - offsetX}px`;
            boardContainer.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        // 恢复文本选择
        document.body.style.userSelect = 'auto';
        document.body.style.webkitUserSelect = 'auto';
        // 调整登记板位置以保持在可视区域内
        adjustBoardPosition();
        // 吸附功能
        stickToEdge();
    });

    // 调整登记板位置以保持在可视区域内
    function adjustBoardPosition() {
        const { left, top } = boardContainer.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const boardWidth = boardContainer.offsetWidth;
        const boardHeight = boardContainer.offsetHeight;

        // 计算新的左边界
        let newLeft = Math.max(left, 10);
        newLeft = Math.min(newLeft, windowWidth - boardWidth - 10);

        // 计算新的顶边界
        let newTop = Math.max(top, 10);
        newTop = Math.min(newTop, windowHeight - boardHeight - 10);

        // 应用新的位置
        boardContainer.style.left = `${newLeft}px`;
        boardContainer.style.top = `${newTop}px`;
    }

    // 吸附功能
    function stickToEdge() {
        const { left, top } = boardContainer.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (left < 10) {
            boardContainer.style.left = '10px';
        } else if (left + boardContainer.offsetWidth > windowWidth - 10) {
            boardContainer.style.left = `${windowWidth - boardContainer.offsetWidth - 10}px`;
        }

        if (top < 10) {
            boardContainer.style.top = '10px';
        } else if (top + boardContainer.offsetHeight > windowHeight - 10) {
            boardContainer.style.top = `${windowHeight - boardContainer.offsetHeight - 10}px`;
        }
    }

    // 监听输入框的变化
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            registerBtn.style.display = 'inline-block';
        } else {
            registerBtn.style.display = 'none';
        }
    });

    // 保存名字
    function saveName(name) {
        const li = document.createElement('li');
        li.textContent = name;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', async function() {
            if (confirm('确定删除自己的名字吗？')) {
                li.remove();
                await deleteName(name);
            }
        });
        li.appendChild(deleteBtn);
        document.getElementById('namesList').appendChild(li); // 添加到公告板
    }

    // 从服务器删除名字
    async function deleteName(name) {
        try {
            const response = await fetch(`/api/names/${name}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                console.error('Failed to delete name:', response.statusText);
            }
        } catch (err) {
            console.error('Error deleting name:', err);
        }
    }

    // 初始化加载名字
    loadNames();
});

/*-----------gsap动画-------*/
gsap.to('#Tsutsu',{rotation: 360,
    x:10,y:-10,
    duration: 1,
    repeat: -1,
    repeatDelay: 0.2,
    ease: 'bounce.out'})
gsap.to('#tsutsuShadow',{rotation: 360,
        duration: 2,
        repeat: -1,
        repeatDelay: 0.2,
        ease: 'power1.inOut'})

/*-----马赛克处理--------*/
const img = document.querySelector('.glass');
img.onload = function () {
    // base64地址不处理
    if (!this.src.startsWith('http')) {
        return;
    }
    const { clientWidth, clientHeight } = this;
    // 创建canvas尺寸缩小
    const canvas = document.createElement('canvas');
    canvas.width = clientWidth / 6;
    canvas.height = clientHeight / 6;
    const context = canvas.getContext('2d');
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
    // 替换图片地址
    this.src = canvas.toDataURL();
};

