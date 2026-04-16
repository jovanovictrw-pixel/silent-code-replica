import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollEngine
 * ───────────────
 * A single requestAnimationFrame loop that powers all scroll-driven animations:
 *
 * 1. Momentum Scrubbing (lerp inertia) — desktop only, respects prefers-reduced-motion
 * 2. Horizontal Text Ticker — velocity-driven translateX with proper wrap-around
 * 3. Scale-From-Center on Product Cards — .sc-prod-card scale based on viewport center distance
 * 4. Sticky Section Title Scrub — opacity fade on .sc-sticky-title within its section
 * 5. Parallax Depth Stack — three-speed parallax via CSS variables
 * 6. Progress Bar — .sc-progress-bar width tracks total page scroll
 * 7. Velocity-Based Blur — blur(2px) on fast scroll, fades over 150ms
 */

interface ScrollState {
  targetY: number;
  currentY: number;
  velocity: number;
  lastScrollY: number;
  lastTime: number;
  tickerX: number;
  isScrolling: boolean;
  scrollTimeout: ReturnType<typeof setTimeout> | null;
  rafId: number | null;
  isMobile: boolean;
  prefersReduced: boolean;
}

export function useScrollEngine() {
  const stateRef = useRef<ScrollState>({
    targetY: 0,
    currentY: 0,
    velocity: 0,
    lastScrollY: 0,
    lastTime: performance.now(),
    tickerX: 0,
    isScrolling: false,
    scrollTimeout: null,
    rafId: null,
    isMobile: false,
    prefersReduced: false,
  });

  const lerpEnabled = useRef(true);

  const init = useCallback(() => {
    const s = stateRef.current;

    // Detect mobile & prefers-reduced-motion
    s.isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    s.prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lerpEnabled.current = !s.isMobile && !s.prefersReduced;

    // Set initial values
    s.targetY = window.scrollY;
    s.currentY = window.scrollY;
    s.lastScrollY = window.scrollY;

    // If lerp is enabled, lock native scroll to body and use wrapper transform
    if (lerpEnabled.current) {
      const wrapper = document.querySelector(".sc-lerp-wrapper") as HTMLElement;
      if (wrapper) {
        document.body.style.height = `${wrapper.scrollHeight}px`;
        wrapper.style.position = "fixed";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        wrapper.style.width = "100%";
        wrapper.style.willChange = "transform";

        // ResizeObserver keeps body height in sync when content changes
        const ro = new ResizeObserver(() => {
          document.body.style.height = `${wrapper.scrollHeight}px`;
        });
        ro.observe(wrapper);
        // Store cleanup ref on element (cheap, avoids closure complexity)
        (wrapper as HTMLElement & { _ro?: ResizeObserver })._ro = ro;
      }
    }
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    const now = performance.now();
    const dt = Math.min(now - s.lastTime, 50); // cap delta to avoid jumps
    s.lastTime = now;

    // ─── Track velocity ───
    const currentScroll = window.scrollY;
    const deltaY = currentScroll - s.lastScrollY;
    s.velocity = (deltaY / Math.max(dt, 1)) * 16; // normalize to ~per-frame
    s.lastScrollY = currentScroll;
    s.targetY = currentScroll;

    // ─── #1 Momentum Scrubbing (Lerp) ───
    if (lerpEnabled.current) {
      const lerpFactor = 0.09; // 9% per frame — silky
      s.currentY += (s.targetY - s.currentY) * lerpFactor;

      // Snap if close enough
      if (Math.abs(s.targetY - s.currentY) < 0.5) {
        s.currentY = s.targetY;
      }

      const wrapper = document.querySelector(".sc-lerp-wrapper") as HTMLElement;
      if (wrapper) {
        wrapper.style.transform = `translate3d(0, ${-s.currentY}px, 0)`;
      }
    } else {
      s.currentY = currentScroll;
    }

    const scrollY = s.currentY;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - vh;

    // ─── #2 Horizontal Text Ticker (with wrap-around) ───
    const tickerTracks = document.querySelectorAll(".sc-ticker-track") as NodeListOf<HTMLElement>;
    if (tickerTracks.length > 0) {
      const speed = s.velocity * 2.5;
      s.tickerX -= speed;
      // Idle drift
      s.tickerX -= 0.3;

      // Wrap-around: reset by one text-span width to avoid infinite drift
      const firstTrack = tickerTracks[0];
      const firstSpan = firstTrack.querySelector(".sc-ticker-text") as HTMLElement;
      if (firstSpan) {
        const spanWidth = firstSpan.offsetWidth;
        if (spanWidth > 0 && s.tickerX < -(spanWidth)) {
          s.tickerX += spanWidth;
        }
      }

      tickerTracks.forEach((track) => {
        track.style.transform = `translate3d(${s.tickerX}px, 0, 0)`;
      });
    }

    // ─── #3 Scale-From-Center on Product Cards ───
    if (!s.prefersReduced) {
      const cards = document.querySelectorAll(".sc-prod-card") as NodeListOf<HTMLElement>;
      const viewCenter = vh / 2;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewCenter);
        const maxDist = vh;
        const normalizedDist = Math.min(distance / maxDist, 1);
        const scale = 1 - normalizedDist * 0.08;
        const clampedScale = Math.max(0.92, Math.min(1, scale));

        if (rect.top < vh && rect.bottom > 0) {
          card.style.transform = `scale(${clampedScale})`;
          // Transition is defined in CSS — do NOT set it inline on every frame
        }
      });
    }

    // ─── #4 Sticky Section Title Scrub ───
    const stickyTitles = document.querySelectorAll(".sc-sticky-title") as NodeListOf<HTMLElement>;
    stickyTitles.forEach((title) => {
      const section = title.closest("section") as HTMLElement;
      if (!section) return;
      const sectionRect = section.getBoundingClientRect();
      const sectionBottom = sectionRect.bottom;
      const sectionHeight = sectionRect.height;
      const fadeStart = sectionHeight * 0.8;
      const progress = sectionHeight - sectionBottom;

      if (progress > fadeStart) {
        const fadeProgress = (progress - fadeStart) / (sectionHeight * 0.2);
        title.style.opacity = `${Math.max(0, 1 - fadeProgress)}`;
      } else {
        title.style.opacity = "1";
      }
    });

    // ─── #5 Parallax Depth Stack ───
    if (!s.prefersReduced) {
      const parallaxSections = document.querySelectorAll(".sc-parallax-section") as NodeListOf<HTMLElement>;
      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          const offset = rect.top;
          section.style.setProperty("--parallax-bg", `${offset * 0.3}px`);
          section.style.setProperty("--parallax-mid", `${offset * 0.6}px`);
          section.style.setProperty("--parallax-fg", `0px`);
        }
      });
    }

    // ─── #6 Progress Bar ───
    const progressBar = document.querySelector(".sc-progress-bar") as HTMLElement;
    if (progressBar && docHeight > 0) {
      const progress = (scrollY / docHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // ─── #7 Velocity-Based Blur ───
    if (!s.prefersReduced) {
      const blurTarget = document.querySelector(".sc-blur-target") as HTMLElement;
      if (blurTarget) {
        const absVelocity = Math.abs(s.velocity);
        if (absVelocity > 3) {
          const blurAmount = Math.min(2, absVelocity * 0.15);
          blurTarget.style.filter = `blur(${blurAmount}px)`;
          blurTarget.style.transition = "filter 0ms";
          s.isScrolling = true;

          if (s.scrollTimeout) clearTimeout(s.scrollTimeout);
          s.scrollTimeout = setTimeout(() => {
            blurTarget.style.transition = "filter 150ms ease-out";
            blurTarget.style.filter = "blur(0px)";
            s.isScrolling = false;
          }, 50);
        }
      }
    }

    // Continue loop
    s.rafId = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    init();

    // Start rAF loop
    stateRef.current.rafId = requestAnimationFrame(tick);

    // Recalculate on resize
    const onResize = () => {
      const s = stateRef.current;
      s.isMobile = window.innerWidth < 768 || "ontouchstart" in window;
      lerpEnabled.current = !s.isMobile && !s.prefersReduced;

      const wrapper = document.querySelector(".sc-lerp-wrapper") as HTMLElement & { _ro?: ResizeObserver };
      if (lerpEnabled.current) {
        if (wrapper) {
          document.body.style.height = `${wrapper.scrollHeight}px`;
          wrapper.style.position = "fixed";
          wrapper.style.top = "0";
          wrapper.style.left = "0";
          wrapper.style.width = "100%";
        }
      } else {
        if (wrapper) {
          document.body.style.height = "";
          wrapper.style.position = "";
          wrapper.style.top = "";
          wrapper.style.left = "";
          wrapper.style.width = "";
          wrapper.style.transform = "";
        }
      }
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Listen for reduced motion changes
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.prefersReduced = e.matches;
      lerpEnabled.current = !stateRef.current.isMobile && !e.matches;
      onResize();
    };
    mq.addEventListener("change", onMotionChange);

    return () => {
      const s = stateRef.current;
      if (s.rafId) cancelAnimationFrame(s.rafId);
      if (s.scrollTimeout) clearTimeout(s.scrollTimeout);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMotionChange);

      // Clean up lerp styles + ResizeObserver
      document.body.style.height = "";
      const wrapper = document.querySelector(".sc-lerp-wrapper") as HTMLElement & { _ro?: ResizeObserver };
      if (wrapper) {
        wrapper._ro?.disconnect();
        wrapper.style.position = "";
        wrapper.style.top = "";
        wrapper.style.left = "";
        wrapper.style.width = "";
        wrapper.style.transform = "";
        wrapper.style.willChange = "";
      }
    };
  }, [init, tick]);
}
