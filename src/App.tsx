import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { log, deriveCssClassname } from '@nickgdev/couch-gag-common-lib';
import { Container } from '@nickgdev/hellerui';

import { pageStyles, findThemeInDevEnvOrUndefined } from './utils';
import { ThemeProvider, _defaultTheme, Theme } from './contexts';
import { useQueryThemeTreatment } from './queries';

import { Home } from './pages/home';
import { AnthologyPage } from './pages/anthology';
import { StoryPage } from './pages/story_';
import { ErrorPage } from './pages/error';
import { Nav } from './components/nav';
import { Spinner } from './components/animated/Spinner';

import '@nickgdev/couch-gag-common-lib/lib/heller.css';
import './App.css';

function App() {
  const [darkMode] = useState(true);
  const [theme, setTheme] = useState<Theme>(
    findThemeInDevEnvOrUndefined('dunbar', 6) ?? _defaultTheme
  );

  document.body.setAttribute(
    'class',
    deriveCssClassname(
      findThemeInDevEnvOrUndefined('dunbar', 6)?.palette.backgroundColor ?? ''
    )?.css.bg ?? ''
  );

  let uId: string | undefined | null;
  let cId: string | undefined | null;

  if (window.sessionStorage) {
    uId = window.sessionStorage.getItem('x-ulysses-user-id-hash');
    cId = window.sessionStorage.getItem('x-ulysses-colloq-user-id-hash');
  }

  const { data, error, isError, isLoading } = useQueryThemeTreatment(
    undefined,
    undefined
  );

  useEffect(() => {
    if (data?.data) {
      if (data.data.themeOptions.length > 0) {
        // setTheme({
        //   darkMode,
        //   font: data.data.themeOptions[0].meta!.theme!.font,
        //   palette: data.data.themeOptions[0].meta!.theme!.palette,
        //   treatmentId: data.data.themeOptions[0].meta!.theme!.treatmentId
        // });
        // const { body } = document;
        // body.setAttribute(
        //   'class',
        //   deriveCssClassname(
        //     data.data.themeOptions[0].meta!.theme!.palette.backgroundColor
        //   )?.css.bg ?? ''
        // );
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
    return (
      <Container customStyles={pageStyles}>
        <ErrorPage />
      </Container>
    );
  }

  return (
    <ThemeProvider value={theme ?? _defaultTheme}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="anthology" element={<AnthologyPage />} />
          <Route path="story">
            <Route path="season-one" element={<StoryPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
