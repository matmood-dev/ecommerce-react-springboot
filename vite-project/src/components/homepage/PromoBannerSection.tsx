import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PromoBannerSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PromoWrapper>
      <Content>
        <PromoHeadline>{t("promo.title")}</PromoHeadline>
        <PromoSubText>{t("promo.subtitle")}</PromoSubText>
        <ButtonGroup>
          <ActionButton onClick={() => navigate("/shop")}>
            {t("promo.cta")}
          </ActionButton>
        </ButtonGroup>
      </Content>
    </PromoWrapper>
  );
}

const PromoWrapper = styled.section`
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'linear-gradient(120deg, #1f1f1f, #3a3a3a)'
      : `linear-gradient(120deg, ${theme.primary}, ${theme.secondary})`};
  color: #fff;
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

const PromoHeadline = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PromoSubText = styled.p`
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
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
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
