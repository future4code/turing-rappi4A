import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { Router } from 'react-router-dom';
import { createMemoryHistory  } from 'history';
import TelaDeCadastro from "./index";

// axios.post = jest.fn().mockResolvedValue([{
//     "name": "João Pedro",
//     "email": "jp@gmail.com",
//     "cpf":"344.567.987-99",
//     "password": "123456"
// }]);

// const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4A/signup";


const history = createMemoryHistory();
describe('Verificacao de inputs na tela', () => {
    test('Verificacao do input nome', () => {
        const { getByText ,getByPlaceholderText } = render(
                <Router history={history}>
                    <TelaDeCadastro/>
                </Router>
        )

        const inputNome = getByPlaceholderText("Nome e Sobrenome")
        expect(inputNome).toBeInTheDocument()

    })

    test('Verificacao do input email', () => {
        const {getByText, getByPlaceholderText } = render(
            <Router history={history}>
                <TelaDeCadastro />
            </Router>
        )

        const inputEmail = getByPlaceholderText("email@email.com")
        expect(inputEmail).toBeInTheDocument()
    })  
    
    test("Verificação do input CPF", ()=>{
        const{getByText, getByPlaceholderText} = render(
            <Router history={history}>
                <TelaDeCadastro/>
            </Router>
        )
        
        const inputCpf = getByPlaceholderText("Ex: 000.000.000-00")
        expect(inputCpf).toBeInTheDocument()
    })

    test("Verificação do input Senha", ()=>{
        const {getByText, getByPlaceholderText} = render(
            <Router history={history}>
                <TelaDeCadastro/>
            </Router>
        )

        const inputSenha = getByPlaceholderText("Mínimo de 6 caracteres")
        expect(inputSenha).toBeInTheDocument() 
    })

    test("Verificação do input Confirmar senha", ()=>{
        const {getByText, getByPlaceholderText} = render(
            <Router history={history}>
                <TelaDeCadastro/>
            </Router>
        )

        const inputConfirmaSenha = getByPlaceholderText("Confirme a senha anterior")
        expect(inputConfirmaSenha).toBeInTheDocument()
    })


})

describe("Verficação de inputs controlados", ()=>{
   test("Verificando controle do input Nome", () => {
    const {getByText, getByPlaceholderText} = render(
            <Router history={history}>
                <TelaDeCadastro/>
            </Router>
    ) 
    
    const inputNome = getByPlaceholderText('Nome e Sobrenome')

    fireEvent.change(inputNome, {
      target: {
        value: 'João'
      }
    })

    expect(inputNome).toHaveValue('João')
  })

  test("Verificando controle do input email", () => {
      const { getByPlaceholderText } = render(
          <Router history={history}>
              <TelaDeCadastro />
          </Router>
      )

      const inputEmail = getByPlaceholderText('email@email.com')

      fireEvent.change(inputEmail, {
          target: {
              value: "jhowbrow@brow.com"
          }
      })

      expect(inputEmail).toHaveValue("jhowbrow@brow.com")
  })

  test("Verificando controle do input CPF", () =>  {
      const { getByPlaceholderText } = render(
          <Router history={history}>
              <TelaDeCadastro/>
          </Router>
      )

      const inputCpf = getByPlaceholderText('Ex: 000.000.000-00')

      fireEvent.change(inputCpf, {
          target: {
              value: "000.000.000-00"
          }
      })
      expect(inputCpf).toHaveValue("000.000.000-00")
  })

  test("Verificando controle do input Senha", ()=>{
    const { getByPlaceholderText } = render(
        <Router history={history}>
            <TelaDeCadastro/>
        </Router>
    )
    
    const inputSenha = getByPlaceholderText("Mínimo de 6 caracteres")

    fireEvent.change(inputSenha,{
        target: {
            value: "123456"
        }
    })
    expect(inputSenha).toHaveValue("123456")
  })




  test('Verificando controle de confirmacao de senha', () => {
      const { getByPlaceholderText } = render(
            <Router history={history}>
                <TelaDeCadastro />
            </Router>
      )
      
      const inputConfirmaSenha = getByPlaceholderText('Confirme a senha anterior');

      fireEvent.change(inputConfirmaSenha, {
          target: {
              value: "12345"
          }
      })
      
      expect(inputConfirmaSenha).toHaveValue("12345")
  })
})
