// src/layout/Navbar.tsx
import React from "react";
import styled from "styled-components";
import { Menu, X, Sun, Moon } from "lucide-react";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Navbar({ toggleTheme, isDark }: Props) {
  console.log("Navbar isDark:", isDark);
  const [open, setOpen] = React.useState(false);
  const navLinks = ["Home", "Shop", "About", "Contact"];
  return (
    <Header>
      <NavContainer>
        <Logo>Max Bikers</Logo>

        <DesktopMenu>
          {navLinks.map((link) => {
            const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            return (
              <NavItem key={link} href={path}>
                {link}
              </NavItem>
            );
          })}
        </DesktopMenu>

        <Actions>
          <ThemeToggle onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeToggle>

          <MobileToggle onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </MobileToggle>
        </Actions>
      </NavContainer>

      {open && (
        <MobileMenu>
          {navLinks.map((link) => (
            <NavItem key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </NavItem>
          ))}
        </MobileMenu>
      )}
    </Header>
  );
}

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) =>
    theme.background === "#1a1a1a"
      ? "0 4px 12px rgba(0, 0, 0, 0.6)" // Dark mode shadow
      : "0 2px 8px rgba(0, 0, 0, 0.05)"}; // Light mode shadow
  transition: box-shadow 0.3s ease, background 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DesktopMenu = styled.nav`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.a`
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem;
  transition: all 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.25rem;
  }
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover || "#0073aa"};
  }

  @media (max-width: 767px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.875rem;
  }
`;

const MobileToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 1rem;
  gap: 0.75rem;

  @media (min-width: 768px) {
    display: none;
  }
`;
