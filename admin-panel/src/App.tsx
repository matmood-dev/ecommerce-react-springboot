import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./styles/Theme";
import GlobalStyle from "./styles/GlobalStyle";

// Store Pages
// import Homepage from './pages/Homepage';
// import AboutPage from './pages/About';
// import Shop from './pages/Shop';
// import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  return (
    <ThemeProvider
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        mode: isDark ? "dark" : "light",
      }}
    >
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Store Pages */}
          {/* <Route path="/" element={<Homepage toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/about" element={<AboutPage toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/shop" element={<Shop toggleTheme={toggleTheme} isDark={isDark} />} />
          <Route path="/contact" element={<Contact toggleTheme={toggleTheme} isDark={isDark} />} /> */}

          {/* Admin Panel */}
          <Route
            path="/"
            element={<AdminLayout toggleTheme={toggleTheme} isDark={isDark} />}
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
