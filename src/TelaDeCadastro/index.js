import React, {useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import { Header, ContainerLogo, CamposDeCadastro, Imagem, Form } from "./styles"
import useInput from "../Hooks/useInput"
import VendoSenha from "../Images/VendoSenha.png"
import NaoVendoSenha from "../Images/NaoVendoSenha.png"
import iconeVoltar from '../Images/back.svg';
import Logo from '../logo-invert.png'
import CriarEndereco from "../Components/CriarEndereco/index"


const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A";

function TelaDeCadastro() {
  const [trocarTela, setTrocarTela] = useState(true)
  const [verSenha, setVerSenha]= useState(false)
  const [verConfirmaSenha, setVerConfirmaSenha]= useState(false)
  const [concluido, setConcluido]= useState(true)
  
  let history = useHistory();
  const {form, onChange, resetaEntrada} = useInput({
    nome: '',
    email:'',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  })
  
  const handleInputChange = event => {
    const { name, value} = event.target;
    
    onChange(name, value);
  };

  const lidaCadastro = () => {
    const body = {
      "name": form.nome,
	    "email": form.email,
	    "cpf": form.cpf,
	    "password": form.senha
    }
    axios
    .post(`${baseUrl}/signup`, body)
    .then(response => {
      window.localStorage.setItem("token", response.data.token)
      console.log(response.data)
      console.log(form.nome, form.email, form.cpf, form.senha, form.confirmarSenha)
      onClickMudar()
    }).catch(e => {
      console.log(e.message)
      alert("Usuário já cadastrado")
    })
    
  }
  
  const onClickMudar = () => {
    setTrocarTela(!trocarTela)
  }
  

  const salvaCadastro = (event)=>{
    event.preventDefault()
    if(form.senha === form.confirmarSenha){
      setConcluido(true)
      lidaCadastro()
    }else{
      setConcluido(false)
      alert(`As senhas e não coincidem!`)
    }
  }

  const botaoVerSenha = ()=>{
    if(verSenha === false){
      return <Imagem src={NaoVendoSenha} onClick={vizualizarSenha}/>
    }else{
      return <Imagem src={VendoSenha} onClick={vizualizarSenha}/>
    }
  }

  const botaoVerConfirmaSenha = ()=>{
    if(verConfirmaSenha === false){
      return <Imagem src={NaoVendoSenha} onClick={vizualizarConfirmaSenha}/>
    }else{
      return <Imagem  src={VendoSenha} onClick={vizualizarConfirmaSenha}/>
    }
  }

  const vizualizarSenha = ()=>{
    setVerSenha(!verSenha)
  }

  const vizualizarConfirmaSenha = ()=>{
    setVerConfirmaSenha(!verConfirmaSenha)
  }

  const tipoSenha = ()=>{
    if(verSenha === false){
     return "password"
    }else{
     return "text"
    }
  }

  const voltarLogin = () => {
    history.push("/login")
  }

  return (
    <div>
     <div>
      { trocarTela === true ?
      <div>
        <Header>
          <img src={iconeVoltar} alt="voltar" onClick={voltarLogin} />
        </Header>
        <ContainerLogo>
          <img src={Logo} alt="Logo Rappi4"/>
          <h2>Cadastrar</h2>
        </ContainerLogo>
        <Form onSubmit={salvaCadastro}>
          <div>
            <label>Nome*</label>
              <CamposDeCadastro
                borda={"1px solid #b8b8b8"} 
                placeholder={"Nome e Sobrenome"}
                type={"text"}
                name={"nome"} 
                value={form.nome} 
                onChange={handleInputChange} 
                required
                />
          </div>
            <div>
              <label>Email*</label>
              <CamposDeCadastro 
                borda={"1px solid #b8b8b8"} 
                placeholder={"email@email.com"}
                type={"email"}
                name={"email"}  
                value={form.email} 
                onChange={handleInputChange} 
                required
                />
            </div>
            <div>
              <label>CPF*</label>
              <CamposDeCadastro 
                borda={"1px solid #b8b8b8"} 
                placeholder={"Ex: 000.000.000-00"}
                name={"cpf"} 
                value={form.cpf} 
                onChange={handleInputChange} 
                required
                pattern="\d{3}\.\d{3}\.\d{3}[-]\d{2}"
                />
            </div>
            <div>
              <label>Senha*</label>
              <CamposDeCadastro 
                borda={concluido === true ? "1px solid #b8b8b8" : "1.5px solid red"}
                placeholder={"Mínimo de 6 caracteres"} 
                type={verSenha === false ? "password" : "text"} 
                name={"senha"} 
                value={form.senha} 
                onChange={handleInputChange} 
                required
                />
              {botaoVerSenha()}
            </div>
            <div>
              <label>Confirmar*</label>
              <CamposDeCadastro 
                borda={concluido === true ? "1px solid #b8b8b8" : "1.5px solid red"}
                placeholder={"Confirme a senha anterior"} 
                type={verConfirmaSenha === false ? "password" : "text"} 
                name={"confirmarSenha"} 
                value={form.confirmarSenha} 
                onChange={handleInputChange} 
                required
                />
                {botaoVerConfirmaSenha()}
            </div>
            <button>Cadastrar</button>
        </Form>
      </div>
    :
      <CriarEndereco onClickMudar={onClickMudar} baseUrl={baseUrl}/>
    }
   </div>
   </div>
  )
}

export default TelaDeCadastro;
