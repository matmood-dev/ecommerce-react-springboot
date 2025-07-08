import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HeroWrapper>
      <Content>
        <Headline>{t("hero.title")}</Headline>
        <SubText>{t("hero.subtitle")}</SubText>
        <ButtonGroup>
          <ActionButton onClick={() => navigate("/shop")}>
            {t("hero.shopNow")}
          </ActionButton>
          <OutlineButton onClick={() => navigate("/about")}>
            {t("hero.learnMore")}
          </OutlineButton>
        </ButtonGroup>
      </Content>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.section`
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'linear-gradient(120deg, #1f1f1f, #3a3a3a)' // custom dark gradient
      : `linear-gradient(120deg, ${theme.primary}, ${theme.secondary})`};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#fff')};
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  direction: inherit;
`;


const Content = styled.div`
  max-width: 800px;
`;

const Headline = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubText = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  opacity: 0.95;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.text};   // Use theme's text color as background
  color: ${({ theme }) => theme.background};        // Invert for contrast
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
  }
`;


const OutlineButton = styled(ActionButton)`
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;
