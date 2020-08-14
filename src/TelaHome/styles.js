import styled from 'styled-components';

export const Container = styled.div `
    margin: auto;
    padding-bottom: 48px;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Header = styled.div `
    width: 100%;
    height: 44px;
    padding: 12px;
    box-shadow: 0 0.5px 0 rgba(0, 0, 0, 0.25);
    position: relative;
`

export const HeaderTitulo = styled.p `
    font-size: 16px;
    line-height: 16px;
    text-align: center;
`

export const HeaderIcone = styled.img `
    position: absolute;
    left: 12px;
    top: 12px;
`

export const ContainerBusca = styled.div `
    width: 100%;
    margin: 0;
    padding: 8px 16px;
`

export const InputBusca = styled.input `
    display: block;
    width: 100%;
    margin: 0 auto;
    height: 56px;
    padding: 4px;
    padding-left: 32px;
    border-radius: 2px;
    border: solid 1px #b8b8b8;
    font-size: 16px;
    letter-spacing: -0.39px;
    color: #d0d0d0;
    box-sizing: border-box;
    background: url(${props => props.img}) no-repeat scroll 4px 16px;
`

export const ContainerFiltro = styled.div `
    width: 100%;
    height: 42px;
    margin: 8px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow-x: scroll;
`

export const FiltroCategoria = styled.h3 `
    min-width: 88px;
    margin: 0 8px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    color: ${props => {
        if(props.color === props.filtro) {
            return '#e86e5a'
        } else {
            return '#000000'
        }
    }};

    :active {
        color: #e86e5a;
    }
`

export const ListaRestaurantes = styled.div `
    width: 100%;
    padding: 0 16px;
`

export const CardRestaurante = styled.div `
    width: 100%;
    margin: 8px auto;
    border-radius: 8px;
    border: solid 1px #b8b8b8;
    cursor: pointer;
`

export const CardImagem = styled.img `
    width: 100%;
    height: 120px;
    margin: 0 auto;
    padding: 0;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
`

export const CardTexto = styled.div `
    width: 100%;
    margin: 0;
    padding: 12px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
`

export const CardNome = styled.h2 `
    width: 100%;
    margin: 0;
    margin-bottom: 4px;
    padding: 0;
    font-size: 16px;
    color: #e86e5a;
`

export const CardInfo = styled.p `
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #b8b8b8;
`

export const ResultadoTexto = styled.p `
    width: 100%;
    margin: 12px 0;
    padding: 0;
    font-size: 16px;
    text-align: center;
    color: #000;
`
export const PedidoEmAndamento = styled.div `
    width: 360px;
    height: 118px;
    background-color: #e86e5a;
    position: fixed;
    bottom: 48px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 80px 280px;
`
export const Icon = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const DadosDoPedido = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    > * {
        margin-top: 8px;
    }
`
export const PedidoText = styled.div `
    width: 256px;
    height: 18px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: white;
`
export const Subtotal = styled.div `
    width: 256px;
    height: 18px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: var(--black);
`
export const EnderecoRestaurante = styled.div `
    width: 256px;
    height: 18px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    color: var(--black);
`
