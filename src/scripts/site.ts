/**
 * Site behaviour: reveals, mobile drawer, pausing decorative loops off screen, project tabs, enquiry form.
 */

function reveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], [data-art]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        io.unobserve(el);
        // [data-reveal] owns `transition`: hand it back to the element once the reveal is done
        if (el.hasAttribute('data-reveal')) {
          const d = Number(el.style.getPropertyValue('--d') || 0);
          setTimeout(() => el.removeAttribute('data-reveal'), 1100 + d * 90);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

function drawer() {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-drawer]');
  if (!btn || !panel) return;
  const root = document.documentElement;
  const set = (open: boolean) => {
    root.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    panel.toggleAttribute('inert', !open);
  };
  panel.setAttribute('inert', '');
  btn.addEventListener('click', () => set(!root.classList.contains('menu-open')));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) {
      set(false);
      btn.focus();
    }
  });
  matchMedia('(min-width: 1081px)').addEventListener('change', (m) => m.matches && set(false));
}

/** Decorative CSS loops inside [data-loop] pause while off screen. */
function loops() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) (e.target as HTMLElement).classList.toggle('is-paused', !e.isIntersecting);
  });
  document.querySelectorAll('[data-loop]').forEach((el) => io.observe(el));
}

/** Project gallery tabs (WAI-ARIA tabs: click, arrow keys, Home/End) + links that open a given tab. */
function tabs() {
  const root = document.querySelector<HTMLElement>('[data-tabs]');
  if (!root) return;
  const btns = [...root.querySelectorAll<HTMLButtonElement>('[data-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
  const select = (id: string, focus = false) => {
    btns.forEach((b) => {
      const on = b.dataset.tab === id;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    panels.forEach((p) => (p.hidden = p.dataset.panel !== id));
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => select(b.dataset.tab!));
    b.addEventListener('keydown', (e) => {
      const n = btns.length;
      const to =
        e.key === 'ArrowRight'
          ? (i + 1) % n
          : e.key === 'ArrowLeft'
            ? (i - 1 + n) % n
            : e.key === 'Home'
              ? 0
              : e.key === 'End'
                ? n - 1
                : -1;
      if (to < 0) return;
      e.preventDefault();
      select(btns[to].dataset.tab!, true);
    });
  });
  document
    .querySelectorAll<HTMLAnchorElement>('[data-tab-link]')
    .forEach((a) => a.addEventListener('click', () => select(a.dataset.tabLink!)));
}

function form() {
  const f = document.querySelector<HTMLFormElement>('[data-form]');
  if (!f) return;
  const status = f.querySelector<HTMLElement>('[data-status]')!;
  const hint = f.querySelector<HTMLElement>('#f-contact-hint')!;
  const send = f.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const field = (n: string) => f.elements.namedItem(n) as HTMLInputElement;
  const say = (msg: string, error = false) => {
    status.textContent = msg;
    status.classList.toggle('is-error', error);
  };
  f.addEventListener('input', (e) => (e.target as HTMLElement).removeAttribute('aria-invalid'));
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bad: HTMLElement[] = [];
    for (const n of ['type', 'name', 'message']) if (!field(n).value.trim()) bad.push(field(n));
    const phone = field('phone').value.trim();
    const email = field('email').value.trim();
    const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    const phoneOk = !phone || phone.replace(/\D/g, '').length >= 9;
    const reach = (phone && phoneOk) || (email && emailOk);
    if (!emailOk || (!reach && !phone)) bad.push(field('email'));
    if (!phoneOk || (!reach && !email)) bad.push(field('phone'));
    hint.classList.toggle('is-error', !reach);
    bad.forEach((el) => el.setAttribute('aria-invalid', 'true'));
    if (bad.length) {
      say('Doplňte prosím označená pole.', true);
      bad[0].focus();
      return;
    }
    send.disabled = true;
    say('Odesíláme…');
    try {
      const body = Object.fromEntries(new FormData(f).entries());
      const res = await fetch(f.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !out.ok) throw new Error(out.message || 'Poptávku se nepodařilo odeslat.');
      f.reset();
      say(out.message || 'Děkujeme, poptávka je odeslaná. Ozveme se vám.');
    } catch (err) {
      say(
        `${(err as Error).message} Zavolejte nám prosím na +420 608 075 884 nebo napište na krofton@krofton.cz.`,
        true,
      );
    } finally {
      send.disabled = false;
    }
  });
}

reveals();
drawer();
loops();
tabs();
form();
