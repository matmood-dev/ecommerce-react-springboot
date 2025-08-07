// src/pages/UserDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserById, deleteUser } from "../../api/userApi";
import type { User } from "../../types";
import RocketLoader from "../../components/RocketLoader";
import EmptyComponent from "../../components/EmptyComponent";
import BackButton from "../../components/elements/BackButton";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed || !id) return;

    try {
      await deleteUser(Number(id));
      navigate("/users");
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    if (!id) return;

    getUserById(Number(id))
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Wrapper>
      <BackButton />

      {loading ? (
        <RocketLoader />
      ) : hasError || !user ? (
        <EmptyComponent />
      ) : (
        <Card>
          <Title>User Details</Title>
          <Field>
            <Label>ID:</Label> {user.id}
          </Field>
          <Field>
            <Label>Username:</Label> {user.username}
          </Field>
          <Field>
            <Label>Full Name:</Label> {user.firstName} {user.lastName}
          </Field>
          <Field>
            <Label>Email:</Label> {user.email}
          </Field>
          <Field>
            <Label>Role:</Label> {user.role}
          </Field>
          <Actions>
            <EditButton onClick={handleEdit}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </Actions>
        </Card>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  max-width: "100%";
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;

const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;
