import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const newProducts = [
  {
    id: 1,
    name: "Racing Helmet",
    price: "49.99 BHD",
    image: "/images/products/helmet1.jpg",
  },
  {
    id: 2,
    name: "Leather Jacket",
    price: "89.00 BHD",
    image: "/images/products/jacket1.jpg",
  },
  {
    id: 3,
    name: "Rider Gloves",
    price: "25.00 BHD",
    image: "/images/products/gloves1.jpg",
  },
];

export default function NewArrivalsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Section>
      <Title>{t("newArrivals.title")}</Title>
      <Grid>
        {newProducts.map((item) => (
          <Card key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
            <Image src={item.image} alt={item.name} />
            <ProductName>{item.name}</ProductName>
            <Price>{item.price}</Price>
          </Card>
        ))}
      </Grid>
    </Section>
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
