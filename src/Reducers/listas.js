export const initialState = {
  carrinho: [],
  filtros: {
      filtroBusca: '',
  },
  filtroCategoria: null,
  filtroBusca: '',
};
  
export const listasReducer = (state, action) => {
  switch (action.type) {
    case "ADICIONA_PRODUTO_CARRINHO":
    const produtosNoCarrinho = state.carrinho.findIndex(produto => {
      return produto.id === action.produto.id;
    });

    let novoCarrinho;
    if (produtosNoCarrinho === -1) {
      novoCarrinho = [...state.carrinho, { ...action.produto, quantity: action.quantidadeSelecionada, restauranteId: action.restauranteId}];
    } else {
      novoCarrinho = state.carrinho.map(produto => {
        if (produto.id === action.produto.id) {
          return {
            ...produto,
            quantity: action.quantidadeSelecionada
          };
        }
        return produto;
      });
      }

      return { ...state, carrinho: novoCarrinho };

    case "REMOVE_PRODUTO_CARRINHO":
      const carrinhoSemProduto = state.carrinho.filter(produto => {
          return produto.id !== action.produtoId;
      });
      return { ...state, carrinho: carrinhoSemProduto };

    case "LIMPA_CARRINHO":
      return {
        ...state, 
        carrinho: initialState.carrinho
      };
    
    case "SET_BUSCA":
      return {
        ...state,
        filtroBusca: action.filtroBusca
      };

    case "RESET_BUSCA":
      return {
          ...state,
          filtroBusca: initialState.filtroBusca
      };

    case "SET_FILTRO":
      return {
        ...state,
        filtroCategoria: action.filtroCategoria
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filtroCategoria: initialState.filtroCategoria
      };

    default:
      return state;
  }
};
  