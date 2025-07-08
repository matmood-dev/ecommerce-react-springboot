import styled from "styled-components";
import { useTranslation } from "react-i18next";

const categories = [
  { key: "helmets", img: "/images/categories/helmet.webp" },
  { key: "jackets", img: "/images/categories/jacket.jpg" },
  { key: "gloves", img: "/images/categories/gloves.webp" },
  { key: "accessories", img: "/images/categories/accessories.webp" },
];

export default function CategoriesSection() {
  const { t } = useTranslation();

  return (
    <Section>
      <Title>{t("categories.title")}</Title>
      <Grid>
        {categories.map((cat) => (
          <Card key={cat.key}>
            <Image src={cat.img} alt={t(`categories.${cat.key}`)} />
            <Label>{t(`categories.${cat.key}`)}</Label>
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
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Label = styled.div`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
`;
