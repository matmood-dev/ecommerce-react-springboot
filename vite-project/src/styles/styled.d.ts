// src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string;
    text: string;
    primary: string;
  }
}
