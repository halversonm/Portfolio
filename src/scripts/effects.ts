/**
 * Site-wide motion + interaction layer.
 *
 * Runs on every `astro:page-load` (first load AND every ClientRouter navigation),
 * and tears everything down on `astro:before-swap`, so nothing leaks between pages.
 * Every effect is a no-op if its markup isn't on the page, and the heavier ones
 * are skipped for `prefers-reduced-motion` / touch devices.
 */

type Cleanup = () => void;

const mq = (q: string) => window.matchMedia(q).matches;
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

let cleanups: Cleanup[] = [];
const onCleanup = (fn: Cleanup) => cleanups.push(fn);

/** Fire `fn` at most once per animation frame. */
function frameThrottle(fn: () => void) {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fn();
    });
  };
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */
function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  targets.forEach((el) => io.observe(el));
  onCleanup(() => io.disconnect());
}

/* ------------------------------------------------------------------ */
/* Scroll-linked: progress bar, hero parallax, process timeline        */
/* ------------------------------------------------------------------ */
function initScrollLinked(reduceMotion: boolean) {
  if (reduceMotion) return;

  const bar = document.querySelector<HTMLElement>(".scroll-progress");
  const parallax = document.querySelector<HTMLElement>("[data-parallax]");
  const timeline = document.querySelector<HTMLElement>("[data-timeline]");
  const steps = timeline ? [...timeline.querySelectorAll<HTMLElement>(".timeline-step")] : [];

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    if (bar) bar.style.setProperty("--sp", max > 0 ? String(clamp(y / max, 0, 1)) : "0");

    if (parallax) {
      // only touch the DOM while the hero is on screen
      const h = parallax.offsetHeight;
      if (y < h + 100) parallax.style.setProperty("--sy", String(Math.round(y)));
    }

    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top of the list reaches 70% of the viewport, 1 when its bottom does
      const start = vh * 0.7;
      const p = clamp((start - rect.top) / Math.max(1, rect.height), 0, 1);
      timeline.style.setProperty("--p", p.toFixed(3));
      steps.forEach((step) => {
        const r = step.getBoundingClientRect();
        step.classList.toggle("is-lit", r.top < start);
      });
    }
  };

  const tick = frameThrottle(update);
  update();
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  onCleanup(() => {
    window.removeEventListener("scroll", tick);
    window.removeEventListener("resize", tick);
  });
}

/* ------------------------------------------------------------------ */
/* Back-to-top button                                                  */
/* ------------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.querySelector<HTMLButtonElement>("[data-to-top]");
  if (!btn) return;
  const update = () => btn.classList.toggle("is-shown", window.scrollY > 500);
  const tick = frameThrottle(update);
  const toTop = () => window.scrollTo({ top: 0 }); // smooth via CSS, unless reduced motion

  update();
  window.addEventListener("scroll", tick, { passive: true });
  btn.addEventListener("click", toTop);
  onCleanup(() => {
    window.removeEventListener("scroll", tick);
    btn.removeEventListener("click", toTop);
  });
}

/* ------------------------------------------------------------------ */
/* Count-up stats                                                      */
/* ------------------------------------------------------------------ */
function initCountUp(reduceMotion: boolean) {
  const els = document.querySelectorAll<HTMLElement>("[data-count]");
  if (!els.length) return;

  const render = (el: HTMLElement, value: number) => {
    el.textContent = `${el.dataset.prefix ?? ""}${Math.round(value)}${el.dataset.suffix ?? ""}`;
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => render(el, Number(el.dataset.count)));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        const to = Number(el.dataset.count);
        const duration = 1400;
        const t0 = performance.now();
        const step = (now: number) => {
          const t = clamp((now - t0) / duration, 0, 1);
          render(el, to * (1 - Math.pow(1 - t, 3))); // easeOutCubic
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => {
    render(el, 0);
    io.observe(el);
  });
  onCleanup(() => io.disconnect());
}

