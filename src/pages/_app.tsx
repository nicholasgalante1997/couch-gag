import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import { config } from '@fortawesome/fontawesome-svg-core';
import ColorScales from 'color-scales';

import {
  Theme,
  Treatment,
  heller_couch_palette_treatment_pool as commonPalette,
  heller_couch_font_treatment_pool as commonFont
} from '@nickgdev/couch-gag-common-lib';

import { Nav } from '../components';
import { ThemeProvider } from '../contexts';
import { defaultTheme } from '../utils';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@nickgdev/hellerui/lib/index.css';
import '@nickgdev/couch-gag-common-lib/lib/heller.css';
import '../App.css';
import { Container } from '@nickgdev/hellerui';

config.autoAddCss = false;

const appQueryClient = new QueryClient();

function App({ Component, pageProps }: AppProps<{ dehydratedState?: any }>) {
  const [theme, setTheme] = useState<Treatment<Theme>>(defaultTheme);

  useEffect(() => {
    /**
     * Select a theme from commons
     */
    const targetFont = commonFont.spectral_serif;
    const targetColorPalette = commonPalette.treatment_bullwinkle_dark_1;

    /**
     * dispatch it to theme
     */
    setTheme({
      control: true,
      id: 'non-network-theme',
      treatment: false,
      weblabName: 'control',
      meta: {
        theme: {
          font: targetFont.meta!.font,
          palette: targetColorPalette.meta!.color,
          treatmentId: 'control-non-network-theme'
        }
      }
    });
  }, []);

  const { font, palette } = theme.meta!.theme!;

  return (
    <>
      {/* HEAD */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* BODY */}
      <QueryClientProvider client={appQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <ThemeProvider
              value={{ darkMode: false, font, palette, treatmentId: theme.id }}
            >
              <Container
                id="couch-gag-wrapping-gradient-layer"
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
                <Nav />
                <Component {...pageProps} />
              </Container>
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
