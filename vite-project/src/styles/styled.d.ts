// src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    card: string;
    border: string;
    header: {
      background: string;
      text: string;
      shadow: string;
      border: string;
    };
  }
}