/* ------------------------------------------------------------------ */
/* Pointer effects (fine pointers only): spotlight, tilt     */
/* ------------------------------------------------------------------ */
function initPointerEffects(reduceMotion: boolean) {
  if (!mq("(hover: hover) and (pointer: fine)")) return;

  // Cursor spotlight on cards
  document.querySelectorAll<HTMLElement>(".spotlight").forEach((el) => {
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", move);
    onCleanup(() => el.removeEventListener("pointermove", move));
  });

  if (reduceMotion) return;

  // Mouse-tilt (hero deck): eases toward the pointer, then settles back flat
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    const area = (el.closest("[data-tilt-area]") as HTMLElement | null) ?? el;
    const max = Number(el.dataset.tilt) || 7;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.setProperty("--ry", `${cx.toFixed(2)}deg`);
      el.style.setProperty("--rx", `${cy.toFixed(2)}deg`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.01 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * max;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 2 * max;
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    onCleanup(() => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Hover full-page scroll preview on project cards                     */
/* ------------------------------------------------------------------ */
function initScrollPreview(reduceMotion: boolean) {
  if (reduceMotion || !mq("(hover: hover) and (pointer: fine)")) return;

  document.querySelectorAll<HTMLElement>("[data-preview-host]").forEach((host) => {
    const layer = host.querySelector<HTMLElement>(".preview-layer");
    const img = layer?.querySelector<HTMLImageElement>("img[data-src]");
    if (!layer || !img) return;

    const measure = () => {
      const dist = img.offsetHeight - layer.offsetHeight;
      if (dist <= 0) return;
      host.style.setProperty("--dist", `${dist}px`);
      host.style.setProperty("--dur", `${clamp(dist / 190, 2.5, 9).toFixed(1)}s`);
    };

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      img.addEventListener("load", measure, { once: true });
      img.src = img.dataset.src!;
      if (img.complete) measure();
    };

    const enter = () => {
      load();
      if (img.complete && img.naturalHeight) {
        measure();
        host.classList.add("is-previewing");
      } else {
        img.addEventListener("load", () => host.matches(":hover") && host.classList.add("is-previewing"), { once: true });
      }
    };
    const leave = () => host.classList.remove("is-previewing");

    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("focusin", enter);
    host.addEventListener("focusout", leave);
    onCleanup(() => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("focusin", enter);
      host.removeEventListener("focusout", leave);
      host.classList.remove("is-previewing");
    });
  });
}

/* ------------------------------------------------------------------ */
/* Hero: typewriter headline + stacked project deck                    */
/* ------------------------------------------------------------------ */
function initTypewriter(reduceMotion: boolean) {
  const el = document.getElementById("hero-typewriter");
  if (!el || reduceMotion) return;
  // The not-yet-typed remainder stays in the flow (invisible) so the headline
  // doesn't re-wrap and push the page around while it types.
  const rest = document.getElementById("hero-typewriter-rest");
  const text = el.dataset.text ?? el.textContent ?? "";
  let i = 0;
  const render = () => {
    el.textContent = text.slice(0, i);
    if (rest) rest.textContent = text.slice(i);
  };
  render();
  let timer = window.setTimeout(function typeNext() {
    i++;
    render();
    if (i < text.length) timer = window.setTimeout(typeNext, 45);
  }, 300);
  onCleanup(() => clearTimeout(timer));
}

function initDeck(reduceMotion: boolean) {
  const deck = document.querySelector<HTMLElement>("[data-deck]");
  if (!deck) return;
  const slides = [...deck.querySelectorAll<HTMLElement>("[data-slide]")];
  const dots = [...document.querySelectorAll<HTMLElement>("[data-deck-dot]")];
  const caption = document.querySelector<HTMLElement>("[data-deck-caption]");
  const n = slides.length;
  let index = 0;
  let timer: number | undefined;

  const show = (next: number) => {
    index = (next + n) % n;
    slides.forEach((s, i) => {
      const pos = (i - index + n) % n;
      s.dataset.pos = String(pos);
      s.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    if (caption) caption.textContent = slides[index].dataset.caption ?? "";
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (reduceMotion || n < 2) return;
    timer = window.setInterval(() => show(index + 1), 4800);
  };

  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      show(i);
      start();
    }),
  );
  // clicking a card peeking out behind the front one brings it forward
  slides.forEach((s, i) =>
    s.addEventListener("click", (e) => {
      if (s.dataset.pos !== "0") {
        e.preventDefault();
        show(i);
        start();
      }
    }),
  );

  // Swipe left/right to move through the cards (touch & pen; mouse keeps click + dots).
  // CSS `touch-action: pan-y` on the deck lets the page still scroll vertically.
  let swipeX = 0;
  let swipeY = 0;
  let swiping = false;
  deck.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    swiping = true;
    swipeX = e.clientX;
    swipeY = e.clientY;
  });
  deck.addEventListener("pointerup", (e) => {
    if (!swiping) return;
    swiping = false;
    const dx = e.clientX - swipeX;
    const dy = e.clientY - swipeY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      show(index + (dx < 0 ? 1 : -1)); // swipe left = next, swipe right = previous
      start();
    }
  });
  deck.addEventListener("pointercancel", () => (swiping = false));

  deck.addEventListener("pointerenter", stop);
  deck.addEventListener("pointerleave", start);
  show(0);
  start();
  onCleanup(stop);
}

/* ------------------------------------------------------------------ */
/* Orchestration                                                       */
/* ------------------------------------------------------------------ */
function init() {
  const reduceMotion = mq("(prefers-reduced-motion: reduce)");
  initReveal();
  initScrollLinked(reduceMotion);
  initBackToTop();
  initCountUp(reduceMotion);
  initPointerEffects(reduceMotion);
  initScrollPreview(reduceMotion);
  initTypewriter(reduceMotion);
  initDeck(reduceMotion);
}

function teardown() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
}

export function setupEffects() {
  document.addEventListener("astro:page-load", init);
  document.addEventListener("astro:before-swap", teardown);
}
