// src/styles/theme.ts
export const lightTheme = {
  background: '#ffffff',
  text: '#0a0a0a',       // Deep black for maximum contrast
  primary: '#000000',    // Pure black as primary
  secondary: '#333333',  // Dark gray for gradients
  accent: '#555555',     // Medium gray for accents
  card: '#f5f5f5',      // Very light gray for cards
  border: '#e5e5e5',     // Light gray border
  header: {
    background: '#ffffff',
    text: '#0a0a0a',
    shadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
    border: '#e5e5e5'
  }
};

export const darkTheme = {
  background: '#0a0a0a',  // Deep black background
  text: '#ffffff',       // Pure white text
  primary: '#ffffff',    // White as primary
  secondary: '#cccccc',  // Light gray for gradients
  accent: '#999999',     // Medium gray for accents
  card: '#1a1a1a',      // Dark gray cards
  border: '#333333',     // Dark gray border
  header: {
    background: '#0a0a0a',
    text: '#ffffff',
    shadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
    border: '#333333'
  }
};