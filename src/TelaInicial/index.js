import React from 'react';
import { ContainerTelaInicial } from './styles';
import Logo from '../Images/logo.svg'

function TelaInicial() {
  return (
    <ContainerTelaInicial>
      <img src={Logo} alt="Logo Rappi4"/>
    </ContainerTelaInicial>
  )
}

export default TelaInicial;