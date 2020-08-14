import React from "react";
import { render, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Menu from "./index";
import axios from "axios";
import { Router, useParams } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import userEvent from "@testing-library/user-event";

// Simula dados para a API
const mockDataLogin = {
	"email": "amandajonas@gmail.com",
	"password": "123456"
}

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


test('Testa se o menu redireciona a tela para os links corretamente', async() => {

    axios.get = jest.fn().mockResolvedValue({data: mockDataLogin })
    axios.get = jest.fn().mockResolvedValue({data: mockData })

    // Simula a renderização do componente, com base na rota (pq ela pega o id pelo useParams). Link de explicação: https://testing-library.com/docs/example-react-router
    const history = createMemoryHistory()
    const { getByAltText, getByText } = render(
            <Router history={history}>
                <Menu />
            </Router>
    )

    const home = getByAltText("Home");
    const carrinho = getByAltText("Carrinho");
    const usuario = getByAltText("Usuario");
    
    expect(home).toBeInTheDocument();
    expect(carrinho).toBeInTheDocument();
    expect(usuario).toBeInTheDocument();
    
});