import React, { useState } from 'react';
import { ContainerEditarEndereco } from './styles';
import { Header } from '../../TelaDePerfil/styles';
import { Form } from '../Editar/styles'
import axios from 'axios'
import useForm from '../../Hooks/useForm'

function EditarEndereco(props) {
    const { form, onChange } = useForm({
        street: props.endereco.street,
        number: props.endereco.number,
        complement: props.endereco.complement,
        neighbourhood: props.endereco.neighbourhood,
        city: props.endereco.city,
        state: props.endereco.state
        })
       
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

        axios
        .put(`${props.baseUrl}/address`, body, props.axiosConfig)
        .then(response => {
          console.log(response.data)
          alert("Endereço salvo com sucesso")
        })
        .catch(err => {
          console.log(err.message)
        })
      }

  return (
      <ContainerEditarEndereco>
          <Header>
          <img src={props.iconeVoltar} alt="voltar" onClick={() => props.onClickMudar("perfil")} />
              <h2>Endereço</h2>
          </Header>
          <Form onSubmit={editarEndereco}>
              <div>
                  <label>Logradouro*</label>
                  <input
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
                   name="complement"
                   onChange={handleInputChange}
                   type="text"
                   value={form.complement}
                  />
              </div>
              <div>
                  <label>Bairro*</label>
                  <input
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
                    name="city"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.city}/>
              </div>
              <div>
                  <label>Estado*</label>
                  <input
                    name="state"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.state}/>
              </div>
              <button>Salvar</button>
          </Form>
      </ContainerEditarEndereco>
  )
}

export default EditarEndereco;