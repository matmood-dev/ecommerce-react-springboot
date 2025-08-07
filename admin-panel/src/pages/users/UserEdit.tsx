import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import type { AxiosError } from "axios";
import { getUserById, updateUser } from "../../api/userApi";
import type { User } from "../../types";
import RocketLoader from "../../components/RocketLoader";
import BackButton from "../../components/elements/BackButton";

type EditableUser = Omit<User, "id"> & { password?: string };

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EditableUser>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Password is optional for editing
    role: "USER",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getUserById(Number(id))
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.error("Failed to load user", err);
        setError("Failed to load user");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "username" && /\s/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username.trim()) return setError("Username is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return setError("Invalid email");

    const { password, ...rest } = formData;
    const payload = password?.trim() ? { ...rest, password } : rest;

    setSubmitting(true);
    try {
      await updateUser(Number(id), payload as Omit<User, "id">);
      navigate(`/users/${id}`);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update user");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <RocketLoader />;
  if (!id) return <div>Invalid user ID</div>;

  return (
    <>
      <BackButton />
      <Wrapper>
        <Title>Edit User</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="New Password (leave blank to keep current)"
            value={formData.password || ""}
            onChange={handleChange}
          />

          <Select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </Select>

          {error && <ErrorText>{error}</ErrorText>}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update User"}
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background: ${({ theme }) => theme.accent};
  color: white;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.95rem;
`;
