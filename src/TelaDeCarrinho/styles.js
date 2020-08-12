import styled from 'styled-components'  

export const Cart = styled.div`
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  min-height: 640px;
`
export const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 360px;
  height: 64px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.25);
  background-color: var(--white);
`
export const TitleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 175px;
  height: 44px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: center;
  color: var(--black);
`
export const Rectangle = styled.div`
  width: 360px;
  height: 76px;
  background-color: #eeeeee;
`
export const TextAdress = styled.div`
  width: 328px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #b8b8b8;
  margin: 16px 16px 8px 16px;
`
export const Adress = styled.div`
  width: 328px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: var(--black);
  margin: 8px 16px 16px 16px;
`
export const TitleCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 42px;
  margin: 8px 0 33px 0;
  opacity: 0.89;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: center;
  color: var(--black);
`
export const ValorFrete = styled.div`
  align-self: flex-end;
  width: 104px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: right;
  color: var(--black);
  margin-right: 16px;
`
export const ValorCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 14px 0 26px 0;
`
export const Subtotal = styled.span`
  width: 164px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: var(--black);
  margin: 0 0 0 16px;
`
export const SubtotalValor = styled.span`
  width: 164px;
  height: 18px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.43px;
  text-align: right;
  color: #e86e5a;
  margin: 0 16px 0 0;
`
export const PayMethod = styled.span`
  align-self: flex-start;
  width: 328px;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid black; 
`
export const OptionsPayMethod = styled.form`
  width: 328px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 11px 16px ;
  input:nth-child(1){
    margin-bottom: 14px;
  }
`
export const LabelRadio = styled.label`
  display: flex;
  align-items: flex-start;
`
export const CustomRadio = styled.input`
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 8px;
`
export const ButtonConfirmCart = styled.button`
  width: 328px;
  height: 42px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: center;
  color: var(--black);
  background-color: rgba(232, 110, 90, 0.5);
  border-radius: 2px;
  border: none;
  position: fixed;
  left: 16px;
  bottom: 65px;
`
