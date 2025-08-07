import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Title>404</Title>
      <Subtitle>Oops! Page not found</Subtitle>
      <Message>
        The page you're looking for doesn't exist or has been moved.
      </Message>
      <StyledLink to="/">← Go back to Dashboard</StyledLink>
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
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  opacity: 0.7;
  max-width: 400px;
`;

const StyledLink = styled(Link)`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.card};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary + "dd"};
  }
`;
