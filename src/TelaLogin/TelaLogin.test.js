import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { Router } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import TelaLogin from "./index";

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
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <TelaLogin/>
      </Router>
    )
    
    const inputEmail = getByPlaceholderText("email@email.com")
    expect(inputEmail).toBeInTheDocument()

    const inputSenha = getByPlaceholderText("Mínimo 6 caracteres")
    expect(inputSenha).toBeInTheDocument()
  })

  test('Verifica botão na tela', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <TelaLogin/>
      </Router>
    )

    const botaoLogin = getByTestId ("botaoEntrar")
    expect(botaoLogin).toBeInTheDocument()
  })
})

describe('Controlando elementos', () => {
  test('Controlar inputs', () => {
    const history = createMemoryHistory();
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <TelaLogin/>
      </Router>
    )
    
    const inputEmail = getByPlaceholderText("email@email.com")
    fireEvent.change(inputEmail, {
      target: {
        value: 'teste@teste.com'
      }
    })
    expect(inputEmail).toHaveValue("teste@teste.com")

    const inputSenha = getByPlaceholderText("Mínimo 6 caracteres")
    fireEvent.change(inputSenha, {
      target: {
        value: 'teste123'
      }
    })
    expect(inputSenha).toHaveValue('teste123')
  })
})