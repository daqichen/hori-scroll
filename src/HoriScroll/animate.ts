export const ANIMATION_SPEED_DICT = {
  FAST: 1.5,
  MEDIUM: 1,
  SLOW: 0.75,
} as const;

export type ANIMATION_SPEED_TYPE = keyof typeof ANIMATION_SPEED_DICT;

type ANIMATION_SPEED = (typeof ANIMATION_SPEED_DICT)[ANIMATION_SPEED_TYPE];

export const animate = (
  scroller: Element,
  scrollerScrollWidth: number,
  speed: ANIMATION_SPEED,
) => {
  if (scroller.scrollLeft !== scrollerScrollWidth) {
    return scroller.scrollTo(scroller.scrollLeft + speed, 0);
  }
  // console.log('edge');
};

export const applyInitAnimation = (
  scroller: HTMLDivElement | null,
  animationSpeed: ANIMATION_SPEED,
) => {
  if (!scroller) return;
  const scrollerScrollWidth = scroller.scrollWidth;
  const threshold = 1;

  let interval = setInterval(() => {
    animate(scroller, scrollerScrollWidth, animationSpeed);
  }, 25);

  scroller.scrollTo(threshold + 1, 0);

  const trueHalfway = scroller.clientWidth - threshold;
  // trigger for infinite scroll
  scroller.addEventListener('scroll', () => {
    if (scroller.scrollLeft > trueHalfway) {
      return scroller.scrollTo(
        scroller.scrollLeft - trueHalfway + threshold,
        0,
      );
    } else if (scroller.scrollLeft < threshold) {
      return scroller.scrollTo(scroller.scrollLeft + trueHalfway, 0);
    }
  });

  // triggers to pause and continue with animation
  scroller.addEventListener('mouseleave', () => {
    interval = setInterval(() => {
      animate(scroller, scrollerScrollWidth, animationSpeed);
    }, 25);
  });
  scroller.addEventListener('mouseover', () => {
    clearInterval(interval);
  });
  // });
};
