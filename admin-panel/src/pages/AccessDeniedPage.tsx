// src/pages/AccessDeniedPage.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function AccessDeniedPage() {
  return (
    <Wrapper>
      <Title>🚫 Access Denied</Title>
      <Message>You don’t have permission to view this page.</Message>
      <StyledLink to="/">← Back to Dashboard</StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.card};
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;
