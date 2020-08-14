import React, { useState, useEffect } from 'react';

import { ContainerPerfil, Header, DadosPessoais, InfoEndereco, Historico, Resteurante, Data, Total } from './styles';

import Editar from '../Components/Editar'
import EditarEndereco from '../Components/EditarEndereco'
import Loading from '../Components/Loading'
import axios from 'axios'
import Menu from "../Components/Menu/index"

import useProtectedRoute from '../Hooks/useProtectedRoute';

import iconeVoltar from '../Images/back.svg';


function TelaDePerfil() {
  const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A"
  
  const token = useProtectedRoute();
  
  const axiosConfig = {
    headers: {       
      auth: token     
    } 
  }
  
  const [trocarTela, setTrocarTela] = useState("perfil")
  const [dados, setDados] = useState("")
  const [endereco, setEndereco] = useState("")
  const [historico, setHistorico] = useState([])

  useEffect(() => {
    pegarPerfil()
    pegarEndereco()
    pegarHistorico()
  },[])

  const pegarPerfil = () => {
    axios
    .get(`${baseUrl}/profile`, axiosConfig)
    .then(response => {
      setDados(response.data.user)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const pegarEndereco = () => {
    axios
    .get(`${baseUrl}/profile/address`, axiosConfig)
    .then(response => {
      setEndereco(response.data.address)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const pegarHistorico = () => {
    axios
    .get(`${baseUrl}/orders/history`, axiosConfig)
    .then(response => {
      setHistorico(response.data.orders)
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  const onClickMudar = (tela) => {
    setTrocarTela(tela)
  }
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]
  const formataData = i => {
    const data = new Date(i),
    day  = (data.getDate()).toString().padStart(2, '0'),
    month  = meses[(data.getMonth())],
    year  = data.getFullYear()
    return (day+" "+month+" "+year)
  }

  return (
    <ContainerPerfil>
      { dados === "" && endereco === "" ?
        <Loading />
      :
        <>{ trocarTela === "perfil" && 
        <><Header>
          <h2>Meu perfil</h2>
        </Header>
        <DadosPessoais>
          <div>
            <p>{dados.name}</p>
            <p>{dados.email}</p>
            <p>{dados.cpf}</p>
          </div>
          <span onClick={() => onClickMudar("editar")}>editar</span>
        </DadosPessoais>
        <InfoEndereco>
            <div>
              <p>Endereço cadastrado</p>
              { endereco && <p>{endereco.street}, {endereco.number} - {endereco.city}</p>}
            </div>
            <span onClick={() => onClickMudar("endereco")}>editar</span>
        </InfoEndereco>
        <Historico>
          <h3>Histórico de pedidos</h3>
          { historico.length === 0 ?
            <p>Você não realizou nenhum pedido</p>
          :
            <ul>
              {historico.map(pedido => {
                return (
                  <li key={pedido.createdAt}>
                    <Resteurante>{pedido.restaurantName}</Resteurante>
                    <Data>{formataData(pedido.createdAt)}</Data>
                    <Total>SUBTOTAL R${pedido.totalPrice.toFixed(2).replace('.', ',')}</Total>
                  </li>
                )
              })}
            </ul>
          }
        </Historico></>}
        {trocarTela === "editar" &&
          <Editar
            onClickMudar={onClickMudar}
            dados={dados}
            baseUrl={baseUrl}
            token={token}
            axiosConfig={axiosConfig}
            iconeVoltar={iconeVoltar}
          />
        }
        {trocarTela === "endereco" &&
          <EditarEndereco
            onClickMudar={onClickMudar}
            endereco={endereco}
            baseUrl={baseUrl}
            token={token}
            axiosConfig={axiosConfig}
            iconeVoltar={iconeVoltar}
          /> }</>
      }
      <Menu/>
    </ContainerPerfil>
  )
}

export default TelaDePerfil;