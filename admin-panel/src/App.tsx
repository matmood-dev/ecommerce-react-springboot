import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./styles/Theme";
import GlobalStyle from "./styles/GlobalStyle";

import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

import UserList from "./pages/users/UserList";
import UserDetail from "./pages/users/UserDetail";
import UserNew from "./pages/users/UserNew";
import UserEdit from "./pages/users/UserEdit";

import LoginPage from "./pages/LoginPage";

import NotFoundPage from "./pages/NotFoundPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";

import ProtectedRoute from "./components/ProtectedRoute";

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
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Redirect root to dashboard */}

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout toggleTheme={toggleTheme} isDark={isDark} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <UserDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/new"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <UserNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id/edit"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <UserEdit />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
