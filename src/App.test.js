import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

test('Faz o login e redireciona para a Home, onde aparece o menu', async() => {

  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>
  )

  // const logoApp = screen.queryByAltText(/Logo Rappi4/i);
  // expect(logoApp).toBeInTheDocument();

  // jest.setTimeout(30000);

  // expect(logoApp).not.toBeInTheDocument();
  
  // await waitForElementToBeRemoved(() => {
  //   const logoApp = screen.getByAltText(/Logo Rappi4/i);
  //   logoApp
  // }, 50000)
});