import styled from 'styled-components';
import Layout from '../layout/Main';
import usePageTitle from '../hooks/usePageTitle';

export default function AboutPage() {
  usePageTitle('About - Max Bikers');

  return (
    <Layout>
      <HeroSection>
        <HeroText>
          <h1>About Max Bikers</h1>
          <p>Your Ride, Our Passion – Premium Motorcycle Gear & Accessories</p>
        </HeroText>
        <HeroImage src="/images/about-hero.jpg" alt="Max Bikers Hero" />
      </HeroSection>

      <Content>
        <Section>
          <h2>Who We Are</h2>
          <p>
            At <strong>Max Bikers</strong>, we live and breathe motorcycles. We're based in Bahrain and offer a curated selection of high-quality helmets, jackets, gloves, boots, and accessories. Whether you're a daily commuter or a weekend adventurer, we’ve got what you need.
          </p>
        </Section>

        <Section>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✅ Premium, certified gear</li>
            <li>✅ Trusted brands only</li>
            <li>✅ Fast delivery across GCC</li>
            <li>✅ Dedicated customer support</li>
          </ul>
        </Section>

        <QuoteBox>
          <q>Riding is not just a hobby — it’s a lifestyle. At Max Bikers, we help you live it to the fullest.</q>
        </QuoteBox>

        <Section>
          <h2>Join the Max Bikers Community</h2>
          <p>
            We’re more than a store — we’re a community of riders. Follow us on social media, join events, and ride together with fellow enthusiasts.
          </p>
        </Section>
      </Content>
    </Layout>
  );
}

// Styled Components
const HeroSection = styled.section`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2rem;
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #fff;
  text-align: center;

  @media(min-width: 768px) {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
`;

const HeroText = styled.div`
  flex: 1;
  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
    max-width: 500px;
  }
`;

const HeroImage = styled.img`
  flex: 1;
  width: 100%;
  max-width: 500px;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
`;

const Content = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #111827;
  }

  p {
    font-size: 1rem;
    line-height: 1.75;
    color: #374151;
  }

  ul {
    list-style-type: none;
    padding: 0;
    li {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: #10b981;
    }
  }
`;

const QuoteBox = styled.blockquote`
  margin: 2rem 0;
  padding: 2rem;
  font-size: 1.2rem;
  font-style: italic;
  background-color: #f3f4f6;
  border-left: 5px solid #3b82f6;
  border-radius: 0.5rem;
  color: #1f2937;
`;

