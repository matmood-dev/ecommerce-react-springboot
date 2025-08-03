import styled from "styled-components";
import customers from "../data/mockCustomers.json";

export default function Customers() {
  return (
    <Wrapper>
      <Title>Customers</Title>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined</th>
            <th>Status</th>
            <th>Total Orders</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.id}</td>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.phone}</td>
              <td>{cust.joined}</td>
              <td>
                <StatusBadge status={cust.status}>{cust.status}</StatusBadge>
              </td>
              <td>{cust.totalOrders}</td>
              <td>{cust.totalSpent.toFixed(2)} BHD</td>
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
    status === "active" ? "#10b981"
    : status === "inactive" ? "#ef4444"
    : "#9ca3af"};
  color: white;
`;
