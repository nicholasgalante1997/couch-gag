import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import { config } from '@fortawesome/fontawesome-svg-core';

import {
  Theme,
  Treatment,
  deriveCssClassname,
  log
} from '@nickgdev/couch-gag-common-lib';

import {
  EXCEPTION_DELIMITER,
  ThemeException,
  ThemeExceptionEnum
} from '../exceptions';
import { Footer, Nav } from '../components';
import { ThemeProvider } from '../contexts';
import { getViewThemeTreatment } from '../service';
import { defaultTheme } from '../utils';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@nickgdev/hellerui/lib/index.css';
import '@nickgdev/couch-gag-common-lib/lib/heller.css';
import '../App.css';

config.autoAddCss = false;

const appQueryClient = new QueryClient();

function App({ Component, pageProps }: AppProps<{ dehydratedState?: any }>) {
  const [theme, setTheme] = useState<Treatment<Theme>>(defaultTheme);

  useEffect(() => {
    (async () => {
      const { error, data } = await getViewThemeTreatment(
        undefined,
        undefined,
        undefined,
        ['yoss', 'kreon']
      );

      if (error || data.themeOptions.length === 0) {
        log(
          'error',
          new ThemeException(ThemeExceptionEnum.NETWORK).message +
            EXCEPTION_DELIMITER +
            `relayed error :: ${error}`
        );
      } else {
        setTheme(data.themeOptions[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!theme) return;
    const { body } = document;
    body.setAttribute(
      'class',
      deriveCssClassname(theme.meta!.theme!.palette.backgroundColor)?.css.bg ??
        ''
    );
  }, [theme]);

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
              <Nav />
              <Component {...pageProps} />
              <Footer />
            </ThemeProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
