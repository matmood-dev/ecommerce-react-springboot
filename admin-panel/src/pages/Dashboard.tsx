import styled from "styled-components";

export default function Dashboard() {
  return (
    <Wrapper>
      <Title>Dashboard</Title>
      <Grid>
        <Card>
          <Label>Total Orders</Label>
          <Value>128</Value>
        </Card>
        <Card>
          <Label>Products</Label>
          <Value>32</Value>
        </Card>
        <Card>
          <Label>Revenue</Label>
          <Value>1,420 BHD</Value>
        </Card>
        <Card>
          <Label>Customers</Label>
          <Value>87</Value>
        </Card>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  text-align: center;
`;

const Label = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
  opacity: 0.8;
`;

const Value = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;
