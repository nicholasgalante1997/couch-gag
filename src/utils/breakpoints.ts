import {
  BREAKPOINT_DESKTOP_LARGE,
  BREAKPOINT_DESKTOP_SMALL,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET
} from '../styles/breakpoints';

export function reduceBreakpointOnWindowWidth() {
  if (typeof window === 'undefined') {
    return BREAKPOINT_DESKTOP_SMALL;
  }
  const availWidth = window.innerWidth || document.documentElement.clientWidth;

  if (availWidth < BREAKPOINT_MOBILE.widthUpperBound) {
    return BREAKPOINT_MOBILE;
  } else if (
    availWidth >= BREAKPOINT_MOBILE.widthUpperBound &&
    availWidth < BREAKPOINT_TABLET.widthUpperBound
  ) {
    return BREAKPOINT_TABLET;
  } else if (
    availWidth >= BREAKPOINT_TABLET.widthUpperBound &&
    availWidth < BREAKPOINT_DESKTOP_SMALL.widthUpperBound
  ) {
    return BREAKPOINT_DESKTOP_SMALL;
  } else {
    return BREAKPOINT_DESKTOP_LARGE;
  }
}
