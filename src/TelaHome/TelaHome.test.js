import React, { useState, useContext, useReducer } from "react";
import { render, wait, getByPlaceholderText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TelaHome from "./index";
import CarrinhoContext from '../Contexts/CarrinhoContext'
import FiltrosContext from '../Contexts/FiltrosContext'
import axios from "axios";
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import userEvent from "@testing-library/user-event";

axios.get = jest.fn().mockResolvedValue({data:{ "restaurants": [ ]}})
axios.post = jest.fn().mockResolvedValue();
axios.put = jest.fn().mockResolvedValue();

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";
  
const mockData = {
        "restaurants": [
          {
            "id": "1",
            "description": "Habib's é uma rede de restaurantes de comida rápida brasileira especializada em culinária árabe, os restaurantes vendem mais de 600 milhões de esfirras por ano. A empresa emprega 22 mil colaboradores e tem 421 unidades distribuídas em mais de cem municípios em 20 unidades federativas.",
            "shipping": 6,
            "address": "Rua das Margaridas, 110 - Jardim das Flores",
            "name": "Habibs",
            "logoUrl": "http://soter.ninja/futureFoods/logos/habibs.jpg",
            "deliveryTime": 60,
            "category": "Árabe"
          },
        ]
}

describe('Testa se os elementos do Feed aparecem na tela e se as interações retornam as ações esperadas', () => {
    test('Testa se aparece o nome do app, o input de busca e se os restaurantes aparecem na tela após a requisição da API, assim como o menu de categorias', async() => {
        jest.setTimeout(30000);

        axios.get = jest.fn().mockResolvedValue({data: mockData});

        const history = createMemoryHistory();

        const { getByText, getByPlaceholderText } = render(
            <CarrinhoContext.Provider value='carrinho'>
              <FiltrosContext.Provider value='filtro'>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )

        expect(axios.get).toHaveBeenCalledWith(baseUrl,  {
            headers: {
                auth: null,
            }
        });
        
        await wait(() => {
            const nomeApp = getByText("Rappi4");
            expect(nomeApp).toBeInTheDocument();
        }, 2500)

        const busca = getByPlaceholderText("Restaurante");
        expect(busca).toBeInTheDocument();

        const categoria = getByText("Árabe");
        expect(categoria).toBeInTheDocument();
                
        // await wait(() => {
        //     const restaurante = getByText("Habibs");
        //     expect(restaurante).toBeInTheDocument();
        // }, 2500)
    });
    test('Se não há restaurantes, a página fica apenas carregando', () => {
        axios.get = jest.fn().mockRejectedValue();

        const history = createMemoryHistory();

        const { getByAltText } = render(
            <CarrinhoContext.Provider value='carrinho'>
              <FiltrosContext.Provider value='filtro'>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )

        const logo = getByAltText(/Logo Rappi4/i);
        expect(logo).toBeInTheDocument();
    });
    test('Testa se ao digitar no input de busca, o nome do app é substituído pela busca, há um botão de voltar e há a mensagem "Busque pelo nome do restaurante"', async() => {
        jest.setTimeout(30000);

        axios.get = jest.fn().mockResolvedValue({data: mockData});

        const history = createMemoryHistory();

        const { getByText, getByPlaceholderText, queryByText } = render(
            <CarrinhoContext.Provider value='carrinho'>
              <FiltrosContext.Provider value='filtro'>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )

        expect(axios.get).toHaveBeenCalledWith(baseUrl,  {
            headers: {
                auth: null,
            }
        });

        await wait(async() => {
            const busca = getByPlaceholderText("Restaurante");
            await userEvent.type(busca, 'h')
        })
        

        const mensagem = getByText("Busque por nome de restaurantes");
        expect(mensagem).toBeInTheDocument;

        const categoria = queryByText("Árabe");
        expect(categoria).not.toBeInTheDocument();


    });
    test('Testa se ao digitar o nome de um restaurante que existe na lista, ele aparece na tela', () => {

    });
    test('Testa se ao digitar o nome de um restaurante que não existe na lista, não aparece nenhum restaurante na tela, apenas a mensagem "Nada encontrado"', () => {

    });
    test('Testa se, ao clicar em um restaurante, o usuário é redirecionado para a página do restaurante', () => {

    });
})