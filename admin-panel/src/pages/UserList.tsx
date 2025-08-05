import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import styled from "styled-components";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data));
  }, []);

  const handleDelete = (id: number) => {
    deleteUser(id).then(() => {
      setUsers((prev) => prev.filter((user: any) => user.id !== id));
    });
  };

  return (
    <Wrapper>
      <Title>Users</Title>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>
                  <DeleteBtn onClick={() => handleDelete(user.id)}>
                    Delete
                  </DeleteBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <CardGrid>
        {users.map((user: any) => (
          <Card key={user.id}>
            <Info>
              <Row>
                <Label>ID:</Label> #{user.id}
              </Row>
              <Row>
                <Label>Username:</Label> {user.username}
              </Row>
              <Row>
                <Label>Full Name:</Label> {user.firstName} {user.lastName}
              </Row>
              <Row>
                <Label>Email:</Label> {user.email}
              </Row>
              <DeleteBtn onClick={() => handleDelete(user.id)}>
                Delete
              </DeleteBtn>
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

const DeleteBtn = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #dc2626;
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
