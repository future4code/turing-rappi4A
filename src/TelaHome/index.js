import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Container, Header, HeaderTitulo, ContainerBusca, InputBusca, ContainerFiltro, FiltroCategoria, ListaRestaurantes, CardRestaurante, CardImagem, CardTexto, CardNome, CardInfo, ResultadoTexto, HeaderIcone } from './styles';

import iconeVoltar from '../Images/back.svg';
import iconeBusca from '../Images/search.svg';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhbzVjaHlVeTRpTnAwOEFSS2RQIiwibmFtZSI6IkFzdHJvZGV2IiwiZW1haWwiOiJhc3Ryb2RldkBmdXR1cmU0LmNvbSIsImNwZiI6IjExMS4xMTEuMTExLTExIiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IlIuIEFmb25zbyBCcmF6LCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTU5NzA4NjMyOX0.5sB9zep0fhCNZurtNCGHCtNuIftrLCX2LAhT8CgLZDE";

const axiosConfig = {
  headers: {
    auth: token,
  }
}

const TelaHome = () => {
  const history = useHistory();

  const [ listaRestaurantes, setListaRestaurantes ] = useState([])
  const [ busca, setBusca ] = useState(false)
  const [ filtroCategoria, setFiltroCategoria ] = useState('')

  const getRestaurantes = async () => {
    try {
      const response = await axios.get(baseUrl, axiosConfig);
      setListaRestaurantes(response.data.restaurants);
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRestaurantes();
  }, []);

  let categorias = [];
   
  const pegaCategorias = listaRestaurantes.map( restaurante => restaurante.category);

  categorias = pegaCategorias.filter( (categoria, idx) => {
    if(pegaCategorias.indexOf(categoria) === idx) {
      return categoria
    }
  });

  const [ inputBusca, setInputBusca ] = useState("");

  const aoMudarInputBusca = e => {
    setInputBusca(e.target.value)
  }

  const acionaBusca = () => {
    setBusca(true);
  }

  const saiBusca = () => {
    setBusca(false);
  }

  const buscaLista = () => {
    if (inputBusca.length < 2) {
      return <ListaRestaurantes><ResultadoTexto>Busque por nome de restaurantes</ResultadoTexto></ListaRestaurantes>
    } 
  
    if (inputBusca.length > 2 && listaRestaurantes) {
      let resultados = listaRestaurantes.map( restaurante => {
          if( restaurante.name.toLowerCase().includes(inputBusca.toLowerCase()) ) {
              return <CardRestaurante key={restaurante.id}onClick={()=> clicaRestaurante(restaurante.id)}>
                <CardImagem src={restaurante.logoUrl} alt="Foto do restaurante"/>
                <CardTexto>
                  <CardNome>{restaurante.name}</CardNome>
                  <CardInfo>{restaurante.deliveryTime}min</CardInfo>
                  <CardInfo>{restaurante.shipping ? `R$${restaurante.shipping},00` : 'Frete grátis'}</CardInfo>
                </CardTexto>
              </CardRestaurante>
        }
      });

      return <ListaRestaurantes>
          {resultados}
          {resultados && <ResultadoTexto>Não encontramos :(</ResultadoTexto>}
      </ListaRestaurantes>
    }
  }

  const acionaFiltro = categoria => {
    if( filtroCategoria === categoria ) {
      setFiltroCategoria('');

    } else {
      setFiltroCategoria(categoria);
    }
  }

  const filtraLista = () => {
    if(filtroCategoria === '') {
      let listaFiltrados = listaRestaurantes.map( restaurante => {
        return <CardRestaurante key={restaurante.id} onClick={()=> clicaRestaurante(restaurante.id)}>
          <CardImagem src={restaurante.logoUrl} alt="Foto do restaurante"/>
          <CardTexto>
            <CardNome>{restaurante.name}</CardNome>
            <CardInfo>{restaurante.deliveryTime}min</CardInfo>
            <CardInfo>{restaurante.shipping ? `R$${restaurante.shipping},00` : 'Frete grátis'}</CardInfo>
          </CardTexto>
        </CardRestaurante>
      });

      return listaFiltrados;
    } else {
      let listaFiltrados = listaRestaurantes.map( restaurante => {
        if( restaurante.category === filtroCategoria ) {
          return <CardRestaurante key={restaurante.id}onClick={()=> clicaRestaurante(restaurante.id)}>
            <CardImagem src={restaurante.logoUrl} alt="Foto do restaurante"/>
            <CardTexto>
              <CardNome>{restaurante.name}</CardNome>
              <CardInfo>{restaurante.deliveryTime}min</CardInfo>
              <CardInfo>{restaurante.shipping ? `R$${restaurante.shipping},00` : 'Frete grátis'}</CardInfo>
            </CardTexto>
          </CardRestaurante>
        }
      });

      return listaFiltrados;
    }

  }

  const clicaRestaurante = id => {
    history.push(`/restaurantes/${id}`)
  }

  return <Container>
    
    {!busca ? <Header><HeaderTitulo>Rappi</HeaderTitulo></Header> : <Header><HeaderIcone onClick={saiBusca}>voltar</HeaderIcone><HeaderTitulo>Busca</HeaderTitulo></Header> }
    
    <ContainerBusca>
      <InputBusca value={inputBusca} onChange={aoMudarInputBusca} onClick={acionaBusca} placeholder="Restaurante" img={iconeBusca} />
    </ContainerBusca>
    
    {!busca ? <ListaRestaurantes>
      <ContainerFiltro>
        {categorias.map( categoria => {
          return <FiltroCategoria key={categoria} onClick={() => acionaFiltro(categoria)} color={categoria} filtro={filtroCategoria}>{categoria}</FiltroCategoria>
      })}</ContainerFiltro>
      {filtraLista()}
    </ListaRestaurantes> : buscaLista() }
  </Container>
}

export default TelaHome;