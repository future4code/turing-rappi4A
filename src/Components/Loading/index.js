import React from 'react'
import { ContainerLoading } from './styles'
import Logo from '../../Images/logo.svg'

function Loading() {
  return (
    <ContainerLoading>
      <img src={Logo} alt="Logo Rappi4"/>
    </ContainerLoading>
  )
}

export default Loading;