import styled from "styled-components";

export default function Settings() {
  return (
    <Wrapper>
      <Title>Settings</Title>

      <Section>
        <SectionTitle>Theme</SectionTitle>
        <Text>This app supports Light and Dark Mode using the toggle in the top bar.</Text>
      </Section>

      <Section>
        <SectionTitle>Language</SectionTitle>
        <Text>Language selection is based on localStorage and supports English and Arabic (RTL).</Text>
      </Section>

      <Section>
        <SectionTitle>Account</SectionTitle>
        <Text>In a real app, you'd configure profile settings, password change, and logout options here.</Text>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.primary};
`;

const Text = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
`;
