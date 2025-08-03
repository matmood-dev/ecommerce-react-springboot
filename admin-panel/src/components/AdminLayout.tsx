import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import AdminTopbar from "./AdminTopbar";
import AdminSidebar from "./AdminSidebar";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function AdminLayout({ toggleTheme, isDark }: Props) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <Container>
      {menuOpen && <Backdrop onClick={() => setMenuOpen(false)} />}
      <AdminSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Main>
        <AdminTopbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          onMenuToggle={() => setMenuOpen((prev) => !prev)}
        />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  flex: 1;
`;
