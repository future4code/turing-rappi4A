import styled from "styled-components";

export const Header = styled.div`
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        padding: 16px 0 12px 0;
        position: relative;

    img {
        margin-left: 16px;
    }
`

export const ContainerLogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin-bottom: 28px;
        margin-top: 24px;
    }

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
        margin-bottom: 12px;
        text-align: center;
        width: 100vw;
    }
`

export const CamposDeCadastro = styled.input`
    border: ${props => props.borda};
    width: 92vw;
    height: 56px;
    border-radius: 4px;
    margin-bottom: 16px;
    padding-left: 8px;
`
export const Imagem = styled.img`
    position: absolute;
    right: 16px;
    top: 16px;
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    padding-top: 16px;
    width: 100%;

    div {
        position: relative;
    }

    label {
        position: absolute;
        left: 16px;
        top: -8px;
        background-color: #fff;
        display: block;
        padding: 0 2px;
        width: 78px;
        height: 18px;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.29px;
        color: #b8b8b8;

    }

    input {
        width: 92vw;
        height: 56px;
        border-radius: 4px;
        margin-bottom: 16px;
        padding-left: 8px;
    }

    button {
        width: 92vw;
        height: 42px;
        border-radius: 2px;
        background-color: #e86e5a;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        text-align: center;
        border: none;
    }
`