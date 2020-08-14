import styled from 'styled-components'

export const ContainerPerfil = styled.div`
   
`

export const Header = styled.div`
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        padding: 16px 0;
        position: relative;

    h2 {
        font-family: Roboto;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        height: 19px;
        line-height: normal;
        letter-spacing: -0.39px;
        margin: 0;
        text-align: center;
        width: 100vw;
    }
`

export const DadosPessoais = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
    padding: 16px;

   p {
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    margin: 0 0 8px 0 ;;
   }

   span {
       justify-self: flex-end;
   }
`

export const InfoEndereco = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: #eeeeee;
    height: 76px;
    padding: 16px;

    span {
       justify-self: flex-end;
   }

   div p:first-child {
       color: #b8b8b8;
       margin: 0;
   }
`


export const Historico = styled.div`
    padding: 16px;

    h3 {
        border-bottom: 1px solid #000;
        font-family: Roboto;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        padding-bottom: 8px;
        margin: 0;
        margin-bottom: 16px;
    }

    > p {
        text-align: center;
    }

    ul {
        padding: 0;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    li {
        list-style: none;
        padding: 16px;
        width: 90vw;
        border-radius: 8px;
        border: solid 1px #b8b8b8;
        margin-bottom: 8px;

        p {
            margin: 8px 0;
        }
    }
`

export const Resteurante = styled.div`
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: #e86e5a;
    margin-bottom: 10px;
`

export const Total = styled.div`
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
`