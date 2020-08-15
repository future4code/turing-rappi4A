import { listasReducer, initialState } from './listas';
import expect from 'expect';

const produto = {
    "id": "3vcYYSOEf8dKeTPd7vHe",
    "price": 3,
    "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031408_66194519.jpg",
    "description": "Pastel autêntico, feito na hora!",
    "category": "Pastel",
    "name": "Pastel",
    "restauranteId": "1"
};
const quantity = "2";
const restauranteId = "1";

const carrinho = [];
const filtroCategoria = null;
const filtroBusca = '';

describe('testa os reducer', () => {
    test('retorna o estado inicial', () => {
        expect(listasReducer(initialState, {})).toEqual({"carrinho": [], "filtroBusca": "", "filtroCategoria": null});
    });
    test('testa ADICIONA_PRODUTO_CARRINHO', () => {
        expect(listasReducer(initialState, {
            type: 'ADICIONA_PRODUTO_CARRINHO',
            produto: produto,
            quantidadeSelecionada: quantity,
            restauranteId: restauranteId

        })).toEqual(
            { "carrinho": [{
                "category": "Pastel",
                "description": "Pastel autêntico, feito na hora!",
                "id": "3vcYYSOEf8dKeTPd7vHe",
                "price": 3,
                "photoUrl": "https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/65c38aa8-b094-413d-9a80-ddc256bfcc78/201907031408_66194519.jpg",
                "name": "Pastel",
                "quantity": "2",
                "restauranteId": "1"}],
                "filtroBusca": "",
                "filtroCategoria" : null,
            }
        )

    });
    test('testa REMOVE_PRODUTO_CARRINHO', () => {
        expect(listasReducer( initialState, {
            type: 'REMOVE_PRODUTO_CARRINHO',
            index: 0
            })).toEqual({"carrinho": [], "filtroBusca": "", "filtroCategoria": null})
    });
    test('testa LIMPA_CARRINHO', () => {
        expect(listasReducer( initialState, {
        type: 'LIMPA_CARRINHO'
        })).toEqual({"carrinho": [], "filtroBusca": "", "filtroCategoria": null})
    });
    test('testa SET_BUSCA', () => {
        expect(listasReducer( initialState, {
            type: 'SET_BUSCA',
            filtroBusca: 'habibs'
            })).toEqual({"carrinho": [], "filtroBusca": "habibs", "filtroCategoria": null})
    });
    test('testa RESET_BUSCA', () => {
        expect(listasReducer( initialState, {
            type: 'RESET_BUSCA',
            })).toEqual({"carrinho": [], "filtroBusca": "", "filtroCategoria": null})
    });
    test('testa SET_FILTROS', () => {
        expect(listasReducer( initialState, {
            type: 'SET_FILTROS',
            filtroCategoria: 'Árabe'
            })).toEqual({"carrinho": [], "filtroBusca": "", "filtroCategoria": null})

    });
    test('testa RESET_FILTERS', () => {
        expect(listasReducer( initialState, {
            type: 'RESET_FILTERS',
            })).toEqual({"carrinho": [], "filtroBusca": "", "filtroCategoria": null})

    });
})