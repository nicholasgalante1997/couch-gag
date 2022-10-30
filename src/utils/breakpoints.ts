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
  console.log({ availWidth });

  if (availWidth < BREAKPOINT_MOBILE.widthUpperBound) {
    console.log('triggering mobile switch block');
    return BREAKPOINT_MOBILE;
  } else if (
    availWidth > BREAKPOINT_MOBILE.widthUpperBound &&
    availWidth < BREAKPOINT_TABLET.widthUpperBound
  ) {
    console.log('triggering tablet switch block');
    return BREAKPOINT_TABLET;
  } else if (
    availWidth > BREAKPOINT_TABLET.widthUpperBound &&
    availWidth < BREAKPOINT_DESKTOP_SMALL.widthUpperBound
  ) {
    console.log('triggering desktop-sm switch block');
    return BREAKPOINT_DESKTOP_SMALL;
  } else {
    console.log('triggering desktop-lg switch block');
    return BREAKPOINT_DESKTOP_LARGE;
  }
}
