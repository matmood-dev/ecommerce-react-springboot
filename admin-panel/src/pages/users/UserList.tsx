import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllUsers } from "../../api/userApi";
import styled from "styled-components";
import type { User } from "../../types";

import EmptyComponent from "../../components/EmptyComponent";
import RocketLoader from "../../components/RocketLoader";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setHasError(res.data.length === 0);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleUserClick = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <Wrapper>
      <Title>Users</Title>

      {loading ? (
        <RocketLoader />
      ) : hasError ? (
        <EmptyComponent />
      ) : (
        <>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                  </tr>
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
                    <Label>Full Name:</Label> {user.firstName} {user.lastName}
                  </Row>
                  <Row>
                    <Label>Email:</Label> {user.email}
                  </Row>
                </Info>
              </Card>
            ))}
          </CardGrid>
        </>
      )}
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
