import styled from "styled-components";

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
  onMenuToggle: () => void;
};

export default function AdminTopbar({
  isDark,
  toggleTheme,
  onMenuToggle,
}: Props) {
  return (
    <Topbar>
      <Left>
        <MenuButton onClick={onMenuToggle}>☰</MenuButton>
      </Left>
      <TopbarRight>
        <ThemeToggle
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          onClick={toggleTheme}
        >
          {isDark ? "☀️" : "🌙"}
        </ThemeToggle>
        <Avatar title="Logged in as Admin">MT</Avatar>
      </TopbarRight>
    </Topbar>
  );
}

const Topbar = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 50;
  height: 60px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow + "15"};
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const TopbarRight = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + "0a"};
  }
`;

const Avatar = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.card};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
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

const Left = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 769px) {
    display: none;
  }
`;
