/* ActARion · reviewknop (alleen op previewdeployments, niet op productie)
 *
 * Zelfde opzet als de feedbackknop van familiecadeau.nl en BikeFitBoost:
 * - Op elke pagina wordt (in sessionStorage) de route bijgehouden.
 * - De knop staat voor iedere bezoeker van de preview op elke pagina.
 * - Klik: schermafbeelding van het zichtbare deel (zonder knop), dan een venster met naam, opmerking en optioneel e-mail.
 * - Versturen naar /api/review met pagina, route, browser en schermgegevens.
 * - Daarna 3 seconden een bedankje en weer de knop.
 */
(function () {
  'use strict';
  if (window.__acReview) return;
  window.__acReview = true;
  var KEY_NAME = 'ac-rv-name', KEY_MAIL = 'ac-rv-mail', KEY_TRAIL = 'ac-rv-trail', LIB = '/review/html2canvas-pro.min.js';
  var ls = function (k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };
  var ss = function (k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } };

  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var ALL = {
    en: { btn: 'Feedback', aria: 'Give feedback on this page', title: 'What did you notice?', lead: 'Comment on this page of the new website. A few words is enough.',
      shot: 'A screenshot of this page is included.', noshot: 'Send without screenshot', name: 'Your name', mail: 'Email (optional, if we may ask follow-up questions)',
      ph: 'For example: this heading is unclear, or the button doesn’t work on mobile…', send: 'Send', sending: 'Sending…', short: 'Please write briefly what you noticed.',
      noname: 'Please enter your name.', fail: 'Sending failed. Please try again in a moment.', small: 'Your comment, the screenshot, page, browser and screen type are only used to improve the preview.',
      thx: 'Thank you', thx2: 'Your comment has been received.', close: 'Close' },
    nl: { btn: 'Feedback', aria: 'Feedback geven over deze pagina', title: 'Wat viel je op?', lead: 'Geef je opmerking over deze pagina van de nieuwe website. Een paar woorden is genoeg.',
      shot: 'We sturen een schermafbeelding van deze pagina mee.', noshot: 'Liever zonder schermafbeelding', name: 'Je naam', mail: 'E-mail (optioneel, als we iets mogen navragen)',
      ph: 'Bijvoorbeeld: deze kop is onduidelijk, of de knop werkt niet op mobiel…', send: 'Versturen', sending: 'Versturen…', short: 'Schrijf kort wat je opviel.',
      noname: 'Vul je naam in.', fail: 'Versturen lukt nu even niet. Probeer het zo nog eens.', small: 'Je opmerking, de schermafbeelding, de pagina en je browser- en schermtype gebruiken we alleen om de preview te verbeteren.',
      thx: 'Dank je wel', thx2: 'Je opmerking is binnen.', close: 'Sluiten' },
    de: { btn: 'Feedback', aria: 'Feedback zu dieser Seite geben', title: 'Was ist Ihnen aufgefallen?', lead: 'Kommentieren Sie diese Seite der neuen Website. Ein paar Worte genügen.',
      shot: 'Ein Screenshot dieser Seite wird mitgesendet.', noshot: 'Ohne Screenshot senden', name: 'Ihr Name', mail: 'E-Mail (optional, für Rückfragen)',
      ph: 'Zum Beispiel: Diese Überschrift ist unklar, oder der Button funktioniert mobil nicht…', send: 'Senden', sending: 'Wird gesendet…', short: 'Bitte beschreiben Sie kurz, was Ihnen aufgefallen ist.',
      noname: 'Bitte geben Sie Ihren Namen ein.', fail: 'Senden ist gerade nicht möglich. Bitte versuchen Sie es gleich noch einmal.', small: 'Ihr Kommentar, der Screenshot, die Seite sowie Browser- und Bildschirmtyp werden nur zur Verbesserung der Vorschau verwendet.',
      thx: 'Vielen Dank', thx2: 'Ihr Kommentar ist eingegangen.', close: 'Schließen' }
  };
  var t = ALL[lang] || ALL.en;

  // 1. Route bijhouden
  var trail = [];
  try { trail = JSON.parse(ss(KEY_TRAIL) || '[]'); } catch (e) { trail = []; }
  if (!trail.length) trail.push({ start: true, referrer: document.referrer || '(direct)', t: new Date().toISOString() });
  function track() {
    var last = trail[trail.length - 1], p = location.pathname + location.search;
    if (!last || last.path !== p) trail.push({ path: p, title: document.title, t: new Date().toISOString() });
    if (trail.length > 30) trail = [trail[0]].concat(trail.slice(-29));
    ss(KEY_TRAIL, JSON.stringify(trail));
  }
  track();
  // Next.js navigeert client-side: ook die paginawissels meenemen
  ['pushState', 'replaceState'].forEach(function (m) {
    var o = history[m];
    history[m] = function () { var r = o.apply(this, arguments); setTimeout(track, 50); return r; };
  });
  window.addEventListener('popstate', function () { setTimeout(track, 50); });

  var F = 'Figtree,var(--font-body),system-ui,sans-serif';
  var css = '\
#ac-rv-btn{position:fixed;right:20px;bottom:20px;z-index:60;display:inline-flex;align-items:center;gap:8px;background:#10253A;color:#fff;border:0;border-radius:999px;padding:12px 18px;font:700 15px/1 ' + F + ';box-shadow:0 10px 30px rgba(16,37,58,.28);cursor:pointer;transition:transform .2s,opacity .3s,bottom .2s}\
#ac-rv-btn:hover{transform:translateY(-2px);background:#17324D}#ac-rv-btn:focus-visible{outline:3px solid #1B81C4;outline-offset:3px}\
#ac-rv-btn .dot{width:8px;height:8px;border-radius:50%;background:#A9DBF5;box-shadow:0 0 0 3px rgba(169,219,245,.3)}\
#ac-rv-btn.hide{opacity:0;pointer-events:none;transform:translateY(10px)}\
#ac-rv-back{position:fixed;inset:0;z-index:61;background:rgba(16,37,58,.5);display:flex;align-items:flex-end;justify-content:center;padding:16px}\
@media(min-width:640px){#ac-rv-back{align-items:center}}\
#ac-rv{width:100%;max-width:460px;max-height:calc(100vh - 32px);overflow:auto;background:#fff;border-radius:16px;box-shadow:0 24px 60px rgba(16,37,58,.3);font:16px/1.5 ' + F + ';color:#10253A}\
#ac-rv header{display:flex;justify-content:space-between;align-items:center;padding:18px 20px 6px}\
#ac-rv h2{margin:0;font:800 21px/1.2 var(--font-display),system-ui,sans-serif;letter-spacing:-.01em}#ac-rv .x{background:none;border:0;font-size:24px;line-height:1;cursor:pointer;color:#4A5D6E;padding:4px 8px;border-radius:8px}\
#ac-rv .body{padding:6px 20px 20px}#ac-rv p.lead{margin:0 0 12px;color:#4A5D6E;font-size:15px}\
#ac-rv .shot{display:flex;gap:12px;align-items:center;background:#F4F7FA;border:1px solid #DCE4EB;border-radius:10px;padding:8px;margin-bottom:12px;font-size:13px;color:#4A5D6E}\
#ac-rv .shot img{width:96px;height:64px;object-fit:cover;object-position:top;border-radius:6px;border:1px solid #DCE4EB;background:#fff}\
#ac-rv .shot label{display:flex;gap:6px;align-items:center;margin-top:4px;cursor:pointer}\
#ac-rv .lbl{display:block;font-size:13px;font-weight:600;color:#2C4560;margin:10px 0 4px}\
#ac-rv input[type=text],#ac-rv input[type=email],#ac-rv textarea{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #B8CBDA;border-radius:10px;font:inherit;color:inherit}\
#ac-rv textarea{min-height:96px;resize:vertical}\
#ac-rv input:focus,#ac-rv textarea:focus{outline:2px solid #166FA9;border-color:#166FA9}\
#ac-rv .count{text-align:right;font-size:12px;color:#4A5D6E;margin-top:2px}\
#ac-rv .send{width:100%;margin-top:14px;background:#166FA9;color:#fff;border:0;border-radius:999px;padding:13px 18px;font:700 16px ' + F + ';cursor:pointer}\
#ac-rv .send:hover{background:#125C8C}#ac-rv .send:disabled{opacity:.6;cursor:default}#ac-rv .err{color:#A3261D;font-size:14px;margin-top:8px}\
#ac-rv .small{font-size:12px;color:#4A5D6E;margin-top:10px}\
#ac-rv-thx{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);opacity:0;z-index:62;width:calc(100% - 32px);max-width:420px;background:#E6F1F9;border:1px solid #A9DBF5;border-left:4px solid #166FA9;border-radius:12px;box-shadow:0 18px 50px rgba(16,37,58,.22);padding:16px 18px;display:flex;gap:14px;align-items:center;transition:opacity .35s,transform .35s;font:15px/1.45 ' + F + ';color:#10253A}\
#ac-rv-thx.in{opacity:1;transform:translate(-50%,0)}\
#ac-rv-thx .seal{width:40px;height:40px;flex:none;border-radius:50%;background:#166FA9;display:grid;place-items:center;color:#fff;font-size:18px}\
#ac-rv-thx b{display:block;font:800 18px/1.2 var(--font-display),system-ui,sans-serif;margin-bottom:2px}\
@media print{#ac-rv-btn{display:none}}\
@media (prefers-reduced-motion:reduce){#ac-rv-btn,#ac-rv-thx{transition:none}}';

  var btn, shot = null, busy = false;
  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (html) e.innerHTML = html; return e; }
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // De cookiemelding mag niet over de knop vallen
  function place() {
    if (!btn) return;
    var ck = document.getElementById('consent-banner');
    btn.style.bottom = ck && ck.offsetHeight ? (ck.offsetHeight + 32) + 'px' : '';
  }

  function init() {
    if (btn) return;
    document.head.appendChild(el('style', { id: 'ac-rv-css' }, css));
    btn = el('button', { id: 'ac-rv-btn', type: 'button', 'aria-label': t.aria }, '<span class="dot" aria-hidden="true"></span>' + t.btn);
    btn.addEventListener('click', open);
    document.body.appendChild(btn);
    place();
    new MutationObserver(place).observe(document.body, { childList: true, subtree: false });
    window.addEventListener('resize', place);
  }

  function loadLib() {
    return new Promise(function (ok, fail) {
      if (window.html2canvas) return ok(window.html2canvas);
      var s = el('script', { src: LIB, async: '' });
      s.onload = function () { ok(window.html2canvas); };
      s.onerror = fail;
      document.head.appendChild(s);
    });
  }

  function capture() {
    return loadLib().then(function (h2c) {
      return h2c(document.body, {
        x: window.scrollX, y: window.scrollY, width: window.innerWidth, height: window.innerHeight,
        windowWidth: document.documentElement.clientWidth, scale: Math.min(1, 1280 / window.innerWidth) * Math.min(window.devicePixelRatio || 1, 1.5),
        useCORS: true, logging: false, backgroundColor: '#ffffff',
        ignoreElements: function (n) { return n.id === 'ac-rv-btn' || n.id === 'consent-banner' || n.id === 'ac-rv-back' || n.id === 'ac-rv-thx'; }
      });
    }).then(function (c) { return c.toDataURL('image/jpeg', 0.7); }).catch(function () { return null; });
  }

  function open() {
    if (busy) return;
    busy = true;
    btn.classList.add('hide');
    var opener = document.activeElement;
    capture().then(function (img) {
      shot = img;
      var back = el('div', { id: 'ac-rv-back' });
      back.innerHTML = '<div id="ac-rv" role="dialog" aria-modal="true" aria-labelledby="ac-rv-t">' +
        '<header><h2 id="ac-rv-t">' + t.title + '</h2><button type="button" class="x" aria-label="' + t.close + '">×</button></header>' +
        '<div class="body"><p class="lead">' + t.lead + '</p>' +
        (img ? '<div class="shot"><img alt="" src="' + img + '"><div>' + t.shot + '<label><input type="checkbox" id="ac-rv-noshot"> ' + t.noshot + '</label></div></div>' : '') +
        '<label class="lbl" for="ac-rv-txt">' + t.title + '</label>' +
        '<textarea id="ac-rv-txt" maxlength="2000" placeholder="' + esc(t.ph) + '"></textarea><div class="count"><span id="ac-rv-n">0</span>/2000</div>' +
        '<label class="lbl" for="ac-rv-name">' + t.name + '</label><input type="text" id="ac-rv-name" maxlength="100" autocomplete="name" value="' + esc(ls(KEY_NAME)) + '">' +
        '<label class="lbl" for="ac-rv-mail">' + t.mail + '</label><input type="email" id="ac-rv-mail" maxlength="200" autocomplete="email" value="' + esc(ls(KEY_MAIL)) + '">' +
        '<button type="button" class="send">' + t.send + '</button><div class="err" role="alert"></div>' +
        '<p class="small">' + t.small + '</p></div></div>';
      document.body.appendChild(back);
      var box = back.querySelector('#ac-rv'), txt = box.querySelector('#ac-rv-txt'), nm = box.querySelector('#ac-rv-name'), ml = box.querySelector('#ac-rv-mail'),
        send = box.querySelector('.send'), err = box.querySelector('.err');
      txt.focus();
      txt.addEventListener('input', function () { box.querySelector('#ac-rv-n').textContent = txt.value.length; });
      function close(restore) {
        back.remove(); document.removeEventListener('keydown', onKey); busy = false;
        if (restore !== false) { btn.classList.remove('hide'); if (opener && opener.focus) opener.focus(); }
      }
      function onKey(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') {
          var f = box.querySelectorAll('button,textarea,input'), a = f[0], z = f[f.length - 1];
          if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
          else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
        }
      }
      document.addEventListener('keydown', onKey);
      back.addEventListener('click', function (e) { if (e.target === back) close(); });
      box.querySelector('.x').addEventListener('click', function () { close(); });
      send.addEventListener('click', function () {
        var v = txt.value.trim(), name = nm.value.trim(), mail = ml.value.trim();
        if (v.length < 3) { err.textContent = t.short; txt.focus(); return; }
        if (name.length < 2) { err.textContent = t.noname; nm.focus(); return; }
        ls(KEY_NAME, name); ls(KEY_MAIL, mail);
        err.textContent = ''; send.disabled = true; send.textContent = t.sending;
        var noshot = box.querySelector('#ac-rv-noshot');
        var payload = {
          naam: name, email: mail, tekst: v, pagina: location.href, titel: document.title, taal: lang,
          route: JSON.parse(ss(KEY_TRAIL) || '[]'),
          scherm: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio || 1, sw: screen.width, sh: screen.height, touch: (navigator.maxTouchPoints || 0) > 0, taal: navigator.language || '' },
          browser: navigator.userAgent, screenshot: noshot && noshot.checked ? null : shot
        };
        fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
          .then(function (r) { return r.json(); })
          .then(function (d) { if (!d.ok) throw new Error(d.error || 'fout'); close(false); thanks(); })
          .catch(function () { send.disabled = false; send.textContent = t.send; err.textContent = t.fail; });
      });
    });
  }

  function thanks() {
    var n = el('div', { id: 'ac-rv-thx', role: 'status', 'aria-live': 'polite' }, '<div class="seal" aria-hidden="true">✓</div><div><b>' + t.thx + '</b>' + t.thx2 + '</div>');
    document.body.appendChild(n);
    requestAnimationFrame(function () { n.classList.add('in'); });
    setTimeout(function () {
      n.classList.remove('in');
      setTimeout(function () { n.remove(); btn.classList.remove('hide'); btn.focus({ preventScroll: true }); }, 400);
    }, 3000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
