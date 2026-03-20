/**
 * Scrolls to a React ref or DOM element with a specified offset.
 * Useful for navigating to sections hidden behind fixed headers.
 * 
 * @param {React.RefObject|HTMLElement} target - The ref or element to scroll to.
 * @param {number} offset - The offset from the top of the viewport (default: 140px).
 */
export const scrollToElementWithOffset = (target, offset = 140) => {
  const element = target?.current || target;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const top = window.scrollY + rect.top - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};
