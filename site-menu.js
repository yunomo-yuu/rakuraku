(() => {
  const header = document.querySelector('.site-header');
  const brand = header && header.querySelector('.brand');
  if (!header || !brand) return;

  const headerMain = document.createElement('div');
  headerMain.className = 'header-main';
  const button = document.createElement('button');
  button.className = 'menu-button';
  button.type = 'button';
  button.setAttribute('aria-label', 'メニューを開く');
  button.setAttribute('aria-controls', 'site-menu');
  button.setAttribute('aria-expanded', 'false');
  button.innerHTML = '<span></span><span></span><span></span>';
  header.insertBefore(headerMain, brand);
  headerMain.append(button, brand);

  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.hidden = true;

  const menu = document.createElement('nav');
  menu.className = 'site-menu';
  menu.id = 'site-menu';
  menu.setAttribute('aria-label', 'サイトメニュー');
  menu.setAttribute('aria-hidden', 'true');
  menu.innerHTML = `
    <div class="menu-head"><span>結の部屋</span><button class="menu-close" type="button" aria-label="メニューを閉じる">×</button></div>
    <div class="menu-links">
      <a href="index.html"><span>玄関</span><small>あなたの音</small></a>
      <a href="uranai.html"><span>占いの部屋</span><small>占いと対話</small></a>
      <a href="rakuraku.html"><span>らくらくの部屋</span><small>ケアマネジャー支援</small></a>
      <a href="totonou.html"><span>整う部屋</span><small>呼吸と音</small></a>
      <a href="profile.html"><span>プロフィール</span><small>結ゆうについて</small></a>
    </div>
    <a class="menu-legal" href="legal.html">特定商取引法・プライバシー・利用規約</a>`;
  header.after(overlay, menu);

  const closeButton = menu.querySelector('.menu-close');
  let lastFocus = null;

  function openMenu() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(() => document.body.classList.add('menu-open'));
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'メニューを閉じる');
    menu.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'メニューを開く');
    menu.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => { overlay.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus();
  }

  button.addEventListener('click', () => button.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  closeButton.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
  });
})();
