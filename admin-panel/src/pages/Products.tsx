import styled from "styled-components";
import mockProducts from "../data/mockProducts.json";

export default function Products() {
  return (
    <Wrapper>
      <Title>Products</Title>
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
                <StatusBadge status={product.status}>{product.status}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
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

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 4px;
  color: #fff;
  background-color: ${({ status }) =>
    status === "active" ? "#22c55e" : status === "inactive" ? "#ef4444" : "#999"};
`;
