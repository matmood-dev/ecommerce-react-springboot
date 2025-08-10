import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  fetchProductById,
  updateProduct,
  deleteProduct,
  type Product,
  type ProductUpdate,
} from "../../api/productApi";

/* utils (outside component so they don't recreate each render) */
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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [form, setForm] = useState<ProductUpdate | null>(null);

  // delete confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
        const msg = axios.isAxiosError(e)
          ? e.response?.data?.error || e.message
          : e instanceof Error
          ? e.message
          : "Failed to load product.";
        setErr(msg);
      })
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [id]);

  const mainImage = useMemo(
    () => product?.imageUrls?.[activeIdx] ?? "",
    [product, activeIdx]
  );

  const openEdit = () => {
    if (!product) return;
    setForm({
      sku: product.sku,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      imageUrls: product.imageUrls ?? [],
    });
    setFormErr(null);
    setEditOpen(true);
  };

  const submitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product || !form) return;

    // basic validation
    if (!form.sku.trim()) return setFormErr("SKU is required.");
    if (!form.name.trim()) return setFormErr("Name is required.");
    if (form.price == null || isNaN(Number(form.price)) || Number(form.price) < 0)
      return setFormErr("Price must be a number ≥ 0.");
    if (form.stock == null || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      return setFormErr("Stock must be an integer ≥ 0.");

    try {
      setSaving(true);
      const updated = await updateProduct(product.id, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setProduct(updated);
      setEditOpen(false);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : err instanceof Error
        ? err.message
        : "Failed to update product.";
      setFormErr(msg);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!product) return;
    try {
      setDeleting(true);
      await deleteProduct(product.id);
      navigate("/products");
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : err instanceof Error
        ? err.message
        : "Failed to delete product.";
      setErr(msg);
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  /* render */
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
        <Back as={Link} to="/products">
          ← Products
        </Back>
        <Title>{product.name}</Title>
        <HeaderActions>
          <ActionBtn onClick={openEdit}>Edit</ActionBtn>
          <ActionBtn danger onClick={() => setConfirmOpen(true)}>
            Delete
          </ActionBtn>
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
            {(product.imageUrls?.length ? product.imageUrls : [undefined]).map(
              (url, i) => (
                <Thumb
                  key={i}
                  $active={i === activeIdx}
                  onClick={() => setActiveIdx(i)}
                >
                  {url ? (
                    <img src={url} alt={`${product.name} ${i + 1}`} />
                  ) : (
                    <NoImg>IMG</NoImg>
                  )}
                </Thumb>
              )
            )}
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

      {/* Edit Modal */}
      {editOpen && form && (
        <ModalOverlay onClick={() => !saving && setEditOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Edit Product</ModalTitle>
            {formErr && <ErrorText>{formErr}</ErrorText>}
            <form onSubmit={submitEdit}>
              <FormGrid>
                <Field>
                  <FLabel>SKU</FLabel>
                  <Input
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.currentTarget.value })}
                    required
                  />
                </Field>
                <Field>
                  <FLabel>Name</FLabel>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
                    required
                  />
                </Field>
                <Field>
                  <FLabel>Category</FLabel>
                  <Input
                    value={form.category ?? ""}
                    onChange={(e) => setForm({ ...form, category: e.currentTarget.value })}
                  />
                </Field>
                <Field>
                  <FLabel>Price (BHD)</FLabel>
                  <Input
                    type="number"
                    step="0.001"
                    min={0}
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.currentTarget.value) })
                    }
                    required
                  />
                </Field>
                <Field>
                  <FLabel>Stock</FLabel>
                  <Input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.currentTarget.value) })
                    }
                    required
                  />
                </Field>
                <Field $colSpan={2}>
                  <FLabel>Description</FLabel>
                  <Textarea
                    rows={4}
                    value={form.description ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, description: e.currentTarget.value })
                    }
                  />
                </Field>
                <Field $colSpan={2}>
                  <FLabel>Image URLs (one per line)</FLabel>
                  <Textarea
                    rows={4}
                    value={(form.imageUrls ?? []).join("\n")}
                    onChange={(e) =>
                      setForm({
                        ...form,
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
                <GhostBtn type="button" disabled={saving} onClick={() => setEditOpen(false)}>
                  Cancel
                </GhostBtn>
                <PrimaryBtn type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </PrimaryBtn>
              </ModalActions>
            </form>
          </Modal>
        </ModalOverlay>
      )}

      {/* Delete Confirm */}
      {confirmOpen && (
        <ModalOverlay onClick={() => !deleting && setConfirmOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Delete product</ModalTitle>
            <p>
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </p>
            <ModalActions>
              <GhostBtn type="button" disabled={deleting} onClick={() => setConfirmOpen(false)}>
                Cancel
              </GhostBtn>
              <DangerBtn type="button" disabled={deleting} onClick={confirmDelete}>
                {deleting ? "Deleting..." : "Delete"}
              </DangerBtn>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}

/* === styles (unchanged from your version) === */
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
  border: 2px solid
    ${({ $active, theme }) => ($active ? theme.primary : theme.border)};
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
  font-family: ${({ mono }) =>
    mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit"};
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

/* Modal styles */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
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

  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const GhostBtn = styled.button`
  padding: 0.5rem 0.9rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;

  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const DangerBtn = styled(PrimaryBtn)`
  background: #ef4444;
`;
