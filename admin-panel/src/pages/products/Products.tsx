import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { fetchProducts, type Page, type Product } from "../../api/productApi";
import { createProduct, type ProductCreate } from "../../api/productApi";

export default function Products() {
  const [data, setData] = useState<Page<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // create modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<ProductCreate>({
    sku: "",
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    imageUrls: [],
  });

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

  const submitCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // basic validation
    if (!createForm.sku.trim()) return setCreateErr("SKU is required.");
    if (!createForm.name.trim()) return setCreateErr("Name is required.");
    if (
      createForm.price == null ||
      isNaN(Number(createForm.price)) ||
      Number(createForm.price) < 0
    ) {
      return setCreateErr("Price must be a number ≥ 0.");
    }
    if (
      createForm.stock == null ||
      isNaN(Number(createForm.stock)) ||
      Number(createForm.stock) < 0
    ) {
      return setCreateErr("Stock must be an integer ≥ 0.");
    }

    try {
      setCreating(true);
      await createProduct({
        ...createForm,
        price: Number(createForm.price),
        stock: Number(createForm.stock),
      });

      // close modal and refresh list (manual refresh so you don't rely on deps)
      setCreateOpen(false);
      setCreateErr(null);
      setLoading(true);
      const refreshed = await fetchProducts({ q, category, page, size, sort });
      setData(refreshed);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : err instanceof Error
        ? err.message
        : "Failed to create product.";
      setCreateErr(msg);
    } finally {
      setCreating(false);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>Products</Title>
        <Button
          onClick={() => {
            setCreateErr(null);
            setCreateOpen(true);
          }}
        >
          + Add Product
        </Button>

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
      {createOpen && (
        <ModalOverlay onClick={() => !creating && setCreateOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Add Product</ModalTitle>
            {createErr && <ErrorText>{createErr}</ErrorText>}
            <form onSubmit={submitCreate}>
              <FormGrid>
                <Field>
                  <FLabel>SKU</FLabel>
                  <Input
                    value={createForm.sku}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        sku: e.currentTarget.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field>
                  <FLabel>Name</FLabel>
                  <Input
                    value={createForm.name}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        name: e.currentTarget.value,
                      })
                    }
                    required
                  />
                </Field>
                <Field>
                  <FLabel>Category</FLabel>
                  <Input
                    value={createForm.category ?? ""}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        category: e.currentTarget.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <FLabel>Price (BHD)</FLabel>
                  <Input
                    type="number"
                    step="0.001"
                    min={0}
                    value={createForm.price}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        price: Number(e.currentTarget.value),
                      })
                    }
                    required
                  />
                </Field>
                <Field>
                  <FLabel>Stock</FLabel>
                  <Input
                    type="number"
                    min={0}
                    value={createForm.stock}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        stock: Number(e.currentTarget.value),
                      })
                    }
                    required
                  />
                </Field>
                <Field $colSpan={2}>
                  <FLabel>Description</FLabel>
                  <Textarea
                    rows={4}
                    value={createForm.description ?? ""}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        description: e.currentTarget.value,
                      })
                    }
                  />
                </Field>
                <Field $colSpan={2}>
                  <FLabel>Image URLs (one per line)</FLabel>
                  <Textarea
                    rows={4}
                    value={(createForm.imageUrls ?? []).join("\n")}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        imageUrls: e.currentTarget.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder={`https://.../image1.jpg
https://.../image2.jpg`}
                  />
                </Field>
              </FormGrid>

              <ModalActions>
                <GhostBtn
                  type="button"
                  disabled={creating}
                  onClick={() => setCreateOpen(false)}
                >
                  Cancel
                </GhostBtn>
                <PrimaryBtn type="submit" disabled={creating}>
                  {creating ? "Creating..." : "Create"}
                </PrimaryBtn>
              </ModalActions>
            </form>
          </Modal>
        </ModalOverlay>
      )}
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 50;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  width: min(720px, 100%);
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const ModalTitle = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label<{ $colSpan?: number }>`
  display: block;
  grid-column: span ${({ $colSpan }) => $colSpan ?? 1};
`;

const FLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 0.35rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  outline: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  outline: none;
  resize: vertical;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.9rem;
`;

const PrimaryBtn = styled.button`
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GhostBtn = styled.button`
  padding: 0.5rem 0.9rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
