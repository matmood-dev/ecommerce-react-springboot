import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <FooterContent>
        © {new Date().getFullYear()} {t("footer.company")}. {t("footer.rights")}
      </FooterContent>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.secondary};
  text-align: center;
  padding: 1.5rem 1rem;
  margin-top: 4rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  font-size: 0.9rem;
  transition: all 0.3s ease;
`;

const FooterContent = styled.div`
  direction: inherit;
`;
