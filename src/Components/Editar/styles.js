import styled from 'styled-components'

export const ContainerEditar = styled.div`
    position: relative;

    div img {
        position: absolute;
        top: 14px;
        left: 16px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    padding-top: 24px;
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
        border: solid 1px #b8b8b8;
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