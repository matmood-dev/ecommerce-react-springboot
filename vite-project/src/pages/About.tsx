import styled from 'styled-components';
import Layout from '../layout/Main';
import usePageTitle from '../hooks/usePageTitle';

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function AboutPage({ toggleTheme, isDark }: Props) {
  usePageTitle('About Us');

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <Container>
        <Heading>About Max Bikers</Heading>
        <Subheading>Your Trusted Source for Motorcycle Gear & Accessories</Subheading>
        <Paragraph>
          At <strong>Max Bikers</strong>, we are passionate about the open road. Whether you're a seasoned rider or just starting out, we offer top-quality motorcycle gear, helmets, jackets, gloves, boots, and accessories to ensure your ride is safe, stylish, and unforgettable.
        </Paragraph>
        <Paragraph>
          Based in Bahrain, we’re committed to delivering exceptional service and premium products that reflect the spirit of adventure and freedom. Our goal is to empower riders across the region with gear that inspires confidence and performance.
        </Paragraph>
        <QuoteBox>
          “Ride with confidence. Ride with Max Bikers.”
        </QuoteBox>
        <Stats>
          <Stat>
            <Number>10+</Number>
            <Label>Years in Business</Label>
          </Stat>
          <Stat>
            <Number>5K+</Number>
            <Label>Happy Riders</Label>
          </Stat>
          <Stat>
            <Number>200+</Number>
            <Label>Premium Products</Label>
          </Stat>
        </Stats>
      </Container>
    </Layout>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const Heading = styled.h1`
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const Subheading = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
`;

const QuoteBox = styled.blockquote`
  font-size: 1.25rem;
  font-style: italic;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  border-left: 4px solid ${({ theme }) => theme.primary};
  margin: 2rem 0;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Stat = styled.div`
  flex: 1;
  min-width: 120px;
  text-align: center;
`;

const Number = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

