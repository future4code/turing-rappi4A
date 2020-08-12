import React, {useState, useEffect} from 'react';
import {Cart, Bar, TitleBar, Rectangle, TextAdress, Adress, TitleCart, ButtonConfirmCart, Subtotal,
        SubtotalValor, ValorCart, ValorFrete, PayMethod, OptionsPayMethod, CustomRadio, LabelRadio} from './styles'
import axios from 'axios'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRuZXZXMVlKRFY3bkI2ZVhSRlI3IiwibmFtZSI6IkxlbyBHb21lcyIsImVtYWlsIjoibGVvQGdtYWlsLmNvbSIsImNwZiI6IjEyMy40NTYuNzg5LTk5IiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IlIuIEFmb25zbyBCcmF6LCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTU5NzE4NjA5M30.PROkbBb1zWxEMVEz5vRiQypj10FfkiBRT2bkr4WYgYs";

const axiosConfig = {
  headers: {
    auth: token,
  }
}

function TelaDeCarrinho() {
  const [price, setPrice] = useState([2, 8, 6, 2, 1, 3, 3]);
  const [total, setTotal] = useState(0);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [adress, setAdress] = useState({});

  const getFullAdress = () => {
    axios.get("https://us-central1-missao-newton.cloudfunctions.net/rappi4A/profile/address", axiosConfig)
    .then(response => {
      setAdress(response.data.address)
      console.log(adress)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const pegaMetodoPagamento = (event) => {
    setMetodoPagamento(event.target.value)
  }
  
  useEffect(() =>{
    setTotal(price.reduce((total, currentElement) => total + currentElement));
    getFullAdress()
  }, [price])
  
  return (
    <Cart>
      <Bar>
        <TitleBar>Meu carrinho</TitleBar>
      </Bar>
      <Rectangle>
        <TextAdress>Endereço de entrega</TextAdress>
        <Adress>{adress.street}, {adress.number}</Adress>
      </Rectangle>
      {price ? <TitleCart>Tem coisa aqui</TitleCart> : <TitleCart>Carrinho vazio</TitleCart>}
      <ValorFrete>Frete R$ 0,00</ValorFrete>
      <ValorCart>
        <Subtotal>SUBTOTAL</Subtotal> 
        <SubtotalValor> R$ {total.toFixed(2)}</SubtotalValor>
      </ValorCart>
      <PayMethod>Forma de pagamento</PayMethod>
      <OptionsPayMethod>
        <LabelRadio>
          <CustomRadio 
            type="radio" 
            name="a"
            value="Dinheiro" 
            onChange={pegaMetodoPagamento}
            required 
          /> Dinheiro
        </LabelRadio>
        <LabelRadio>
          <CustomRadio
            type="radio" 
            name="a"
            value="Cartão de crédito" 
            onChange={pegaMetodoPagamento}
            required 
          /> Cartão de crédito
        </LabelRadio>
        <ButtonConfirmCart>Confirmar</ButtonConfirmCart>
      </OptionsPayMethod>
    </Cart>  
  );
}

export default TelaDeCarrinho;