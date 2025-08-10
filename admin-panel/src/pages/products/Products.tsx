import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchProducts, type Page, type Product } from "../../api/productApi";

export default function Products() {
  const [data, setData] = useState<Page<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // controls
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const SORT_OPTIONS = ["createdAt,desc", "price,asc", "price,desc"] as const;
  type SortOption = (typeof SORT_OPTIONS)[number];
  const [sort, setSort] = useState<SortOption>("createdAt,desc");

  function isSortOption(v: string): v is SortOption {
    return (SORT_OPTIONS as readonly string[]).includes(v);
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.currentTarget.value;
    if (isSortOption(v)) setSort(v);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErr(null);

    fetchProducts({ q, category, page, size, sort })
      .then((res) => !ignore && setData(res))
      .catch((e) => !ignore && setErr(e?.response?.data?.error || e.message))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [q, category, page, size, sort]);

  // reset to first page when filters change (except page)
  useEffect(() => {
    setPage(0);
  }, [q, category, size, sort]);

  const total = data?.totalElements ?? 0;

  return (
    <Wrapper>
      <Header>
        <Title>Products</Title>
        <Actions>
          <Search
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name / SKU..."
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            <option value="Helmets">Helmets</option>
            <option value="Gloves">Gloves</option>
            <option value="Jackets">Jackets</option>
            {/* add more or load dynamically */}
          </Select>
          <Select value={sort} onChange={handleSortChange}>
            <option value="createdAt,desc">Newest</option>
            <option value="price,asc">Price: Low → High</option>
            <option value="price,desc">Price: High → Low</option>
          </Select>
          <Select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </Select>
        </Actions>
      </Header>

      {/* desktop table */}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6}>
                  <Muted>Loading...</Muted>
                </td>
              </tr>
            )}
            {err && !loading && (
              <tr>
                <td colSpan={6}>
                  <ErrorText>{err}</ErrorText>
                </td>
              </tr>
            )}
            {!loading && !err && data?.content.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <Muted>No products found.</Muted>
                </td>
              </tr>
            )}
            {!loading &&
              !err &&
              data?.content.map((p) => (
                <tr key={p.id}>
                  <td>{p.sku}</td>
                  <td>
                    <ProdCell>
                      <Thumb>
                        {p.imageUrls?.[0] ? (
                          <img src={p.imageUrls[0]} alt={p.name} />
                        ) : (
                          <NoImg>IMG</NoImg>
                        )}
                      </Thumb>
                      <div>
                        <strong>
                          <NameLink to={`/products/${p.id}`}>{p.name}</NameLink>
                        </strong>
                        {p.description && (
                          <SmallMuted>{truncate(p.description, 80)}</SmallMuted>
                        )}
                      </div>
                    </ProdCell>
                  </td>

                  <td>{p.category || "-"}</td>
                  <td>{formatBHD(p.price)}</td>
                  <td>
                    <StockBadge $stock={p.stock}>
                      {p.stock} {p.stock <= 3 ? "low" : ""}
                    </StockBadge>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableWrapper>

      {/* mobile cards */}
      <CardGrid>
        {loading && <Muted>Loading...</Muted>}
        {err && !loading && <ErrorText>{err}</ErrorText>}
        {!loading && !err && data?.content.length === 0 && (
          <Muted>No products found.</Muted>
        )}
        {!loading &&
          !err &&
          data?.content.map((p) => (
            <Card as={Link} to={`/products/${p.id}`} key={p.id}>
              <CardTop>
                <Thumb big>
                  {p.imageUrls?.[0] ? (
                    <img src={p.imageUrls[0]} alt={p.name} />
                  ) : (
                    <NoImg>IMG</NoImg>
                  )}
                </Thumb>
                <div>
                  <h4>{p.name}</h4>
                  <SmallMuted>SKU: {p.sku}</SmallMuted>
                </div>
              </CardTop>
              <Info>
                <Row>
                  <Label>Category:</Label> {p.category || "-"}
                </Row>
                <Row>
                  <Label>Price:</Label> {formatBHD(p.price)}
                </Row>
                <Row>
                  <Label>Stock:</Label>{" "}
                  <StockBadge $stock={p.stock}>{p.stock}</StockBadge>
                </Row>
                <Row>
                  <Label>Created:</Label>{" "}
                  {new Date(p.createdAt).toLocaleDateString()}
                </Row>
              </Info>
            </Card>
          ))}
      </CardGrid>

      {/* pagination */}
      <PaginationBar>
        <div>
          {total > 0 && (
            <SmallMuted>
              Showing {data?.numberOfElements ?? 0} of {total} products
            </SmallMuted>
          )}
        </div>
        <Pager>
          <Button
            disabled={!data || data.first || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Prev
          </Button>
          <PageIndicator>
            Page {(data?.number ?? 0) + 1} / {data?.totalPages ?? 1}
          </PageIndicator>
          <Button
            disabled={!data || data.last || loading}
            onClick={() =>
              setPage((p) => (data ? Math.min(data.totalPages - 1, p + 1) : p))
            }
          >
            Next
          </Button>
        </Pager>
      </PaginationBar>
    </Wrapper>
  );
}

/* utils */
function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function formatBHD(value: number) {
  try {
    return new Intl.NumberFormat("en-BH", {
      style: "currency",
      currency: "BHD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} BHD`;
  }
}

/* styles */
const Wrapper = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Search = styled.input`
  padding: 0.55rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  min-width: 220px;
  outline: none;
`;

const Select = styled.select`
  padding: 0.55rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
`;

const TableWrapper = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    vertical-align: middle;
  }

  th {
    background: ${({ theme }) => theme.card};
    font-weight: 600;
  }
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.muted ?? "#8b8b8b"};
  padding: 0.75rem 0;
`;

const ErrorText = styled.div`
  color: #ef4444;
  padding: 0.75rem 0;
`;

const ProdCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Thumb = styled.div<{ big?: boolean }>`
  width: ${({ big }) => (big ? "64px" : "40px")};
  height: ${({ big }) => (big ? "64px" : "40px")};
  border-radius: 8px;
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

const NoImg = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
`;

const SmallMuted = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const StockBadge = styled.span<{ $stock: number }>`
  display: inline-block;
  min-width: 44px;
  text-align: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $stock }) =>
    $stock === 0 ? "#ef4444" : $stock <= 3 ? "#f59e0b" : "#10b981"};
  color: white;
`;

const CardGrid = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem;
`;

const CardTop = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  h4 {
    margin: 0;
    font-size: 1rem;
  }
`;

const Info = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Row = styled.div`
  font-size: 0.95rem;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Pager = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.95;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.span`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const NameLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
