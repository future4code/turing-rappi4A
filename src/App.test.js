import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('testa se o logo aparece na tela', () => {
  const { getByAltText } = render(<App />);
  const logo = getByAltText(/Logo Rappi4/i);
  expect(logo).toBeInTheDocument();
});
