// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    transition: all 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    font-size: 1rem;
  }
`;

export default GlobalStyle;
