export type Breakpoint = {
  breakpointKeyName: BreakpointKeyName;
  widthUpperBound: number; // px
};

export type BreakpointKeyName =
  | 'mobile'
  | 'tablet'
  | 'desktop-sm'
  | 'desktop-lg';

export const BREAKPOINT_MOBILE: Breakpoint = {
  breakpointKeyName: 'mobile',
  widthUpperBound: 484
};

export const BREAKPOINT_TABLET: Breakpoint = {
  breakpointKeyName: 'tablet',
  widthUpperBound: 812
};

export const BREAKPOINT_DESKTOP_SMALL: Breakpoint = {
  breakpointKeyName: 'desktop-sm',
  widthUpperBound: 1284
};

export const BREAKPOINT_DESKTOP_LARGE: Breakpoint = {
  breakpointKeyName: 'desktop-lg',
  widthUpperBound: 1496
};
