import styled from 'styled-components';

export const Container = styled.div `
    margin: auto;
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

export const HeaderIcone = styled.div `
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
    border-radius: 2px;
    border: solid 1px #b8b8b8;
    font-size: 16px;
    letter-spacing: -0.39px;
    color: #d0d0d0;
    box-sizing: border-box;
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
    color: ${props => {
        if(props.active) {
            return '#e86e5a'
        } else {
            return '#000000'
        }
    }};
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
    box-sizing: border-box;
`

export const CardImagem = styled.img `
    width: 100%;
    height: 120px;
    margin: 0 auto;
    padding: 0;
    border-radius: 8px 8px 0 0;
    box-sizing: border-box;
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
    box-sizing: border-box;
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
    margin: 12px;
    padding: 0;
    font-size: 16px;
    text-align: center;
    color: #000;
`
