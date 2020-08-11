import React from 'react';
import { useHistory } from 'react-router-dom';
import { ContainerMenu } from './styles';
import Home from '../../Images/home.svg'
import Carrinho from '../../Images/cart.svg'
import Usuario from '../../Images/user.svg'

function Menu() {
  const history = useHistory()

  const onClickMenu = (tela) => {
    history.push(tela)
  }

  return (
    <ContainerMenu>
      <div onClick={() => onClickMenu("/home")}>
        <img src={Home} alt="Home" />
      </div>
      <div onClick={() => onClickMenu("/carrinho")}>
        <img src={Carrinho} alt="Carrinho" />
      </div>
      <div onClick={() => onClickMenu("/perfil")}>
        <img src={Usuario} alt="Usuario" />
      </div>
    </ContainerMenu>
  )
}

export default Menu;