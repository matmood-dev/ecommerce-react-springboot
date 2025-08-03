import styled from "styled-components";

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
  onMenuToggle: () => void;
};

export default function AdminTopbar({ isDark, toggleTheme, onMenuToggle }: Props) {
  return (
    <Topbar>
      <span>Admin</span>
      <TopbarRight>
        <ThemeToggle onClick={toggleTheme}>
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </ThemeToggle>
        <MenuButton onClick={onMenuToggle}>☰</MenuButton>
      </TopbarRight>
    </Topbar>
  );
}

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
