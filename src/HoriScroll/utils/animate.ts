export const ANIMATION_SPEED_DICT = {
  FAST: 2,
  MEDIUM: 1.5,
  SLOW: 1.25,
} as const;

export type ANIMATION_SPEED_TYPE = keyof typeof ANIMATION_SPEED_DICT;

type ANIMATION_SPEED = (typeof ANIMATION_SPEED_DICT)[ANIMATION_SPEED_TYPE];

export function Animation(
  scroller: HTMLDivElement,
  animationSpeed: ANIMATION_SPEED,
) {
  const { scrollWidth } = scroller;

  /**
   * The interval id returned by setInterval
   */
  let interval: ReturnType<typeof setInterval>;

  /**
   * Initialize the animation
   */
  const init = () => {
    interval = setInterval(() => {
      // if (scroller) {
      //   const frameOffset =
      //     parseInt(scroller.style?.transform?.split('(')[1]?.split('px')[0]) ||
      //     0;
      //   scroller.style.transform = `translateX(${frameOffset - 1}px)`;
      //   // console.log(horiscrollRef.current.style.transform);
      // }
      animate();
    }, 25);
    listen();
  };

  /**
   *
   * Called to update the scroll location
   */
  const animate = () => {
    if (scroller.scrollLeft !== scrollWidth) {
      scroller.scrollTo({
        left: scroller.scrollLeft + animationSpeed / window.devicePixelRatio,
        behavior: 'instant',
      });
    }
  };

  /**
   * Listen to activities in the browser
   */
  const listen = () => {
    scroller.addEventListener('scroll', () => {
      if (scroller.scrollLeft >= scrollWidth / 5) {
        return scroller.scrollTo(
          // scroller.scrollLeft - trueHalfway + threshold,
          scroller.scrollLeft - scrollWidth / 5,
          0,
        );
      }
      // else if (scroller.scrollLeft < threshold) {
      //   return scroller.scrollTo(scroller.scrollLeft + trueHalfway, 0);
      // }
    });

    scroller.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        animate();
      }, 20);
    });

    scroller.addEventListener('mouseover', () => {
      clearInterval(interval);
    });
  };

  /**
   * Reset scroll to start
   */
  const reset = () => {
    scrollTo(0, 0);
  };

  /**
   * Called when unmounting
   */
  const destroy = () => {
    clearInterval(interval);
    reset();
  };

  return {
    init,
    animate,
    listen,
    reset,
    destroy,
  };
}
