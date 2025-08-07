import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Plus } from "lucide-react";

import { getAllUsers } from "../../api/userApi";
import type { User } from "../../types";

import EmptyComponent from "../../components/EmptyComponent";
import RocketLoader from "../../components/RocketLoader";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setHasError(res.data.length === 0);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch users:", err);
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUserClick = (id: number) => navigate(`/users/${id}`);

  const handleAddUser = () => navigate("/users/new");

  if (loading) return <RocketLoader />;
  if (hasError) return <EmptyComponent />;

  return (
    <Wrapper>
      <Header>
        <Title>Users</Title>
        <AddButton onClick={handleAddUser}>
          <Plus size={16} style={{ marginRight: "6px" }} />
          Add New User
        </AddButton>
      </Header>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.id} onClick={() => handleUserClick(user.id)}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <CardGrid>
        {users.map((user) => (
          <Card key={user.id} onClick={() => handleUserClick(user.id)}>
            <Info>
              <Row>
                <Label>ID:</Label> #{user.id}
              </Row>
              <Row>
                <Label>Username:</Label> {user.username}
              </Row>
              <Row>
                <Label>Full Name:</Label>{" "}
                {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
              </Row>
              <Row>
                <Label>Email:</Label> {user.email}
              </Row>
              <Row>
                <Label>Role:</Label> {user.role}
              </Row>
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
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

const TableRow = styled.tr`
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
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
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow};
  }
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
