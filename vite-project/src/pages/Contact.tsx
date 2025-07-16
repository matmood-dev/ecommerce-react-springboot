import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Layout from "../layout/Main";
import usePageTitle from "../hooks/usePageTitle";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Contact({ toggleTheme, isDark }: Props) {
  usePageTitle("Contact Us");
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <Wrapper>
        <Title>{t("contact-page.title")}</Title>
        <Subtitle>{t("contact-page.subtitle")}</Subtitle>

        <FormWrapper onSubmit={handleSubmit}>
          <Input placeholder={t("contact-page.name")} required />
          <Input type="email" placeholder={t("contact-page.email")} required />
          <Textarea placeholder={t("contact-page.message")} required />
          <SubmitButton>{t("contact-page.submit")}</SubmitButton>
          {submitted && <SuccessMsg>{t("contact-page.success")}</SuccessMsg>}
        </FormWrapper>

        <Details>
          <h3>{t("contact-page.detailsTitle")}</h3>
          <p>
            <strong>{t("contact-page.address")}:</strong> Manama, Bahrain
          </p>
          <p>
            <strong>{t("contact-page.phone")}:</strong> +973 1234 5678
          </p>
          <p>
            <strong>{t("contact-page.emailLabel")}:</strong>{" "}
            support@maxbikers.com
          </p>
          <p>
            <strong>{t("contact-page.workingHours")}:</strong> 9AM - 6PM (Sun–Thu)
          </p>
        </Details>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  min-height: 120px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

const SubmitButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.text : theme.primary};
  color: ${({ theme }) => theme.mode === 'dark' ? theme.background : '#fff'};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.mode === 'dark' ? theme.secondary : theme.secondary};
    color: ${({ theme }) => theme.mode === 'dark' ? 'black' : '#fff'};
  }
`;


const SuccessMsg = styled.p`
  color: green;
  font-weight: 600;
`;

const Details = styled.div`
  margin-top: 3rem;
  background: ${({ theme }) => theme.card};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;
