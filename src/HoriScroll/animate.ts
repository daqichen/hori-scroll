export const animate = (scroller: Element, scrollerScrollWidth: number) => {
  if (scroller.scrollLeft !== scrollerScrollWidth) {
    return scroller.scrollTo(scroller.scrollLeft + 1, 0);
  }
};

export const applyInitAnimation = (scroller: HTMLDivElement | null) => {
  // const scrollers = document.querySelectorAll(
  //   '.horiscroll-animation-container',
  // );
  // scrollers.forEach((scroller) => {
  //
  if (!scroller) return;
  // auto scrolling
  const scrollerScrollWidth = scroller.scrollWidth;
  console.log(scroller.scrollWidth, scroller.scrollLeft);

  let interval = setInterval(() => {
    animate(scroller, scrollerScrollWidth);
  }, 25);

  // trigger for infinite scroll
  scroller.addEventListener('scroll', () => {
    const halfway = scroller.scrollWidth / 2 - 1;
    if (scroller.scrollLeft > halfway) {
      return scroller.scrollTo(scroller.scrollLeft - halfway, 0);
    }

    // make reverse also infinitely scrollable
    if (scroller.scrollLeft < 0) {
      console.log('here in scroll handler!', scroller.scrollLeft);
      return scroller.scrollTo(scroller.scrollLeft + halfway, 0);
    }
  });
  // triggers to pause and continue with animation
  scroller.addEventListener('mouseleave', () => {
    interval = setInterval(() => {
      animate(scroller, scrollerScrollWidth);
    }, 25);
  });
  // scroller.addEventListener('load', () => {
  //   interval = setInterval(() => {
  //     animate(scroller, scrollerScrollWidth);
  //   }, 25);
  // });
  scroller.addEventListener('mouseover', () => {
    clearInterval(interval);
  });
  // });
};
