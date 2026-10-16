/** `true` si el usuario pidió menos movimiento. Seguro en SSR y en jsdom. */
export function prefersReducedMotion(win: Window | null | undefined): boolean {
  return !!win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Observa un elemento y llama a `onEnter` la primera vez que entra en pantalla. */
export function observeOnce(el: Element, onEnter: () => void, threshold = 0.2): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    onEnter();
    return () => undefined;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        onEnter();
      }
    },
    { threshold },
  );
  io.observe(el);
  return () => io.disconnect();
}
