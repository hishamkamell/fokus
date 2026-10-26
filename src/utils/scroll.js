/**
 * Smoothly scrolls to an element by id, centering it in the viewport.
 * Optionally focuses a follow-up element once the scroll settles
 * (used to move focus into the preorder form's first field).
 */
export function scrollToId(id, { focusId, block = 'start' } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block });

  if (focusId) {
    window.setTimeout(() => {
      document.getElementById(focusId)?.focus({ preventScroll: true });
    }, 450);
  }
}
