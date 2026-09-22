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
        .horoscope-demo-card{margin:24px 0 8px;padding:22px;background:#fbf7ef;border:1px solid #d8d3c6;color:#2a2a2e}
        .horoscope-demo-card .demo-kicker{display:block;margin-bottom:7px;font-size:11px;letter-spacing:.13em;color:#8a6522}
        .horoscope-demo-card h4{margin:0 0 9px;font-size:20px;line-height:1.6}
        .horoscope-demo-card p{margin:0 0 12px;font-size:14px;line-height:1.85;color:#555}
        .horoscope-demo-card figure{margin:16px 0 0}
        .horoscope-demo-card img{display:block;width:100%;max-width:520px;height:auto;margin:0 auto;border:1px solid #d8d3c6;background:#fff}
        .horoscope-demo-card figcaption{margin-top:9px;font-size:12px;line-height:1.7;text-align:center;color:#666}
        @media(max-width:640px){.watch-section{padding:48px 20px}.watch-grid{grid-template-columns:1fr}.watch-card{min-height:0}.horoscope-demo-card{padding:16px}.horoscope-demo-card h4{font-size:18px}}
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

    const horoscopeLink = document.querySelector('a.tool-link[href*="horoscope.html"]');
    const horoscopeGroup = horoscopeLink && horoscopeLink.closest('.tool-group');
    if (horoscopeGroup && !document.querySelector('.horoscope-demo-card')) {
      const demo = document.createElement('div');
      demo.className = 'horoscope-demo-card';
      demo.innerHTML = `
        <span class="demo-kicker">星の肖像 サンプル</span>
        <h4>ホロスコープは、一枚絵にもできます。</h4>
        <p>出生図（ホロスコープ）の結果をもとに、あなただけの世界観を一枚絵として表現できます。</p>
        <p>文字で読むだけではつかみにくい魅力や雰囲気を、「星の肖像」として、絵で受け取れます。</p>
        <figure>
          <img loading="lazy" src="data:image/jpeg;base64,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" alt="星の肖像のサンプル画像">
          <figcaption>※画像はサンプルです<br>※出生図の内容をもとに生成する「星の肖像」の一例です</figcaption>
        </figure>`;
      horoscopeGroup.appendChild(demo);
    }
  }
})();
