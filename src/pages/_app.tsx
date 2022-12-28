import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { config } from '@fortawesome/fontawesome-svg-core';
import ColorScales from 'color-scales';

import {
  Theme,
  Treatment,
  heller_couch_view_theme_treatment_pool
} from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';
import { Nav } from '../components';
import { ThemeProvider, BreakpointProvider } from '../contexts';
import { TextContextProvider } from '../store';
import { defaultTheme, reduceBreakpointOnWindowWidth } from '../utils';
import * as Breakpoints from '../styles/breakpoints';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@nickgdev/hellerui/lib/index.css';
import '@nickgdev/couch-gag-common-lib/lib/heller.css';
import '../App.css';

config.autoAddCss = false;

const appQueryClient = new QueryClient();

function App({ Component, pageProps }: AppProps<{ dehydratedState?: any }>) {
  const [theme, setTheme] = useState<Treatment<Theme>>(defaultTheme);
  const [breakpoint, setBreakpoint] = useState<Breakpoints.Breakpoint>(
    Breakpoints.BREAKPOINT_DESKTOP_SMALL
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    /**
     * Select a theme from commons
     */
    const targetTheme =
      heller_couch_view_theme_treatment_pool.ViewThemeTreatments.find(
        (t) =>
          t.id.toLowerCase().includes('oswald') &&
          t.id.toLowerCase().includes('lasercat')
      );

    /**
     * dispatch it to theme
     */
    setTheme(targetTheme!);

    /**
     * Set breakpoint
     */
    setBreakpoint(reduceBreakpointOnWindowWidth());

    /**
     * Listener for resize events
     */

    function setBreakpointOnResize() {
      const currentWindowBp = reduceBreakpointOnWindowWidth();
      if (currentWindowBp.breakpointKeyName !== breakpoint.breakpointKeyName) {
        setBreakpoint(currentWindowBp);
      }
    }

    window.addEventListener('resize', setBreakpointOnResize);
    return () => window.removeEventListener('resize', setBreakpointOnResize);
  }, []);

  const { font, palette } = theme.meta!.theme!;

  function updateTheme(t: Theme): void {
    setTheme({
      control: false,
      id: t.treatmentId,
      treatment: t.treatmentId,
      weblabName: `_${t.treatmentId}_theme_`,
      meta: {
        theme: t
      }
    });
  }

  return (
    <>
      {/* HEAD */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* BODY */}
      <QueryClientProvider client={appQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <TextContextProvider>
            <ThemeProvider
              value={{
                darkMode: false,
                font,
                palette,
                treatmentId: theme.id,
                setTheme: updateTheme
              }}
            >
              <BreakpointProvider value={breakpoint}>
                <Container
                  id="couch-gag-wrapping-gradient-layer"
                  padding="0px"
                  gradient={{
                    flow: 'to bottom right',
                    from: palette.backgroundColor,
                    to: new ColorScales(0, 100, [
                      palette.backgroundColor,
                      '#000000'
                    ])
                      .getColor(40)
                      .toHexString()
                  }}
                >
                  <Nav modalOpen={modalOpen} setModal={setModalOpen} />
                  <Component {...pageProps} />
                </Container>
              </BreakpointProvider>
            </ThemeProvider>
          </TextContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
