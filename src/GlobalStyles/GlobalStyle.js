import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing:  border-box;
        border: none;
        outline:  none;
        list-style: none;
    }

    body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;    }

`