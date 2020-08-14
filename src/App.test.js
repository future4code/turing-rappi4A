import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import App from './App';

import axios from "axios";
import { Router, Route, MemoryRouter, useParams } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from "@testing-library/user-event";

test('Renderiza a tela inicial', () => {
  render(<App />);
  const logoApp = screen.getByAltText(/Logo Rappi4/i);
  expect(logoApp).toBeInTheDocument();
});

test.skip('Faz o login e redireciona para a Home, onde aparece o menu', async() => {

  const history = createMemoryHistory()
  const { debug } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  
  jest.setTimeout(30000);
  debug(screen.getByTestId("app"))
  
  await wait(() => {
    const logoApp = screen.queryByAltText(/Logo Rappi4/i);
    expect(logoApp).not.toBeInTheDocument();
  });
  
  
});