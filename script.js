// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  const links = Array.from(document.querySelectorAll('.product-link'));
  const images = links.map(a => a.getAttribute('href'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = lightbox.querySelector('.lb-image');
  const btnClose = lightbox.querySelector('.lb-close');
  const btnPrev = lightbox.querySelector('.lb-prev');
  const btnNext = lightbox.querySelector('.lb-next');
  let current = 0;

  function open(index) {
    current = index;
    lbImage.src = images[current];
    lbImage.alt = document.querySelectorAll('.product-img')[current].alt || '';
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImage.src = '';
  }

  function showNext(offset = 1) {
    current = (current + offset + images.length) % images.length;
    lbImage.src = images[current];
    lbImage.alt = document.querySelectorAll('.product-img')[current].alt || '';
  }

  links.forEach((a, i) => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      open(i);
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => showNext(-1));
  btnNext.addEventListener('click', () => showNext(1));

  // 点击遮罩空白处关闭（只在点击 lightbox 本身时触发）
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  // 键盘支持：Esc 关闭，← → 切换
  document.addEventListener('keydown', function (e) {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showNext(-1);
      if (e.key === 'ArrowRight') showNext(1);
    }
  });
});
// ...existing code...