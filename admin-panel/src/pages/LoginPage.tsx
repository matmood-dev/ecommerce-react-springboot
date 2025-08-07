import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      return setError("Username and password are required");
    }

    setSubmitting(true);
    try {
      const res = await login({ username, password });

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data || "Login failed";
      setError(typeof msg === "string" ? msg : msg.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <ErrorText>{error}</ErrorText>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
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

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  background: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.95rem;
  text-align: center;
`;
