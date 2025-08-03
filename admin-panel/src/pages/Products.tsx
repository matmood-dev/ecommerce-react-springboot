import styled from "styled-components";
import mockProducts from "../data/mockProducts.json";

export default function Products() {
  return (
    <Wrapper>
      <Title>Products</Title>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <ProductImage src={product.image} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price.toFixed(2)} BHD</td>
                <td>{product.stock}</td>
                <td>
                  <StatusBadge status={product.status}>
                    {product.status}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <CardGrid>
        {mockProducts.map((product) => (
          <Card key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <Info>
              <strong>{product.name}</strong>
              <span>{product.category}</span>
              <span>{product.price.toFixed(2)} BHD</span>
              <span>Stock: {product.stock}</span>
              <StatusBadge status={product.status}>
                {product.status}
              </StatusBadge>
            </Info>
          </Card>
        ))}
      </CardGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

/* TABLE VIEW */

const TableWrapper = styled.div`
  overflow-x: auto;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    white-space: nowrap;
  }

  th {
    background: ${({ theme }) => theme.card};
    font-weight: 600;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
`;

/* CARD VIEW */

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
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
  width: fit-content;
  color: #fff;
  background-color: ${({ status }) =>
    status === "active"
      ? "#22c55e"
      : status === "inactive"
      ? "#ef4444"
      : "#999"};
`;
