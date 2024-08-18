/*-------时钟-------*/
const deg=6
const hr=document.querySelector('#hr');
const min=document.querySelector('#mn');
const sec=document.querySelector('#sc');



setInterval(() => {
    let day=new Date();
let hh=day.getHours()*30;
let mm=day.getMinutes()*deg;
let ss=day.getSeconds()*deg;

hr.style.transform=`rotateZ(${(hh+(mm/12))+90}deg)`;
mn.style.transform=`rotateZ(${mm}deg)`;
sc.style.transform=`rotateZ(${ss}deg)`;
})



document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const toggleIcon = document.querySelector('.toggle-icon');
    const contentArea = document.querySelector('.content-area');
    const contents = document.querySelectorAll('.content');
    const initialContent = document.getElementById('content1');

    // 当点击标签时切换内容
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            const activeContent = document.getElementById(targetId);

            // 移除所有标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            // 设置当前标签为激活状态
            this.classList.add('active');

            // 隐藏所有内容
            contents.forEach(c => c.style.display = 'none');
            // 显示对应的内容
            activeContent.style.display = 'block';
        });
    });

    // 切换图标功能
    toggleIcon.addEventListener('click', function() {
        if (contentArea.style.display === 'block') {
            // 如果内容区域可见，则隐藏内容区域
            contentArea.style.display = 'none';
            this.classList.add('active');
        } else {
            // 如果内容区域被隐藏，则显示内容区域
            contentArea.style.display = 'block';
            this.classList.remove('active');

            // 清空内容区域
            contents.forEach(c => c.style.display = 'none');
        }
    });
});