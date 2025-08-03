import styled from "styled-components";

export default function AdminFooter() {
  return (
    <Footer>
      <span>
        © {new Date().getFullYear()} Max Bikers. All rights reserved.
      </span>
    </Footer>
  );
}

const Footer = styled.footer`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  font-size: 0.875rem;
  margin-top: auto;
`;
