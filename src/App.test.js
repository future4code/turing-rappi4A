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
