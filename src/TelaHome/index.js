import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FiltrosContext from '../Contexts/FiltrosContext'

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

  const [ listaRestaurantes, setListaRestaurantes ] = useState([]);
  const filtrosContext = useContext(FiltrosContext);

  const [ busca, setBusca ] = useState(false)
  const [ filtroBusca, setFiltroBusca ] = useState(filtrosContext.filtroBusca)
  const [ filtroCategoria, setFiltroCategoria ] = useState(filtrosContext.filtroCategoria)


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

  const acionaBusca = e => {
    listaRestaurantesFiltrada = [];

    setFiltroBusca(e.target.value);
    setBusca(true);

    filtrosContext.dispatch({ type: "SET_BUSCA", filtroBusca: filtroBusca });
  }

  const saiBusca = () => {
    setBusca(false);
  }

  const acionaCategoria = categoria => {
    if (filtroCategoria === categoria) {
      filtrosContext.dispatch({ type: "RESET_FILTERS" });
      setFiltroCategoria(null);

    } else {
      setFiltroCategoria(categoria);

      filtrosContext.dispatch({ type: "SET_FILTRO", filtroCategoria: categoria });
    }
  }

  let listaRestaurantesFiltrada = listaRestaurantes;

  if( filtrosContext.filtroCategoria !== null ) {
    listaRestaurantesFiltrada = listaRestaurantesFiltrada.filter( restaurante => {
      return restaurante.category === filtrosContext.filtroCategoria;
    })
  }

  if(busca) {
    if(filtroBusca.length < 2) {
      listaRestaurantesFiltrada = [];
    } else {
      listaRestaurantesFiltrada = listaRestaurantesFiltrada.filter( restaurante => {
        return restaurante.name.toLowerCase().includes(filtroBusca.toLowerCase());
      })
    }
  }

  const clicaRestaurante = id => {
    history.push(`/restaurantes/${id}`)
  }

  return <Container>
    
    {!busca ? <Header><HeaderTitulo>Rappi</HeaderTitulo></Header> : <Header><HeaderIcone src={iconeVoltar} onClick={saiBusca} alt="Ícone de voltar para a tela anterior" /><HeaderTitulo>Busca</HeaderTitulo></Header> }
    
    <ContainerBusca>
      <InputBusca value={filtroBusca} onChange={acionaBusca} placeholder="Restaurante" img={iconeBusca} />
    </ContainerBusca>

    <ListaRestaurantes>
      {busca && filtroBusca.length < 3 && <ResultadoTexto>Busque por nome de restaurantes</ResultadoTexto>}

      {busca && filtroBusca.length > 3 &&listaRestaurantesFiltrada.length === 0 && <ResultadoTexto>Nada encontrado :(</ResultadoTexto>}

      {!busca && <ContainerFiltro>
          {categorias.map( categoria => {
            return <FiltroCategoria key={categoria} onClick={() => acionaCategoria(categoria)} color={categoria} filtro={filtroCategoria}>{categoria}</FiltroCategoria>
      })}</ContainerFiltro>}
      
      {listaRestaurantesFiltrada.map( restaurante => {
            return <CardRestaurante key={restaurante.id}onClick={()=> clicaRestaurante(restaurante.id)}>
              <CardImagem src={restaurante.logoUrl} alt="Foto do restaurante"/>
              <CardTexto>
                <CardNome>{restaurante.name}</CardNome>
                <CardInfo>{restaurante.deliveryTime}min</CardInfo>
                <CardInfo>{restaurante.shipping ? `R$${restaurante.shipping},00` : 'Frete grátis'}</CardInfo>
              </CardTexto>
            </CardRestaurante>
        })
      }
    </ListaRestaurantes>

  </Container>
}

export default TelaHome;