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

  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === 'uranai.html') {
    const pathSection = document.querySelector('.path-section');
    if (pathSection && !document.querySelector('.watch-section')) {
      const style = document.createElement('style');
      style.textContent = `
        .watch-section{padding:64px 24px;background:#f7f2e6;color:#2a2a2e}
        .watch-inner{max-width:1000px;margin:0 auto}
        .watch-head{text-align:center;max-width:680px;margin:0 auto 28px}
        .watch-kicker{display:block;margin-bottom:9px;font-size:12px;letter-spacing:.14em;color:#8a6522}
        .watch-head h2{margin:0 0 10px;font-size:clamp(24px,4vw,34px);line-height:1.5}
        .watch-head p{margin:0;font-size:14px;line-height:1.9;color:#555}
        .watch-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .watch-card{display:flex;flex-direction:column;min-height:190px;padding:24px;border:1px solid #d8d3c6;background:rgba(255,255,255,.56);color:inherit;text-decoration:none;transition:transform .2s ease,background .2s ease}
        .watch-card:hover{transform:translateY(-2px);background:#fff}
        .watch-card small{font-size:11px;letter-spacing:.12em;color:#8a6522}
        .watch-card h3{margin:9px 0 8px;font-size:21px}
        .watch-card p{margin:0 0 18px;font-size:14px;line-height:1.8;color:#555}
        .watch-card .watch-arrow{margin-top:auto;font-weight:700;font-size:14px}
        @media(max-width:640px){.watch-section{padding:48px 20px}.watch-grid{grid-template-columns:1fr}.watch-card{min-height:0}}
      `;
      document.head.appendChild(style);

      const section = document.createElement('section');
      section.className = 'watch-section';
      section.setAttribute('aria-label', '無料で占いを体験する');
      section.innerHTML = `
        <div class="watch-inner">
          <div class="watch-head">
            <span class="watch-kicker">まずは、無料で体験</span>
            <h2>私の占いを、ちょっと覗いてみる。</h2>
            <p>個人セッションの前に、どんなふうに読む人なのか知りたい方へ。動画とLIVEで、結ゆうの占いをそのまま体験できます。</p>
          </div>
          <div class="watch-grid">
            <a class="watch-card" href="https://youtube.com/channel/UCuratso54Qo0szoH1isZ_Hw?si=1vRlUhZJeUD6x9bF" target="_blank" rel="noopener noreferrer">
              <small>YOUTUBE</small>
              <h3>3択リーディング</h3>
              <p>カードを選んで、今の自分に必要な問いを受け取る。じっくり見たい方はこちら。</p>
              <span class="watch-arrow">YouTubeで見る ↗</span>
            </a>
            <a class="watch-card" href="https://lite.tiktok.com/t/ZS9AUVCm5txKU-OC06K/" target="_blank" rel="noopener noreferrer">
              <small>TIKTOK</small>
              <h3>LIVE・ショート動画</h3>
              <p>その場で話して、その場で読む。結ゆうの空気感や人柄ごと覗きたい方はこちら。</p>
              <span class="watch-arrow">TikTokを覗く ↗</span>
            </a>
          </div>
        </div>`;
      pathSection.insertAdjacentElement('afterend', section);
    }
  }
})();
