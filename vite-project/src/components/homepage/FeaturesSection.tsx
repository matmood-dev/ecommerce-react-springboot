import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Truck, Repeat, Tag } from "lucide-react";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    { icon: <ShieldCheck size={32} />, title: t("features.secure"), desc: t("features.secureDesc") },
    { icon: <Truck size={32} />, title: t("features.fastDelivery"), desc: t("features.fastDeliveryDesc") },
    { icon: <Repeat size={32} />, title: t("features.easyReturns"), desc: t("features.easyReturnsDesc") },
    { icon: <Tag size={32} />, title: t("features.bestPrice"), desc: t("features.bestPriceDesc") },
  ];

  return (
    <Section>
      <Wrapper>
        {features.map((f, idx) => (
          <Card key={idx}>
            <Icon>{f.icon}</Icon>
            <Title>{f.title}</Title>
            <Description>{f.desc}</Description>
          </Card>
        ))}
      </Wrapper>
    </Section>
  );
}

// Styled Components
const Section = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 2rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 16px rgba(0,0,0,0.04);
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.08);
  }
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  opacity: 0.85;
`;

