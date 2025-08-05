import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./styles/Theme";
import GlobalStyle from "./styles/GlobalStyle";

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

import UserList from "./pages/users/UserList";
import UserDetail from "./pages/users/components/UserDetail";

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
          <Route
            path="/"
            element={<AdminLayout toggleTheme={toggleTheme} isDark={isDark} />}
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />

            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
