import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza a tela inicial', () => {
  render(<App />);
  const logoApp = screen.getByAltText(/Logo Rappi4/i);
  expect(logoApp).toBeInTheDocument();
});
