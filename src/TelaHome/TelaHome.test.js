import React from "react";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TelaHome from "./index";
import CarrinhoContext from '../Contexts/CarrinhoContext'
import FiltrosContext from '../Contexts/FiltrosContext'
import axios from "axios";
import { Router, useParams } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import userEvent from "@testing-library/user-event";
import TelaListaDeRestaurantes from "../TelaListaDeRestaurantes";


const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";

// Simula um restaurante para receber pela fake API
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

// Simula um pedido ativo para receber pela fake API
const mockDataOrder = {
    "orders":  [
        {
        "totalPrice": 14,
        "restaurantName": "Habibs",
        "createdAt": 1597426273283,
        "expiresAt": 1597429873283
        },
    ]
}

// Simula uma requisição para a fake API
axios.get = jest.fn().mockResolvedValue({data: mockData});
axios.get = jest.fn().mockResolvedValue({data: mockDataOrder});

// Simula o dispatch do reducer
const dispatch = jest.fn();

// Simula os estados de carrinho e filtros
const carrinho = [];
const filtroCategoria = "Árabe";
const filtroBusca = "";

describe('Testa se os elementos do Feed aparecem na tela e se as interações retornam as ações esperadas', () => {
    test('Testa se aparece o nome do app, o input de busca e se os restaurantes aparecem na tela após a requisição da API, assim como o menu de categorias', async() => {
        axios.get = jest.fn().mockResolvedValueOnce({data: mockData});

        // Cria a memória da url, sem ser preciso mexer na barra de endereços
        const history = createMemoryHistory();

        // renderiza o componente com o context, o reducer e a rota
        const { getByText, getByPlaceholderText, queryByText } = render(
            <CarrinhoContext.Provider value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )
        
        //testa se a requisição fake foi feita
        expect(axios.get).toHaveBeenCalledWith(baseUrl,  {
            headers: {
                auth: null,
            }
        });

        // espera para receber os elementos da página após a requisição (lembrar de colocar o async na função de test)
        await wait(() => {
            const nomeApp = getByText("Rappi4");
            expect(nomeApp).toBeInTheDocument();
        }, 25000)

        // confirma se há um input com o placeholder "Restaurante"
        const busca = getByPlaceholderText("Restaurante");
        expect(busca).toBeInTheDocument();

        // Aguarda para confirma se a categoria do restaurante aparece na tela
        await wait(() => {
            const categoria = getByText("Árabe");
            expect(categoria).toBeInTheDocument();
        })
        
        // Aguarda para confirmar se o restaurante aparece na tela
        await wait(() => {
            const restaurante = queryByText("Habibs");
            expect(restaurante).toBeInTheDocument();
        }, 50000)
    });
    test('Se não há restaurantes, a página fica apenas carregando', () => {
        // Simula uma requisição seja rejeitada
        axios.get = jest.fn().mockRejectedValueOnce();

        // Cria a memória da url, sem ser preciso mexer na barra de endereços
        const history = createMemoryHistory();

        // Renderiza o componente com context, reducer e rota
        const { getByAltText } = render(
            <CarrinhoContext.Provider value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )

        // Confirma se a imagem do loading aparece
        const logo = getByAltText(/Logo Rappi4/i);
        expect(logo).toBeInTheDocument();
    });
    test('Testa se ao digitar no input de busca, o nome do app é substituído pela busca, há um botão de voltar e há a mensagem "Busque pelo nome do restaurante"', async() => {
        // Simula uma requisição fake
        axios.get = jest.fn().mockResolvedValueOnce({data: mockData});

        // Cria a memória da url, sem ser preciso mexer na barra de endereços
        const history = createMemoryHistory();

        // Renderiza o componente com context, reducer e rota
        const { getByText, getByPlaceholderText, queryByText } = render(
            <CarrinhoContext.Provider  value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )

        // Confirma se a requisição foi realizada com a url correta
        expect(axios.get).toHaveBeenCalledWith(baseUrl,  {
            headers: {
                auth: null,
            }
        });

        // Aguarda para buscar o input e digitar um caracter nele
        await wait(async() => {
            const busca = getByPlaceholderText("Restaurante");
            await userEvent.type(busca, 'h')
        })

        // Confirma se a mensagem de busca aparece
        const mensagem = getByText("Busque por nome de restaurantes");
        expect(mensagem).toBeInTheDocument;

        // Confirma se a categoria não aparece mais na página
        const categoria = queryByText("Árabe");
        expect(categoria).not.toBeInTheDocument();

        // Confirma se não aparece mais o restaurante na tela
        const restaurante = queryByText("Habibs");
        expect(restaurante).not.toBeInTheDocument();

    });
    test('Testa se ao digitar o nome de um restaurante que existe na lista, ele aparece na tela', async() => {
        // Simula uma requisição fake
        axios.get = jest.fn().mockResolvedValueOnce({data: mockData});

        // Cria a memória da url, sem ser preciso mexer na barra de endereços
        const history = createMemoryHistory();

        // Renderiza o componente com context, reducer e rota
        const { getByText, getByPlaceholderText, queryByText } = render(
            <CarrinhoContext.Provider  value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )

        // Aguarda para buscar o input e digitar um caracter nele
        await wait(async() => {
            const busca = getByPlaceholderText("Restaurante");
            await userEvent.type(busca, 'h')
        })

        // Confirma se a mensagem de busca aparece
        const mensagem = getByText("Busque por nome de restaurantes");
        expect(mensagem).toBeInTheDocument;

        // Aguarda a digitação de mais caracteres
        const busca = getByPlaceholderText("Restaurante");
        await userEvent.type(busca, 'hab')

        // Confirma se o valor do input e o texto digitado
        await wait(() => {
            expect(busca).toHaveValue('hab');
        }, 2500)

        // Confirma se o restaurante aparece na tela
        await wait(() => {
            const restaurante = queryByText("Habibs");
            expect(restaurante).toBeInTheDocument();
        }, 3500)
    });
    test('Testa se ao digitar o nome de um restaurante que não existe na lista, não aparece nenhum restaurante na tela, apenas a mensagem "Nada encontrado"', async() => {
        // Simula uma requisição fake
        axios.get = jest.fn().mockResolvedValueOnce({data: mockData});

        // Cria a memória da url, sem ser preciso mexer na barra de endereços
        const history = createMemoryHistory();

        // Renderiza o componente com context, reducer e rota
        const { getByText, getByPlaceholderText } = render(
            <CarrinhoContext.Provider  value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaHome />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )
        
        // Simula um texto digitado no input de um restaurante que não existe
        await wait(async() => {
            const busca = getByPlaceholderText("Restaurante");
            await userEvent.type(busca, 'mc donalds')
        })

        // Confirma se aparece a mensagem de nada encontrado
        const mensagem = getByText("Nada encontrado :(");
        expect(mensagem).toBeInTheDocument;
    });
    test('Testa se, ao clicar em um restaurante, o usuário é redirecionado para a página do restaurante', async() => {
        // Simula uma requisição fake
        axios.get = jest.fn().mockResolvedValueOnce({data: mockData});
        
        // Simula o useParams com o path :1
        useParams.mockReturnValue({ id: "1" });

        // Cria a memória da url, sem ser preciso mexer na barra de endereços
        const history = createMemoryHistory();

        // Renderiza o componente com context, reducer e rota
        const { getByText, getByTestId } = render(
            <CarrinhoContext.Provider value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaHome />
                    <TelaListaDeRestaurantes />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )
        
        //Confirma se o restaurante aparece na tela e clica nele
        await wait(() => {
            const restaurante = getByTestId("Habibs");
            expect(restaurante).toBeInTheDocument();
            userEvent.click(restaurante)
        }, 3500)

        // await wait(() => {
        //     const cabecalhoRestaurante = getByText("Restaurante");
        //     expect(cabecalhoRestaurante).toBeInTheDocument();
        // }, 10000)
    });
})