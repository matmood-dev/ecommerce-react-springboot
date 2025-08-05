import styled from "styled-components";

const EmptyComponent = () => {
  return (
    <EmptyWrapper>
      <ImageWrapper>
        <img
          src="/emptycomponent.svg"
          height={234}
          width={350}
          alt="404"
        />
      </ImageWrapper>
      <Title>No Data Found</Title>
      <Description>
        No records found. Please refresh the page or contact support if the
        problem persists.
      </Description>
      <HomeButton href="/">Go Home</HomeButton>
    </EmptyWrapper>
  );
};

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 10px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0.75rem 0;
  color: ${({ theme }) => theme.primary};
`;

const Description = styled.p`
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.secondary};
`;

const HomeButton = styled.a`
  padding: 0.6rem 1.4rem;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  font-size: 0.95rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "#009f96" : "#007499"};
  }
`;

export default EmptyComponent;