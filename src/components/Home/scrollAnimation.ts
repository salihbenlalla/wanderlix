export const animateScroll = (element: HTMLElement) => {
  const elementTop = element.getBoundingClientRect().top;
  const startingY = window.pageYOffset;
  const duration = 500; // 2 seconds
  let start: number | null = null;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);
    const deltaY = Math.round(elementTop * percent);
    window.scrollTo(0, startingY + deltaY);
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
};
