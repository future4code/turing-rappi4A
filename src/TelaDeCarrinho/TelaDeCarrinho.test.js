import React from "react";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TelaDeCarrinho from "./index";
import CarrinhoContext from '../Contexts/CarrinhoContext'
import FiltrosContext from '../Contexts/FiltrosContext'
import axios from "axios";
import { Router, useParams } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import userEvent from "@testing-library/user-event";


const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";

const axiosConfig = {
    headers: {
        auth: null
    }
};

// Simula uma requisição para a fake API
axios.post = jest.fn().mockResolvedValue();

const mockDataEndereco = {
    "address": {
        "neighbourhood": "Vila N. Conceição",
        "number": "177",
        "city": "São Paulo",
        "apartment": null,
        "state": "SP",
        "street": "R. Afonso Braz"
    }
}

const mockDataRestaurante = {
    "restaurant": {
        "products": [{
            "id": "3vcYYSOEf8dKeTPd7vHe",
            "price": 3,
            "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031408_66194519.jpg",
            "description": "Pastel autêntico, feito na hora!",
            "category": "Pastel",
            "name": "Pastel",
            "quantity": 2,
            "restauranteId": "1"
        },
        {
            "id": "5omTFSOBYiTqeiDwhiBx",
            "name": "Bibsfiha queijo",
            "category": "Salgado",
            "description": "Esfiha deliciosa, receita secreta do Habibs.",
            "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031403_66194479.jpg",
            "price": 1,
            "quantity": 2,
            "restauranteId": "1"
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


// Simula o dispatch do reducer
const dispatch = jest.fn();

// Simula os estados de carrinho e filtros
const carrinho = [{
        "id": "3vcYYSOEf8dKeTPd7vHe",
        "price": 3,
        "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031408_66194519.jpg",
        "description": "Pastel autêntico, feito na hora!",
        "category": "Pastel",
        "name": "Pastel",
        "quantity": 2,
        "restauranteId": "1"
    },
    {
        "id": "5omTFSOBYiTqeiDwhiBx",
        "name": "Bibsfiha queijo",
        "category": "Salgado",
        "description": "Esfiha deliciosa, receita secreta do Habibs.",
        "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031403_66194479.jpg",
        "price": 1,
        "quantity": 2,
        "restauranteId": "1"
    },
];
const filtroCategoria = "Árabe";
const filtroBusca = "";

describe.skip('Testa se os elementos do Feed aparecem na tela e se as interações retornam as ações esperadas', () => {
      test('Testa se os detalhes dos produtos aparecem na tela o envio do pedido', async() => {

        axios.get = jest.fn().mockResolvedValue({data: mockDataEndereco })
        axios.get = jest.fn().mockResolvedValue({data: mockDataRestaurante })

        // Simula a renderização do componente, com base na rota (pq ela pega o id pelo useParams). Link de explicação: https://testing-library.com/docs/example-react-router
        const history = createMemoryHistory()
        const { getByText, getByTestId, debug } = render(
            <CarrinhoContext.Provider value={{carrinho:carrinho, dispatch: dispatch }}>
              <FiltrosContext.Provider value={{filtroCategoria:filtroCategoria, filtroBusca:filtroBusca, dispatch: dispatch }}>
              <Router history={history}>
                    <TelaDeCarrinho />
                </Router>
              </FiltrosContext.Provider>
            </CarrinhoContext.Provider>
        )
            
        // Confirma se a requisição foi feita para a API fake
        // await wait(() => {
        //     expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/1`, axiosConfig)
        //     expect(axios.get).toHaveBeenCalledWith(`https://us-central1-missao-newton.cloudfunctions.net/rappi4A/profile/address`, axiosConfig)
        // }, 50000);
        
        // debug(getByTestId("meu-carrinho"));

        // Confirma se as informações do restaurante aparecem na tela
        const cabecalho = getByText(/meu carrinho/i);
        expect(cabecalho).toBeInTheDocument;

        
        const endereco = getByText("Endereço de entrega");
        expect(endereco).toBeInTheDocument;
        
        // const rua = getByText("R. Afonso Braz");
        // expect(rua).toBeInTheDocument;

        // await wait(() => {
        //     const nomeRestaurante = getByText("Habibs");
        //     expect(nomeRestaurante).toBeInTheDocument; 
        // })
        
        // await wait(() => {
        //     const frete = getByText("Frete R$ 6,00");
        //     expect(frete).toBeInTheDocument;
        // }, 45000)

        const produto1 = getByText("Pastel autêntico, feito na hora!");
        expect(produto1).toBeInTheDocument;
        
        const produto2 = getByText("Bibsfiha queijo");
        expect(produto2).toBeInTheDocument;
        
        const subtotal = getByText("R$ 8.00");
        expect(subtotal).toBeInTheDocument;
        
        const pagamento = getByText("Forma de pagamento");
        expect(pagamento).toBeInTheDocument;

        userEvent.click(getByText('Dinheiro'))

        //Confirma se o botão adicionar do produto aparece na tela
        const botaoConfirmar = getByText(/confirmar/i);
        expect(botaoConfirmar).toBeInTheDocument;
        userEvent.click(botaoConfirmar);

        // Confirma se o pedido foi enviado
        await wait(() => {
          expect(axios.post).toHaveBeenCalled()
        }, 4000);
    });
});