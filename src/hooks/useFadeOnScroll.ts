import { useEffect } from "react";

/**
 * useFadeOnScroll
 * ───────────────
 * Attaches an IntersectionObserver to all `.sc-fade-target` elements,
 * adding `.sc-visible` when they enter the viewport.
 * Replaces the duplicated observer logic across index.tsx and category pages.
 *
 * @param deps - Optional dependency array. Re-runs the observer when deps change.
 */
export function useFadeOnScroll(deps: unknown[] = []) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".sc-fade-target");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("sc-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 8) * 70}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
