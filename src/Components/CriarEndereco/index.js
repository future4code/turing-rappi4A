import React, { useState } from 'react';
import { ContainerCriarEndereco } from './styles';
import { Header } from '../../TelaDePerfil/styles';
import { useHistory } from 'react-router-dom';
import { Form } from '../Editar/styles'
import axios from 'axios'
import useInput from '../../Hooks/useInput';
import useProtectedRoute from '../../Hooks/useProtectedRoute';

function CriarEndereco(props) {
  const token = useProtectedRoute();
      
  const axiosConfig = {
    headers: {       
      auth: token     
    } 
  }

  const { form, onChange, resetaEntrada } = useInput({
    street: "",
    number: "",
    complement: "",
    neighbourhood: "",
    city: "",
    state:""
    })
  
  const history = useHistory()  

  const handleInputChange = event => {
      const { name, value } = event.target
      onChange(name, value)
  }

  const editarEndereco = (event) => {
      event.preventDefault()
      const body = {
          street: form.street,
          number: form.number,
          complement: form.complement,
          neighbourhood: form.neighbourhood,
          city: form.city,
          state: form.state
      }
      console.log(body)
      console.log(axiosConfig)
      axios
      .put(`${props.baseUrl}/address`, body, axiosConfig)
      .then(response => {
        console.log(response.data)
        alert("Endereço salvo com sucesso")
        history.push("/login")
      })
      .catch(err => {
        console.log(err.message)
      })
    }

  return (
      <ContainerCriarEndereco>
          <Header>
              {/* <span onClick={() => props.onClickMudar}>voltar</span> */}
              <h2>Endereço</h2>
          </Header>
          <Form onSubmit={editarEndereco}>
              <div>
                  <label>Logradouro*</label>
                  <input
                    placeholder={"Rua/Av"}
                    name="street"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.street}
                  />
              </div>
              <div>
                  <label>Número*</label>
                  <input
                    placeholder={"Número"}
                    name="number"
                    onChange={handleInputChange}
                    required
                    type="number"
                    value={form.number}
                  />
              </div>
              <div>
                  <label>Complemento</label>
                  <input
                   placeholder={"Apto/Bloco"}
                   name="complement"
                   onChange={handleInputChange}
                   type="text"
                   value={form.complement}
                  />
              </div>
              <div>
                  <label>Bairro*</label>
                  <input
                    placeholder={"Bairro"}
                    name="neighbourhood"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.neighbourhood}
                  />
              </div>
              <div>
                  <label>Cidade*</label>
                  <input
                    placeholder={"Cidade"}
                    name="city"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.city}/>
              </div>
              <div>
                  <label>Estado*</label>
                  <input
                    placeholder={"Estado"}
                    name="state"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.state}/>
              </div>
              <button>Salvar</button>
          </Form>
      </ContainerCriarEndereco>
  )
}

export default CriarEndereco;