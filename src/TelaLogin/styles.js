import styled, {keyframes} from 'styled-components'  

const fade = keyframes`
from{
    opacity: 0;
    transform: scale(0.9);
  } to {
    opacity: 1;
    transform: scale(1);
  }
`
export const Login = styled.div`
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 360px;
  height: 640px;
  animation-name: ${fade};
  animation-duration: 1s;
`
export const LogoIcon = styled.img`
  width: 104px;
  height: 58px;
  object-fit: contain;
  position: fixed;
  left: 128px;
  top: 88px;
`
export const TitleEnter = styled.div`
  width: 360px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 162px;
`
export const Title = styled.div`
  width: 360px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 414px;
`
export const Text = styled.p`
  width: 296px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  text-align: center;
  color: var(--black);
`
export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const RectangleInputEmail = styled.div`
  width: 328px;
  height: 56px;
  border-radius: 2px;
  border: solid 1px #b8b8b8;
  position: fixed;
  left: 16px;
  top: 212px;
`
export const RectangleInputPassword = styled.div`
  width: 328px;
  height: 56px;
  border-radius: 2px;
  border: solid 1px #b8b8b8;
  position: fixed;
  left: 16px;
  top: 284px;
`
export const ViewPasswordIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  position: fixed;
  left: 304px;
  top: 300px;
`
export const LabelInput = styled.p`
  width: 78px;
  height: 18px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.29px;
  color: #b8b8b8;
  margin: 0 0 0 4px;
`
export const RectangleLabelEmail = styled.div`
  width: 80px;
  height: 20px;
  background-color: var(--white);
  position: fixed;
  left: 28px;
  top: 204px;
  background-color: #FFF;
`
export const RectangleLabelPassword = styled.div`
  width: 80px;
  height: 20px;
  background-color: var(--white);
  position: fixed;
  left: 28px;
  top: 276px;
  background-color: #FFF;
`
export const FormInputEmail = styled.input`
  width: 264px;
  height: 18px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #d0d0d0;
  border: none;
  outline: none;
  position: fixed;
  left: 32px;
  top: 231px;
`
export const FormInputPassword = styled.input`
  width: 264px;
  height: 18px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #d0d0d0;
  border: none;
  outline: none;
  position: fixed;
  left: 32px;
  top: 303px;
`
export const ButtonEnter = styled.button`
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
  border-radius: 2px;
  background-color: #e86e5a;
  border: none;
  position: fixed;
  left: 16px;
  top: 356px;
`