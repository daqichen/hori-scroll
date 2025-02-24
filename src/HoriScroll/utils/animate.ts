import { HoriScrollClass } from '../types/HoriScroll';

export const ANIMATION_SPEED_DICT = {
  FAST: 1,
  MEDIUM: 0.5,
  SLOW: 0.25,
} as const;

export type ANIMATION_SPEED_TYPE = keyof typeof ANIMATION_SPEED_DICT;

type ANIMATION_SPEED = (typeof ANIMATION_SPEED_DICT)[ANIMATION_SPEED_TYPE];

export function Animation(
  scroller: HTMLDivElement,
  animationSpeed: ANIMATION_SPEED,
  styleTokens: HoriScrollClass.PropsWithChildren['styles'],
  animationEnabled: boolean,
) {
  const { scrollWidth } = scroller;

  /**
   * The interval id returned by setInterval
   */
  let interval: ReturnType<typeof setInterval>;
  const intervalTime = 10;

  const abortController = new AbortController();
  const { signal } = abortController;

  let mouseDown = false;
  let startX = 0,
    scrollLeft = 0;

  const paddingOffset = Math.floor(
    (styleTokens?.gapBetweenElementsInPixels ?? 24) / 2,
  );

  /**
   * Initialize the animation
   */
  const init = () => {
    overrideStyleTokens();
    crossBrowserSupport();
    if (
      animationEnabled &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      interval = setInterval(shiftLeft, intervalTime);
      addListeners();
    }
  };

  const overrideStyleTokens = () => {
    if (scroller.parentElement) {
      // scroller.scrollLeft = 0;
      if (styleTokens?.buttonBackground) {
        scroller.parentElement.style.setProperty(
          '--horiscroll-li-button-surface',
          styleTokens.buttonBackground,
        );
      }
      if (styleTokens?.background) {
        scroller.parentElement.style.setProperty(
          '--horiscroll-inner-list-bg',
          styleTokens.background,
        );
      }
      if (styleTokens?.color) {
        scroller.parentElement.style.setProperty(
          '--horiscroll-text',
          styleTokens.color,
        );
      }
      if (styleTokens?.gapBetweenElementsInPixels) {
        scroller.parentElement.style.setProperty(
          '--horiscroll-gap',
          styleTokens.gapBetweenElementsInPixels + 'px',
        );
      }
    }
  };

  const crossBrowserSupport = () => {
    const totalExistingTagsHTMLCollection =
      document.getElementsByTagName('script');
    const existingMaterialSymbolsTag = Array.from(
      totalExistingTagsHTMLCollection,
    ).find((item) =>
      item.src?.includes(
        'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js',
      ),
    );
    if (existingMaterialSymbolsTag) return;
    const scriptTag = document.createElement('script');
    scriptTag.src =
      'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
    document.body.appendChild(scriptTag);
  };

  const getM41 = () => {
    return new WebKitCSSMatrix(scroller.style.transform).m41;
  };

  const setScrollTranslate = (offset: number) => {
    scroller.style.transform = `translateX(${offset}px)`;
  };

  const drag = (e: MouseEvent) => {
    e.preventDefault();
    if (!mouseDown) return;
    const x = e.pageX - scroller.offsetLeft;
    const offset = x - startX;
    if (offset * -1 > scrollWidth / 2 + paddingOffset * 2) {
      return setScrollTranslate(offset + scrollWidth / 2 + paddingOffset);
    }
    setScrollTranslate(offset);
    // console.log('while dragging', offset, x, startX);
  };

  const shiftLeft = () => {
    if (getM41() * -1 > scrollWidth / 2 + paddingOffset * 2) {
      return setScrollTranslate(
        getM41() + scrollWidth / 2 - animationSpeed + paddingOffset,
      );
    }
    setScrollTranslate(getM41() - animationSpeed);
  };

  const startDragging = (e: MouseEvent) => {
    mouseDown = true;
    scrollLeft = getM41();
    startX = e.pageX - scroller.offsetLeft - scrollLeft;

    // console.log('start dragging', scroller.offsetLeft, startX);
  };

  const stopDragging = () => {
    mouseDown = false;
  };

  const addListeners = () => {
    scroller.addEventListener('pointermove', (e) => drag(e), { signal });
    scroller.addEventListener('pointerdown', (e) => startDragging(e), {
      signal,
    });
    scroller.addEventListener('pointerup', stopDragging, { signal });
    scroller.addEventListener('pointerleave', stopDragging, { signal });
    scroller.addEventListener(
      'pointerleave',
      () => {
        interval = setInterval(shiftLeft, intervalTime);
      },
      { signal },
    );

    scroller.addEventListener(
      'pointerover',
      () => {
        clearInterval(interval);
      },
      { signal },
    );
  };

  /**
   * Reset scroll to start
   */
  const reset = () => {
    setScrollTranslate(0);
    mouseDown = false;
    startX = 0;
    scrollLeft = 0;
  };

  /**
   * Called when unmounting
   */
  const destroy = () => {
    clearInterval(interval);
    reset();
    abortController.abort();
  };

  return {
    init,
    reset,
    destroy,
  };
}

/**
 *
 * Called to update the scroll location
 */
// const animate = () => {
//   if (scroller.scrollLeft !== scrollWidth) {
//     scroller.scrollTo({
//       left: scroller.scrollLeft + animationSpeed / window.devicePixelRatio,
//       behavior: 'instant',
//     });
//   }
// };

/**
 * Listen to activities in the browser
 */
// const listen = () => {
//   scroller.addEventListener('scroll', () => {
//     if (scroller.scrollLeft >= scrollWidth / 5) {
//       return scroller.scrollTo(
//         // scroller.scrollLeft - trueHalfway + threshold,
//         scroller.scrollLeft - scrollWidth / 5,
//         0,
//       );
//     }
//     // else if (scroller.scrollLeft < threshold) {
//     //   return scroller.scrollTo(scroller.scrollLeft + trueHalfway, 0);
//     // }
//   });

//   scroller.addEventListener('mouseleave', () => {
//     interval = setInterval(() => {
//       animate();
//     }, 20);
//   });

//   scroller.addEventListener('mouseover', () => {
//     clearInterval(interval);
//   });
// };
