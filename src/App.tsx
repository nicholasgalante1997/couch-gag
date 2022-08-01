import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, defaultTheme } from './contexts';
import { Home } from './pages/home';
import { AnthologyPage } from './pages/anthology';
import { StoryPage } from './pages/story_';
import { ErrorPage } from './pages/error';
import { Nav } from './components/nav';


import './App.css';


const appQueryClient = new QueryClient();

function App() {
  const [darkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.querySelector('body')?.setAttribute('class', 'dark');
    } else {
      document.querySelector('body')?.setAttribute('class', 'light');
    }
  }, [darkMode]);

  return (
    <QueryClientProvider client={appQueryClient}>
      <ThemeProvider value={defaultTheme}>
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
    </QueryClientProvider>
  );
}

export default App;
