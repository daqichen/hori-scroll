export const ANIMATION_SPEED_DICT = {
  FAST: 1.75,
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
};

export const applyInitAnimation = (
  scroller: HTMLDivElement | null,
  animationSpeed: ANIMATION_SPEED,
) => {
  if (!scroller) return;
  // const scrollerScrollWidth = scroller.scrollWidth;
  const scrollerScrollWidth = scroller.scrollWidth;
  // const threshold = 0.5;

  let interval = setInterval(() => {
    animate(scroller, scrollerScrollWidth, animationSpeed);
  }, 25);

  // scroller.scrollTo(threshold + 1, 0);

  // const trueHalfway = scroller.clientWidth - threshold;
  // const trueHalfway = scrollerScrollWidth / 2 - 1;
  // const trueHalfway = scrollerScrollWidth - scroller.clientWidth;
  const trueHalfway = scrollerScrollWidth / 5;

  scroller.addEventListener('scroll', () => {
    if (scroller.scrollLeft >= trueHalfway) {
      return scroller.scrollTo(
        // scroller.scrollLeft - trueHalfway + threshold,
        scroller.scrollLeft - trueHalfway,
        0,
      );
    }
    // else if (scroller.scrollLeft < threshold) {
    //   return scroller.scrollTo(scroller.scrollLeft + trueHalfway, 0);
    // }
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
