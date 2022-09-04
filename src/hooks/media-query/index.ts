import { useEffect, useState } from 'react';

/** REPRESENTS BP UPPER BOUND */
export enum CouchGagBreakpoints {
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

type InlineMediaQueryReturnType = {
  breakpoint: CouchGagBreakpoints;
  prevValueState?: InlineMediaQueryReturnType;
  opsState: { loading: boolean; ready: boolean };
  width: number;
};

export const useInlineMediaQuery = (): InlineMediaQueryReturnType => {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const isServer = typeof window === 'undefined';

  const [res, setRes] = useState<InlineMediaQueryReturnType | undefined>(
    isServer
      ? undefined
      : {
          breakpoint: window.matchMedia('(max-width: 600px)').matches
            ? CouchGagBreakpoints.MOBILE
            : CouchGagBreakpoints.DESKTOP,
          opsState: { loading, ready },
          width: window.screen.width
        }
  );

  function handleScreenResize(event: MediaQueryListEvent) {
    setLoading(true);
    setReady(false);
    setRes((p) => ({
      breakpoint: event.matches
        ? CouchGagBreakpoints.MOBILE
        : CouchGagBreakpoints.DESKTOP,
      opsState: { ready, loading },
      width: document.body.clientWidth,
      prevValueState: p
    }));
    setLoading(false);
    setReady(true);
  }

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia('(max-width: 600px)');

    mediaQueryMobile.addEventListener('change', handleScreenResize);
    setLoading(false);
    setReady(true);

    return () => {
      mediaQueryMobile.removeEventListener('change', handleScreenResize);
    };
  }, []);

  return res
    ? res
    : {
        breakpoint: CouchGagBreakpoints.DESKTOP,
        opsState: { loading: true, ready: false },
        width: 1000
      };
};
