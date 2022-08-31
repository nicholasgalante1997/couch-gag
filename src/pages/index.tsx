/** External Dependendencies */

import React, { useState, useEffect } from 'react';
import { log, deriveCssClassname } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
/** Internal Dependencies (behavioral)  */

import { ThemeProvider, _defaultTheme, Theme } from '../contexts';
import { useQueryThemeTreatment } from '../queries';
import { pageStyles } from '../utils';

/** Internal Dependencies (visual) */

import { Nav } from '../components/nav';
import { Spinner } from '../components/animated/Spinner';
import { Home } from './home';

function App() {
  const [darkMode] = useState(true);
  const [theme, setTheme] = useState<Theme>(_defaultTheme);

  const { push: redirect } = useRouter();

  const { data, error, isError, isLoading } = useQueryThemeTreatment(
    undefined,
    undefined,
    undefined,
    ['major', 'oswald']
  );

  useEffect(() => {
    if (data?.data) {
      console.log({ data });
      if (data.data.themeOptions.length > 0) {
        setTheme({
          darkMode,
          font: data.data.themeOptions[0].meta!.theme!.font,
          palette: data.data.themeOptions[0].meta!.theme!.palette,
          treatmentId: data.data.themeOptions[0].meta!.theme!.treatmentId
        });
        const { body } = document;
        body.setAttribute(
          'class',
          deriveCssClassname(
            data.data.themeOptions[0].meta!.theme!.palette.backgroundColor
          )?.css.bg ?? ''
        );
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <Container customStyles={pageStyles}>
        <Spinner />
      </Container>
    );
  }

  if (isError) {
    log('error', JSON.stringify(error));
    redirect('/not-found');
  }

  return (
    <ThemeProvider value={theme ?? _defaultTheme}>
      <Nav />
      <Home />
    </ThemeProvider>
  );
}

export default App;
