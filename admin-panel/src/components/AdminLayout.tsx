import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AdminFooter from "./AdminFooter";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function AdminLayout({ toggleTheme, isDark }: Props) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

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
        <AdminFooter />
      </Main>
    </Container>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Content = styled.main`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  flex: 1;
`;
