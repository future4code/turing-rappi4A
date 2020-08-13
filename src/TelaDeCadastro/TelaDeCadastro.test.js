import React, { useState } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { Router } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import TelaDeCadastro from "./index";

// axios.post = jest.fn().mockResolvedValue([{
//     "name": "João Pedro",
//     "email": "jp@gmail.com",
//     "cpf":"344.567.987-99",
//     "password": "123456"
// }]);

// const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/signup";


describe('Cadastra usuário', () => {
    test('Verificacao de inputs na tela', () => {
        const history = createMemoryHistory();
        const { getByText ,getByPlaceholderText } = render(
                <Router history={history}>
                    <TelaDeCadastro/>
                </Router>
        )

        const input = getByPlaceholderText("Nome e Sobrenome")

        expect(input).toBeInTheDocument()
    })
})