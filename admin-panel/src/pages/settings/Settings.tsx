import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>Settings</Title>

      <Section>
        <SectionTitle>Theme</SectionTitle>
        <Text>
          This app supports Light and Dark Mode using the toggle in the top bar.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Language</SectionTitle>
        <Text>
          Language selection is based on localStorage and supports English and
          Arabic (RTL).
        </Text>
      </Section>

      <Section>
        <SectionTitle>Account</SectionTitle>
        <Text>
          Manage your profile information, update your password, or log out of
          your account.
        </Text>
        <EditButton onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </EditButton>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 1.05rem;
  }
`;

const Text = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const EditButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;
