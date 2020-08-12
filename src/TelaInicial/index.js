import React from 'react'
import { ContainerTelaInicial } from './styles'
import { useHistory } from 'react-router-dom'
import Logo from '../Images/logo.svg'

const token = window.localStorage.getItem('token')

function TelaInicial() {

  const history = useHistory()

  if(token === null){
    setTimeout(() => {
      history.push("/login")
    }, 2000)
  } else {
    setTimeout(() => {
      history.push("/home")
    }, 2000)
  }

  return (
    <ContainerTelaInicial>
      <img src={Logo} alt="Logo Rappi4"/>
    </ContainerTelaInicial>
  )
}

export default TelaInicial;