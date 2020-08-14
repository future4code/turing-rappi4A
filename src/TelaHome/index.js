import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useProtectedRoute from '../Hooks/useProtectedRoute';
import FiltrosContext from '../Contexts/FiltrosContext'
import CarrinhoContext from '../Contexts/CarrinhoContext'
import Menu from '../Components/Menu/index'
import Loading from '../Components/Loading';

import { Container, Header, HeaderTitulo, ContainerBusca, InputBusca, PedidoText, EnderecoRestaurante, ContainerFiltro, Subtotal, FiltroCategoria, DadosDoPedido, Icon, ListaRestaurantes, CardRestaurante, CardImagem, CardTexto, CardNome, CardInfo, ResultadoTexto, HeaderIcone, PedidoEmAndamento} from './styles';

import iconeVoltar from '../Images/back.svg';
import iconeBusca from '../Images/search.svg';
import Relogio from '../Images/clock.png'

const TelaHome = () => {
  const history = useHistory();
  const token = useProtectedRoute();
  
  const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/restaurants";
  
  const axiosConfig = {
    headers: {
      auth: token,
    }
  }

  const [ listaRestaurantes, setListaRestaurantes ] = useState([]);
  const filtrosContext = useContext(FiltrosContext);
  const carrinhoContext = useContext(CarrinhoContext);

  const [ ordem, setOrdem ] = useState({})
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

  const getActiveOrder = () => {
    axios.get(`https://us-central1-missao-newton.cloudfunctions.net/rappi4A/active-order`, axiosConfig)
    .then(response => {
      setOrdem(response.data.order)
      console.log(response.data.order)
    }).catch(err => {
      console.log(err.message)
    })
  }

  useEffect(() => {
    getRestaurantes();
    getActiveOrder();
  }, []);

  let categorias = [];
   
  const pegaCategorias = listaRestaurantes.map( restaurante => restaurante.category);

  categorias = pegaCategorias.filter( (categoria, idx) => {
    if(pegaCategorias.indexOf(categoria) === idx) {
      return categoria
    }
  });

  let valorTotal = 0;
  carrinhoContext.carrinho.forEach(produto => {
    valorTotal = valorTotal + produto.price * produto.quantity;
  });

  const acionaBusca = e => {
    listaRestaurantesFiltrada = [];

    setFiltroBusca(e.target.value);
    setBusca(true);

    filtrosContext.dispatch({ type: "SET_BUSCA", filtroBusca: filtroBusca });
  }

  const saiBusca = () => {
    setBusca(false);
    setFiltroBusca('');
    filtrosContext.dispatch({ type: "RESET_BUSCA" });
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
    setFiltroBusca('');
    filtrosContext.dispatch({ type: "RESET_BUSCA" });
    history.push(`/restaurantes/${id}`)
  }

  return <>
    {!listaRestaurantes || !busca && listaRestaurantes.length === 0 ? <Loading /> : <Container>
      {!busca ? <Header><HeaderTitulo>Rappi4</HeaderTitulo></Header> : <Header><HeaderIcone src={iconeVoltar} onClick={saiBusca} alt="Ícone de voltar para a tela anterior" /><HeaderTitulo>Busca</HeaderTitulo></Header> }
      
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
      {ordem !== null ? <PedidoEmAndamento>
        <Icon>
          <img src={Relogio} alt="Relógio Icon"/>
        </Icon>
        <DadosDoPedido>
          <PedidoText>
            Pedido em andamento
          </PedidoText>
          <EnderecoRestaurante>
            {ordem.restaurantName}
          </EnderecoRestaurante>
          <Subtotal>
            SUBTOTAL R${ordem.totalPrice}
          </Subtotal>
        </DadosDoPedido>
      </PedidoEmAndamento> : ""}
      <Menu />
    </Container>}
  </>
}

export default TelaHome;