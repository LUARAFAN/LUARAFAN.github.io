//变换文字
document.addEventListener("DOMContentLoaded", function() {
    var hoverContents = document.querySelectorAll('.hoverContent');

    hoverContents.forEach(function(element) {
      element.addEventListener('mouseover', function() {
        this.textContent = this.dataset.hoverText;
      });

      element.addEventListener('mouseout', function() {
        this.textContent = this.getAttribute('data-original-text');
      });

      // 设置原始文本为属性，以便在mouseout时恢复
      element.setAttribute('data-original-text', element.textContent);
    });
  });


  document.getElementById('title').addEventListener('hover', function() {
    var popover = document.getElementById('popover');
    popover.style.opacity = 1;
    popover.style.transform = 'rotate(360deg)';
  });