import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function AdminLayout({ toggleTheme, isDark }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Sidebar $open={menuOpen}>
        <Logo onClick={() => navigate("/")}>🛍️ Admin Panel</Logo>
        <NavItem active={location.pathname === "/"} onClick={() => navigate("/")}>Dashboard</NavItem>
        <NavItem active={location.pathname.includes("products")} onClick={() => navigate("/products")}>Products</NavItem>
        <NavItem active={location.pathname.includes("orders")} onClick={() => navigate("/orders")}>Orders</NavItem>
        <NavItem active={location.pathname.includes("customers")} onClick={() => navigate("/customers")}>Customers</NavItem>
        <NavItem active={location.pathname.includes("settings")} onClick={() => navigate("/settings")}>Settings</NavItem>
      </Sidebar>

      <Main>
        <Topbar>
          <span>Admin</span>
          <TopbarRight>
            <ThemeToggle onClick={toggleTheme}>
              {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </ThemeToggle>
            <MenuButton onClick={() => setMenuOpen(prev => !prev)}>
              ☰
            </MenuButton>
          </TopbarRight>
        </Topbar>
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

const Sidebar = styled.aside<{ $open?: boolean }>`
  width: 220px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    left: 0;
    height: calc(100% - 64px);
    z-index: 10;
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
    background-color: ${({ theme }) => theme.card};
  }
`;

const Logo = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: ${({ active, theme }) => (active ? theme.primary : "transparent")};
  color: ${({ active, theme }) => (active ? theme.background : theme.text)};
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Topbar = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 20;
`;

const TopbarRight = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
  }
`;

const Content = styled.main`
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  flex: 1;
`;
