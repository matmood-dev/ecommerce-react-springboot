// src/layout/Navbar.tsx
import React, { useEffect } from "react";
import styled from "styled-components";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Navbar({ toggleTheme, isDark }: Props) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);

  // Set initial direction based on language
  useEffect(() => {
    const savedLanguage = i18n.language || 'en';
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const navLinks = [
    { key: "home", path: "/" },
    { key: "shop", path: "/shop" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
  ];

  const changeLang = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <Header>
      <NavContainer>
        <Logo>{t("logo")}</Logo>

        <DesktopMenu>
          {navLinks.map(({ key, path }) => (
            <NavItem key={key} href={path}>
              {t(key)}
            </NavItem>
          ))}
        </DesktopMenu>

        <Actions>
          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? (
              <Sun size={20} className="icon" />
            ) : (
              <Moon size={20} className="icon" />
            )}
          </ThemeToggle>

          <LangToggle
            onClick={() => changeLang(i18n.language === "ar" ? "en" : "ar")}
            aria-label="Toggle language"
          >
            {i18n.language === "ar" ? "EN" : "ع"}
          </LangToggle>

          <MobileToggle onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </MobileToggle>
        </Actions>
      </NavContainer>

      {open && (
        <MobileMenu>
          {navLinks.map(({ key, path }) => (
            <MobileNavItem key={key} href={path} onClick={() => setOpen(false)}>
              {t(key)}
            </MobileNavItem>
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
  background: ${({ theme }) => theme.header.background};
  color: ${({ theme }) => theme.header.text};
  box-shadow: ${({ theme }) => theme.header.shadow};
  transition: all 0.3s ease;
  border-bottom: 1px solid ${({ theme }) => theme.header.border};
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    letter-spacing: 4px;
  }
`;

const DesktopMenu = styled.nav`
  display: none;
  gap: 1.5rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
  font-size: 1.05rem;
  letter-spacing: 1px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    letter-spacing: 2px;

    &::after {
      width: 100%;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: scale(1.1) rotate(15deg);
  }
`;

const LangToggle = styled.button`
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: scale(1.05);
    letter-spacing: 2px;
  }
`;

const MobileToggle = styled.button`
  background: ${({ theme }) => theme.card || 'transparent'};
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 1.5rem;
  gap: 1rem;
  background: ${({ theme }) => theme.card || theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavItem = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 0.75rem 0;
  transition: all 0.3s ease;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-size: 1.1rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
    padding-left: 0.5rem;
  }
`;