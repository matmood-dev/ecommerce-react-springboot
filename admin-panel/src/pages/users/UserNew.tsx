import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { AxiosError } from "axios";
import { createUser } from "../../api/userApi";
import type { User } from "../../types";
import BackButton from "../../components/elements/BackButton";

type NewUser = Omit<User, "id" | "password"> & {
  password: string;
  role: "USER" | "ADMIN";
};

export default function UserNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewUser>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER", // Default role
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

    // Validations
    if (!formData.username.trim()) return setError("Username is required");
    if (/\s/.test(formData.username))
      return setError("Username cannot contain spaces");
    if (!formData.email.trim()) return setError("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return setError("Please enter a valid email address");
    if (!formData.password.trim()) return setError("Password is required");

    setSubmitting(true);

    try {
      await createUser(formData);
      navigate("/users");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <BackButton />
    <Wrapper>
      <Title>Add New User</Title>
      

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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Select name="role" value={formData.role} onChange={handleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </Select>

        {error && <ErrorText>{error}</ErrorText>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Create User"}
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
