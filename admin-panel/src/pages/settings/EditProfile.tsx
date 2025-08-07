import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Send API request here
    console.log("Saving...", formData);
    navigate("/settings");
  };

  return (
    <Wrapper>
      <Title>Edit Profile</Title>
      <Form>
        <Label>First Name</Label>
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <Label>Last Name</Label>
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <ButtonGroup>
          <SaveButton onClick={handleSave}>Save</SaveButton>
          <CancelButton onClick={() => navigate("/settings")}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;
