import styled from "styled-components";
import orders from "../data/mockOrders.json";

export default function Orders() {
  return (
    <Wrapper>
      <Title>Orders</Title>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </td>
              <td>{order.total.toFixed(2)} BHD</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  th {
    background: ${({ theme }) => theme.card};
    font-weight: 600;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ status }) =>
    status === "Pending" ? "#f59e0b"
    : status === "Shipped" ? "#3b82f6"
    : status === "Delivered" ? "#10b981"
    : status === "Cancelled" ? "#ef4444"
    : "#9ca3af"};
  color: white;
`;
