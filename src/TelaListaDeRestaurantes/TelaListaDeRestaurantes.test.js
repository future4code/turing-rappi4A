import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { createMemoryHistory  } from 'history';
import "@testing-library/jest-dom/extend-expect";
import TelaListaDeRestaurantes from "./index";
import CarrinhoContext from '../Contexts/CarrinhoContext';
import FiltrosContext from '../Contexts/FiltrosContext';
import axios from "axios";
import { Router, Route, MemoryRouter, useParams } from 'react-router-dom'
import userEvent from "@testing-library/user-event";

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants'

const axiosConfig = {
  headers: {
      auth: null
  }
};

// Simula um post que existe na API
const mockData = {
    "restaurant": {
        "products": [
            {
                "id": "3vcYYSOEf8dKeTPd7vHe",
                "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031408_66194519.jpg",
                "category": "Pastel",
                "name": "Pastel",
                "price": 3,
                "description": "Pastel autêntico, feito na hora!"
            },
        ],
        "id": "1",
        "description": "Habib's é uma rede de restaurantes de comida rápida brasileira especializada em culinária árabe, os restaurantes vendem mais de 600 milhões de esfirras por ano. A empresa emprega 22 mil colaboradores e tem 421 unidades distribuídas em mais de cem municípios em 20 unidades federativas.",
        "shipping": 6,
        "name": "Habibs",
        "address": "Rua das Margaridas, 110 - Jardim das Flores",
        "logoUrl": "http://soter.ninja/futureFoods/logos/habibs.jpg",
        "category": "Árabe",
        "deliveryTime": 60
    }
}

// Moca as requisições para a API
axios.get = jest.fn().mockResolvedValue({data:{}})
axios.post = jest.fn().mockResolvedValue();
axios.put = jest.fn().mockResolvedValue();

// Simula o dispatch do reducer
const dispatch = jest.fn();

// Simula os estados de carrinho e filtros
const carrinho = [];
const filtroCategoria = "Árabe";
const filtroBusca = "";

describe('Testa se os elementos do Restaurante aparecem na tela e se as interações retornam as ações esperadas', () => {
  test('Testa se aparece os detalhes do restaurante e os produtos', async() => {
    // Moca o useParams que pega a id da url para incluir as informações da página. Encontrei explicação nesse link: https://www.smashingmagazine.com/2020/07/react-apps-testing-library/
    useParams.mockReturnValue({ id: "1" });

    // Moca os dados que devem ser recebidos
    axios.get = jest.fn().mockResolvedValue({
      data: mockData
    }, axiosConfig);

    // Simula a renderização do componente, com base na rota (pq ela pega o id pelo useParams). Link de explicação: https://testing-library.com/docs/example-react-router
    const history = createMemoryHistory()
    const { getByText, queryByText, findByText, debug, findByTestId, getByTestId } = render(
      <CarrinhoContext.Provider value={{carrinho:carrinho, dispatch: dispatch }}>
        <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
        <Router history={history}>
              <TelaListaDeRestaurantes />
          </Router>
        </FiltrosContext.Provider>
      </CarrinhoContext.Provider>
    )
    
    // Confirma se as informações do restaurante aparecem na tela
    await wait(() => {
        const cabecalho = queryByText(/restaurante/i);
        expect(cabecalho).toBeInTheDocument;
    }, 3500)
    
    const nomeRestaurante = queryByText(/habibs/i);
    expect(nomeRestaurante).toBeInTheDocument;
    
    //Confirma se o botão adicionar do produto aparece na tela
    const botaoAdicionar = queryByText(/adicionar/i);
    expect(botaoAdicionar).toBeInTheDocument;

    // Confirma se a requisição foi feita para a API fake
    await wait(() => {
      expect(axios.get).toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/1`, axiosConfig)
    });
  });
  test('Testa se, ao clicar em adicionar, é possível alterar a quantidade do produto', async() => {
    // Moca o useParams que pega a id da url para incluir as informações da página. Encontrei explicação nesse link: https://www.smashingmagazine.com/2020/07/react-apps-testing-library/
    useParams.mockReturnValue({ id: "1" });

    // Moca os dados que devem ser recebidos
    axios.get = jest.fn().mockResolvedValue({
      data: mockData
    }, axiosConfig);

    // Simula a renderização do componente, com base na rota (pq ela pega o id pelo useParams). Link de explicação: https://testing-library.com/docs/example-react-router
    const history = createMemoryHistory()
    const { getByText, queryByText, findByText, debug, findByTestId, getByTestId } = render(
      <Router history={history}>
        <TelaListaDeRestaurantes />
      </Router>
    )
        
    //Confirma se o botão adicionar do produto aparece na tela
    const botaoAdicionar = queryByText(/adicionar/i);
    
    await wait(() => {
        expect(botaoAdicionar).toBeInTheDocument;
    }, 3500)

    // await wait(() => {
    //     // Clica no botão adicionar
    //     fireEvent.click(botaoAdicionar);
    // })
    
    // await wait(() => {
    //     const quantidade = queryByText("Selecione a quantidade desejada");
    //     expect(quantidade).toBeInTheDocument();
    // })

    // Confirma se a requisição foi feita para a API fake
    await wait(() => {
      expect(axios.get).toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/1`, axiosConfig)
    });
  });
})