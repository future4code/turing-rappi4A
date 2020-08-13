import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {Login, FormLogin, FormInputEmail, FormInputPassword, RectangleInputEmail, RectangleInputPassword, 
        Title,Text, ButtonEnter, LabelInput, RectangleLabelEmail, RectangleLabelPassword, TitleEnter, 
        LogoIcon, ViewPasswordIcon} from './styles'
import Logo from '../logo-invert.png'
import Senha from '../senha.png'
import useInput from '../Hooks/useInput'

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A"

function TelaLogin() {
  const [password, setPassword] = useState(true);
  const history = useHistory();
  const {form, onChange, resetaEntrada} = useInput({email: "", password: ""});

  const handleInputChange = event => {
    const {name, value} = event.target;

    onChange(name, value);
  };

  const telaDeCadastro = () => {
    history.push("/cadastro");
  };

  const changePassword = () => {
    setPassword(!password)
  };

  const login = (event) => {
    event.preventDefault()
    const body = {
      email: form.email,
      password: form.password
    }
    axios.post(`${baseUrl}/login`, body)
    .then(response => {
      window.localStorage.setItem("token", response.data.token);
      resetaEntrada()
      if(response.data.user.hasAddress === true){
        history.push("/home");
      } else {
        history.push("/cadastro");
      }
    })
    .catch((err) => {
      console.log(err.message)
      alert("Usuário não encontrado!")
    })
  }

  return (
    <Login>
      <LogoIcon src={Logo} alt="Logo Rappi4"/>
      <TitleEnter>
        <p>Entrar</p>
      </TitleEnter>
      <FormLogin onSubmit={login}>
        <RectangleInputEmail>
          <RectangleLabelEmail>
            <LabelInput>E-mail *</LabelInput>
          </RectangleLabelEmail>
          <FormInputEmail 
            value={form.email}
            name= "email"
            placeholder= "email@email.com"
            type='email'    
            onChange={handleInputChange}
            required
          />
        </RectangleInputEmail>
        <RectangleInputPassword>
          <RectangleLabelPassword>
            <LabelInput>Senha *</LabelInput>
          </RectangleLabelPassword>
          <FormInputPassword
            value={form.password}
            name= "password"
            placeholder="Mínimo 6 caracteres" 
            type={password ? "password" : "text"}
            onChange={handleInputChange}
            required  
          />
          <ViewPasswordIcon onClick={changePassword} src={Senha} alt="View Password Icon"/>
        </RectangleInputPassword>
        <ButtonEnter>Entrar</ButtonEnter>
      </FormLogin>
      <Title>
        <Text>Não possui cadastro?<span onClick={telaDeCadastro}> Clique aqui </span></Text>
      </Title>
    </Login>
  )
}

export default TelaLogin;