import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { Router } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import TelaDeCarrinho from "./index";

// axios.post = jest.fn().mockResolvedValue([{
//     "name": "João Pedro",
//     "email": "jp@gmail.com",
//     "cpf":"344.567.987-99",
//     "password": "123456"
// }]);

// const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/signup";


describe('Renderização inicial', () => {
  test('Verifica inputs na tela', () => {
    const history = createMemoryHistory();
    const { getByTestId  } = render(
      <Router history={history}>
        <TelaDeCarrinho/>
      </Router>
    )
    
    const inputDinheiro = getByTestId ("inputRadioDinheiro")
    expect(inputDinheiro).toBeInTheDocument()

    const inputCartao = getByTestId ("inputRadioCartao")
    expect(inputCartao).toBeInTheDocument()
  })

  test('Verifica botão na tela', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <TelaDeCarrinho/>
      </Router>
    )

    const botaoLogin = getByTestId ("botaoConfirmar")
    expect(botaoLogin).toBeInTheDocument()
  })
})

describe('Controlando elementos', () => {
  test('Controlar inputs', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <TelaDeCarrinho/>
      </Router>
    )
    
    const inputDinheiro = getByTestId("inputRadioDinheiro")
    fireEvent.click(inputDinheiro)
    expect(inputDinheiro).toHaveValue("money")
  })
})