import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchProductById, type Product } from "../../api/productApi";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setLoading(true);
    setErr(null);

    fetchProductById(Number(id))
      .then((p) => {
        if (ignore) return;
        setProduct(p);
        setActiveIdx(0);
      })
      .catch((e) => {
        if (ignore) return;
        setErr(e?.response?.data?.error || e.message);
      })
      .finally(() => !ignore && setLoading(false));

    return () => { ignore = true; };
  }, [id]);

  const mainImage = useMemo(() => product?.imageUrls?.[activeIdx] ?? "", [product, activeIdx]);

  if (loading) {
    return (
      <Wrapper>
        <Header>
          <Back onClick={() => navigate(-1)}>← Back</Back>
          <Title>Loading product…</Title>
        </Header>
        <Muted>Fetching details…</Muted>
      </Wrapper>
    );
  }

  if (err) {
    return (
      <Wrapper>
        <Header>
          <Back onClick={() => navigate(-1)}>← Back</Back>
          <Title>Product</Title>
        </Header>
        <ErrorText>{err}</ErrorText>
      </Wrapper>
    );
  }

  if (!product) {
    return (
      <Wrapper>
        <Header>
          <Back onClick={() => navigate(-1)}>← Back</Back>
          <Title>Product</Title>
        </Header>
        <Muted>Not found.</Muted>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header>
        <Back as={Link} to="/products">← Products</Back>
        <Title>{product.name}</Title>
        <HeaderActions>
          {/* You can wire Edit/Delete later */}
          {/* <ActionBtn>Edit</ActionBtn>
          <ActionBtn danger>Delete</ActionBtn> */}
        </HeaderActions>
      </Header>

      <Content>
        {/* Gallery */}
        <Gallery>
          <MainImage>
            {mainImage ? (
              <img src={mainImage} alt={product.name} />
            ) : (
              <NoImg>NO IMAGE</NoImg>
            )}
          </MainImage>

          <ThumbRow>
            {(product.imageUrls?.length ? product.imageUrls : [undefined]).map((url, i) => (
              <Thumb key={i} $active={i === activeIdx} onClick={() => setActiveIdx(i)}>
                {url ? <img src={url} alt={`${product.name} ${i + 1}`} /> : <NoImg>IMG</NoImg>}
              </Thumb>
            ))}
          </ThumbRow>
        </Gallery>

        {/* Info */}
        <Info>
          <NameRow>
            <h2>{product.name}</h2>
            <StockBadge $stock={product.stock}>
              {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
            </StockBadge>
          </NameRow>

          <Price>{formatBHD(product.price)}</Price>

          {product.description && (
            <>
              <SectionTitle>Description</SectionTitle>
              <Description>{product.description}</Description>
            </>
          )}

          <SectionTitle>Details</SectionTitle>
          <DetailsGrid>
            <DetailItem>
              <Label>SKU</Label>
              <Value mono>{product.sku}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Category</Label>
              <Value>{product.category || "-"}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Created</Label>
              <Value>{formatDate(product.createdAt)}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Updated</Label>
              <Value>{formatDate(product.updatedAt)}</Value>
            </DetailItem>
          </DetailsGrid>
        </Info>
      </Content>
    </Wrapper>
  );
}

/* utils */
function formatBHD(value: number) {
  try {
    return new Intl.NumberFormat("en-BH", {
      style: "currency",
      currency: "BHD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }).format(value);
  } catch {
    return `${value?.toFixed?.(2) ?? value} BHD`;
  }
}
function formatDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString();
}

/* styles */
const Wrapper = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr auto;
  }
`;

const Back = styled.button`
  justify-self: start;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
`;

const Title = styled.h1`
  justify-self: center;
  font-size: 1.4rem;
  margin: 0;
`;

const HeaderActions = styled.div`
  justify-self: end;
  display: flex;
  gap: 0.5rem;
`;

const ActionBtn = styled.button<{ danger?: boolean }>`
  padding: 0.5rem 0.9rem;
  background: ${({ danger, theme }) => (danger ? "#ef4444" : theme.primary)};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Gallery = styled.div``;

const MainImage = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  display: grid;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ThumbRow = styled.div`
  margin-top: 0.6rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 72px;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
`;

const Thumb = styled.button<{ $active?: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${({ $active, theme }) => ($active ? theme.primary : theme.border)};
  background: ${({ theme }) => theme.card};
  display: grid;
  place-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const NoImg = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
`;

const Info = styled.div``;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: 1.3rem;
  }
`;

const StockBadge = styled.span<{ $stock: number }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $stock }) =>
    $stock === 0 ? "#ef4444" : $stock <= 3 ? "#f59e0b" : "#10b981"};
  color: white;
`;

const Price = styled.div`
  margin: 0.5rem 0 1rem;
  font-size: 1.4rem;
  font-weight: 700;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.6;
  opacity: 0.95;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 0.5rem 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 0.5rem;
`;

const Label = styled.div`
  font-weight: 600;
  opacity: 0.9;
`;

const Value = styled.div<{ mono?: boolean }>`
  font-family: ${({ mono }) => (mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit")};
  overflow-wrap: anywhere;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.muted ?? "#8b8b8b"};
  padding: 0.75rem 0;
`;

const ErrorText = styled.div`
  color: #ef4444;
  padding: 0.75rem 0;
`;
