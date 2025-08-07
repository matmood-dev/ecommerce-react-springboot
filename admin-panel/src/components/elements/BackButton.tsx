import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function BackButton() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)}>← Back</Button>;
}

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;
