import React, { createContext, useState, useEffect, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { AnthologyPage } from './pages/anthology';
import { StoryPage } from './pages/story_';
import { ErrorPage } from './pages/error';
import './App.css';
import { Nav } from './components/nav';

const ThemeContext = createContext({ darkMode: true });
export const useThemeContext = () => useContext(ThemeContext);

const appQueryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.querySelector('body')?.setAttribute('class', 'dark');
    } else {
      document.querySelector('body')?.setAttribute('class', 'light');
    }
  }, [darkMode]);

  return (
    <QueryClientProvider client={appQueryClient}>
      <ThemeContext.Provider value={{ darkMode }}>
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
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
