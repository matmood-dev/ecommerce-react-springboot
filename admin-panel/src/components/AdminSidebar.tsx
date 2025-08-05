import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Truck, Users, Settings } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "Dashboard", path: "/", icon: <LayoutDashboard size={16} /> },
  { label: "Products", path: "/products", icon: <Package size={16} /> },
  { label: "Orders", path: "/orders", icon: <Truck size={16} /> },
  { label: "Customers", path: "/customers", icon: <Users size={16} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={16} /> },
  { label: "Users", path: "/users", icon: <Settings size={16} /> },
];

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (currentPath: string, targetPath: string) => {
    if (targetPath === "/") return currentPath === "/";
    return currentPath.startsWith(targetPath);
  };

  return (
    <Sidebar $open={isOpen}>
      <Logo onClick={() => handleNavigate("/")}>🛍️ Admin Panel</Logo>
      {menuItems.map(({ label, path, icon }) => (
        <NavItem
          key={label}
          active={isActive(location.pathname, path)}
          onClick={() => handleNavigate(path)}
        >
          <IconWrapper>{icon}</IconWrapper>
          {label}
        </NavItem>
      ))}
    </Sidebar>
  );
}

const Sidebar = styled.aside<{ $open?: boolean }>`
  width: 240px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 80px 0.75rem 1.5rem; /* 80px top padding to offset topbar */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-right: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.2s ease-out;
  z-index: 100;
  box-shadow: 2px 0 10px ${({ theme }) => theme.shadow};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};
    overflow-y: auto;
  }
`;

const Logo = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + "0a"};
  }
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: ${({ active, theme }) =>
    active
      ? theme.primary + "1a"
      : "transparent"}; /* Slightly transparent active state */
  color: ${({ active, theme }) => (active ? theme.primary : theme.text)};
  border: none;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Increased gap */
  transition: all 0.2s ease;
  margin: 0 0.25rem; /* Small margin */

  &:hover {
    background: ${({ theme }) => theme.primary + "0d"}; /* Very subtle hover */
    color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;
