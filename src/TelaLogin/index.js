import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {Login, FormLogin, FormInputEmail, FormInputPassword, RectangleInputEmail, RectangleInputPassword, 
        RectangleButton, InputNolocusEmail, InputNolocusPassword, Title,Text, ButtonEnter, ButtonNolocus, 
        LabelInput, RectangleLabelEmail, RectangleLabelPassword, TitleEnter, LogoIcon, ViewPasswordIcon} from './styles'
import Logo from '../logo-invert.png'
import Senha from '../senha.png'

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/login"

const useForm = initialValues => {
  const [form, setForm] = useState(initialValues);
  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };
  const cleanForm = () => {
    setForm(initialValues);
  };
  return {form, onChange, cleanForm};
};

function TelaLogin() {
  const [password, setPassword] = useState(true);
  const history = useHistory();
  const {form, onChange, cleanForm} = useForm({email: "", password: ""});

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
    axios.post(baseUrl, body)
    .then(response => {
      window.localStorage.setItem("token", response.data.token);
      cleanForm()
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
        <InputNolocusEmail>
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
        </InputNolocusEmail>
        <InputNolocusPassword>
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
        </InputNolocusPassword>
        <ButtonNolocus>
          <RectangleButton>
            <ButtonEnter>Entrar</ButtonEnter>
          </RectangleButton>
        </ButtonNolocus>
      </FormLogin>
      <Title>
        <Text>Não possui cadastro?<span onClick={telaDeCadastro}> Clique aqui </span></Text>
      </Title>
    </Login>
  )
}

export default TelaLogin;