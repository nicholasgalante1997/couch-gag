import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { AnthologyPage } from './pages/anthology';
import { StoryPage } from './pages/story.dyn';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="anthology" element={<AnthologyPage />} />
        <Route path="story">
          <Route path="season-one" element={<StoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
