import styled from "styled-components";
import Layout from "../layout/Main";
import usePageTitle from "../hooks/usePageTitle";
import { useTranslation } from "react-i18next";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function AboutPage({ toggleTheme, isDark }: Props) {
  const { t } = useTranslation();
  usePageTitle("About Us");

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <Wrapper>
        <Title>{t("about-page.title")}</Title>
        <Section>
          <Paragraph>{t("about-page.mission")}</Paragraph>
          <Paragraph>{t("about-page.vision")}</Paragraph>
          <Image src="/images/about/team.webp" alt="Our Team" />
        </Section>

        <Section>
          <Subtitle>{t("about-page.whyChooseUs")}</Subtitle>
          <List>
            <li>{t("about-page.point1")}</li>
            <li>{t("about-page.point2")}</li>
            <li>{t("about-page.point3")}</li>
          </List>
        </Section>

        <CallToAction>
          <h3>{t("about-page.readyToExplore")}</h3>
          <CTAButton onClick={() => window.location.href = "/shop"}>
            {t("about-page.shopNow")}
          </CTAButton>
        </CallToAction>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.section`
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.2rem;
`;

const List = styled.ul`
  padding-left: 1.5rem;
  font-size: 1.05rem;

  li {
    margin-bottom: 0.75rem;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-top: 1rem;
`;

const CallToAction = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const CTAButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  background: ${({ theme }) =>
    theme.mode === "dark" ? theme.text : theme.primary};
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.background : "#fff"};

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "dark" ? theme.card : theme.secondary};
    color: ${({ theme }) =>
      theme.mode === "dark" ? theme.text : "#fff"};
  }
`;
