import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TelaInicial from '../TelaInicial'
import TelaLogin from '../TelaLogin'
import TelaDeCadastro from '../TelaDeCadastro'
import TelaHome from '../TelaHome'
import TelaListaDeRestaurantes from '../TelaListaDeRestaurantes'
import TelaDeCarrinho from '../TelaDeCarrinho'
import TelaDePerfil from '../TelaDePerfil'

// import { Container } from './styles'

function Router() {
  return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" >
                <TelaInicial />
            </Route>

            <Route exact path="/login" >
                <TelaLogin />
            </Route>

            <Route exact path="/" >
                <TelaDeCadastro />
            </Route>

            <Route exact path="/" >
                <TelaHome />
            </Route>

            <Route exact path="/create" >
                <TelaListaDeRestaurantes />
            </Route>

            <Route exact path="/list" >
                <TelaDeCarrinho />
            </Route>

            <Route exact path="/details" >
                <TelaDePerfil />
            </Route>


            <Route path="/" >
                <h3>Eita Giovana, o forninho caiu (404)</h3>
            </Route>
        </Switch>
      </BrowserRouter>
  )
}

export default Router