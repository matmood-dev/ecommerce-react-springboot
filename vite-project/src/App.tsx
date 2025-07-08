import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

import Homepage from './pages/Homepage';
import AboutPage from './pages/About';

function App() {
  // ✅ Initialize from localStorage or default to false (light)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light'); // ✅ Save to localStorage
      console.log('Theme changed. isDark:', next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/about" element={<AboutPage toggleTheme={toggleTheme} isDark={isDark} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
