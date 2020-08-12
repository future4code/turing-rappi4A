import React, { useReducer } from 'react';
import Router from './Router/Router';
import { GlobalStyle } from './GlobalStyles/GlobalStyle';

import FiltrosContext from './Contexts/FiltrosContext'
import CarrinhoContext from './Contexts/CarrinhoContext'
import { listasReducer, initialState } from './Reducers/listas'

function App() {
  const [state, dispatch] = useReducer(listasReducer, initialState);
  return (
    <div className="app-container">
      <CarrinhoContext.Provider value={{carrinho:state.carrinho, dispatch: dispatch }}>
        <FiltrosContext.Provider value={{filtroCategoria:state.filtroCategoria, filtroBusca:state.filtroBusca, dispatch: dispatch }}>
          <GlobalStyle />
          <Router />
        </FiltrosContext.Provider>
      </CarrinhoContext.Provider>
    </div>
  );
}

export default App;
