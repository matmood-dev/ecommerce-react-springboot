import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import styled from "styled-components";
import Layout from "../layout/Main";
import products from "../data/products.json";
type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Shop({ toggleTheme, isDark }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  usePageTitle("Shop");

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <Section>
        <Title>{t("shop-page.title")}</Title>
        <Grid>
          {products.map((item) => (
            <Card key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
              <Image src={item.image} alt={item.name} />
              <ProductName>{item.name}</ProductName>
              <Price>{item.price}</Price>
            </Card>
          ))}
        </Grid>
      </Section>
    </Layout>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const ProductName = styled.h4`
  padding: 1rem 1rem 0 1rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Price = styled.p`
  padding: 0 1rem 1rem 1rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 500;
  font-size: 1rem;
`;
