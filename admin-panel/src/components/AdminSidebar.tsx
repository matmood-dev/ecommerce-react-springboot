import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose(); // auto-close on mobile
  };

  return (
    <Sidebar $open={isOpen}>
      <Logo onClick={() => handleNavigate("/")}>🛍️ Admin Panel</Logo>
      <NavItem active={location.pathname === "/"} onClick={() => handleNavigate("/")}>
        Dashboard
      </NavItem>
      <NavItem active={location.pathname.includes("products")} onClick={() => handleNavigate("/products")}>
        Products
      </NavItem>
      <NavItem active={location.pathname.includes("orders")} onClick={() => handleNavigate("/orders")}>
        Orders
      </NavItem>
      <NavItem active={location.pathname.includes("customers")} onClick={() => handleNavigate("/customers")}>
        Customers
      </NavItem>
      <NavItem active={location.pathname.includes("settings")} onClick={() => handleNavigate("/settings")}>
        Settings
      </NavItem>
    </Sidebar>
  );
}

// Styled Components

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
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100% - 64px);
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
    background-color: ${({ theme }) => theme.card};
    overflow-y: auto;
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
