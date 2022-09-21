import { useEffect, useState } from 'react';

export const useElementViewableCheck = (element: HTMLElement) => {
  function isInView(e: HTMLElement): boolean {
    const cTop = 0;
    const cBottom = cTop + window.screen.height;

    const eTop = e.offsetTop;
    const eBottom = eTop + e.clientHeight;

    const isTotal = eTop >= cTop && eBottom <= cBottom;
    const isPartial =
      (eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom);

    return isTotal || isPartial;
  }

  const [viewable, setIsInView] = useState(isInView(element));

  function updateIsViewableOnScroll() {
    if (isInView(element) !== viewable) {
      setIsInView(isInView(element));
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', updateIsViewableOnScroll);
    return document.removeEventListener('scroll', updateIsViewableOnScroll);
  }, []);

  return { viewable };
};
