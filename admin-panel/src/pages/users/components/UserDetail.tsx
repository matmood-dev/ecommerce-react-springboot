import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserById, updateUser, deleteUser } from "../../../api/userApi";
import type { User } from "../../../types";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      getUserById(Number(id)).then((res) => {
        setUser(res.data);
        setFormData(res.data);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (id && formData) {
      const form = new FormData();
      form.append(
        "user",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );
      if (file) {
        form.append("file", file);
      }

      updateUser(Number(id), form)
        .then(() => {
          alert("User updated");
          setUser(formData); 
          setEditMode(false);
          setFile(null); 
        })
        .catch((err) => {
          console.error("Update failed:", err);
          alert("Update failed");
        });
    }
  };

  const handleDelete = () => {
    if (id && window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(Number(id)).then(() => {
        alert("User deleted");
        navigate("/users");
      });
    }
  };

  if (!user || !formData) return <Wrapper>Loading user...</Wrapper>;

  return (
    <Wrapper>
      <Card>
        <Header>User Details</Header>

        <Field>
          <Label>ID:</Label>
          <Value>{user.id}</Value>
        </Field>

        <Field>
          <Label>Username:</Label>
          {editMode ? (
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          ) : (
            <Value>{user.username}</Value>
          )}
        </Field>

        <Field>
          <Label>First Name:</Label>
          {editMode ? (
            <Input
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
            />
          ) : (
            <Value>{user.firstName}</Value>
          )}
        </Field>

        <Field>
          <Label>Last Name:</Label>
          {editMode ? (
            <Input
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
            />
          ) : (
            <Value>{user.lastName}</Value>
          )}
        </Field>

        <Field>
          <Label>Email:</Label>
          {editMode ? (
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <Value>{user.email}</Value>
          )}
        </Field>

        {editMode && (
          <Field>
            <Label>New Profile Photo:</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Field>
        )}

        <ButtonGroup>
          {editMode ? (
            <>
              <SaveButton onClick={handleSave}>💾 Save</SaveButton>
              <CancelButton onClick={() => setEditMode(false)}>
                ❌ Cancel
              </CancelButton>
            </>
          ) : (
            <>
              <EditButton onClick={() => setEditMode(true)}>✏️ Edit</EditButton>
              <DeleteButton onClick={handleDelete}>🗑️ Delete</DeleteButton>
            </>
          )}
        </ButtonGroup>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.background};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  min-width: 500px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Header = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const Field = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.text};
`;

const Value = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.accent}33;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const EditButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled(EditButton)`
  background-color: #dc2626;

  &:hover {
    background-color: #b91c1c;
  }
`;

const SaveButton = styled(EditButton)``;

const CancelButton = styled(EditButton)`
  background-color: #6b7280;

  &:hover {
    background-color: #4b5563;
  }
`;
