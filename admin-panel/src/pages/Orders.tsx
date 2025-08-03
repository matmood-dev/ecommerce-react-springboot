import styled from "styled-components";
import orders from "../data/mockOrders.json";

export default function Orders() {
  return (
    <Wrapper>
      <Title>Orders</Title>

      <TableWrapper>
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
                  <StatusBadge status={order.status}>
                    {order.status}
                  </StatusBadge>
                </td>
                <td>{order.total.toFixed(2)} BHD</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <CardGrid>
        {orders.map((order) => (
          <Card key={order.id}>
            <Info>
              <Row>
                <Label>ID:</Label> #{order.id}
              </Row>
              <Row>
                <Label>Customer:</Label> {order.customer}
              </Row>
              <Row>
                <Label>Date:</Label> {order.date}
              </Row>
              <Row>
                <Label>Total:</Label> {order.total.toFixed(2)} BHD
              </Row>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </Info>
          </Card>
        ))}
      </CardGrid>
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

const TableWrapper = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  th,
  td {
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
    status === "Pending"
      ? "#f59e0b"
      : status === "Shipped"
      ? "#3b82f6"
      : status === "Delivered"
      ? "#10b981"
      : status === "Cancelled"
      ? "#ef4444"
      : "#9ca3af"};
  color: white;
`;

/* CARD VIEW FOR MOBILE */

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
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled.div`
  font-size: 0.95rem;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;
