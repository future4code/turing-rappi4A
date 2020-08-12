import React from 'react';
import { ContainerEditar, Form } from './styles';
import { Header } from '../../TelaDePerfil/styles';
import axios from 'axios'
import useForm from '../../Hooks/useForm'

function Editar(props) {
    const { form, onChange } = useForm({
        name: props.dados.name,
        email: props.dados.email,
        cpf: props.dados.cpf
      })

      const handleInputChange = event => {
        const { name, value } = event.target
        
        onChange(name, value)
       }

    const editarPerfil = (event) => {
        event.preventDefault()
        const body = {
            name: form.name,
            email: form.email,
            cpf: form.cpf
        }

        axios
        .put(`${props.baseUrl}/profile`, body, props.axiosConfig)
        .then(response => {
          alert("Informações salvas com sucesso!")
        })
        .catch(err => {
          console.log(err.message)
        })
      }

  return (
      <ContainerEditar>
          <Header>
              <img src={props.iconeVoltar} alt="voltar" onClick={() => props.onClickMudar("perfil")} />
              <h2>Editar</h2>
          </Header>
          <Form onSubmit={editarPerfil}>
              <div>
                  <label>Nome*</label>
                  <input
                    name="name"
                    onChange={handleInputChange}
                    required
                    type="text"
                    value={form.name}
                  />
              </div>
              <div>
                  <label>Email*</label>
                  <input
                    name="email"
                    onChange={handleInputChange}
                    required
                    type="email"
                    value={form.email}
                 />
              </div>
              <div>
                  <label>CPF*</label>
                  <input
                    name="cpf"
                    onChange={handleInputChange}
                    required
                    type="text" 
                    value={form.cpf}
                  />
              </div>
              <button>Salvar</button>
          </Form>
      </ContainerEditar>
  )
}

export default Editar;