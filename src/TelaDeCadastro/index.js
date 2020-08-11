import React, {useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import {CamposDeCadastro} from "./styles"
import useInput from "../Hooks/useInput"
import VendoSenha from "../Images/VendoSenha.png"
import NaoVendoSenha from "../Images/NaoVendoSenha.png"
// import { Form } from "../Components/Editar/styles";

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A";



function TelaDeCadastro() {
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

  const lidaCadastro = event => {
    const body = {
      "name": form.nome,
	    "email": form.email,
	    "cpf": form.cpf,
	    "password": form.senha
    }
    axios
    .post(`${baseUrl}/signup`, body)
    .then(response => {
      console.log(response.data)
      console.log(form.nome, form.email, form.cpf, form.senha, form.confirmarSenha)
      history.push("/login")
      alert(`${form.nome}, seja bem vindo(a)`)
    }).catch(e => {
      console.log(e.message)
    })
    
}

  const salvaCadastro = (event)=>{
    event.preventDefault()
    if(form.senha === form.confirmarSenha){
      lidaCadastro()
    }else{
      setConcluido(!concluido)
      alert(`As senhas e não coincidem!`)
    }
  }

  const botaoVerSenha = ()=>{
    if(verSenha === false){
      return <img src={NaoVendoSenha} onClick={vizualizarSenha}/>
    }else{
      return <img src={VendoSenha} onClick={vizualizarSenha}/>
    }
  }

  const botaoVerConfirmaSenha = ()=>{
    if(verConfirmaSenha === false){
      return <img src={NaoVendoSenha} onClick={vizualizarConfirmaSenha}/>
    }else{
      return <img  src={VendoSenha} onClick={vizualizarConfirmaSenha}/>
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

  return (
    <div>
     <div>
       <h2>Efetue o Cadastro</h2>
       <form onSubmit={salvaCadastro}>
         <div>
           <label>Nome*</label>
            <CamposDeCadastro
              borda={"1px solid black"} 
              placeholder={"Nome*"}
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
              borda={"1px solid black"} 
              placeholder={"Email*"}
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
              borda={"1px solid black"} 
              placeholder={"Ex: 123.456.789-10"}
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
              borda={concluido === true ? "1px solid black" : "1.5px solid red"}
              placeholder={"Senha"} 
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
              borda={concluido === true ? "1px solid black" : "1.5px solid red"}
              placeholder={"Confirmar"} 
              type={verConfirmaSenha === false ? "password" : "text"} 
              name={"confirmarSenha"} 
              value={form.confirmarSenha} 
              onChange={handleInputChange} 
              required
              />
              {botaoVerConfirmaSenha()}
          </div>
          <button>Cadastrar</button>
       </form>
    </div>
   </div>
  )
}

export default TelaDeCadastro;
