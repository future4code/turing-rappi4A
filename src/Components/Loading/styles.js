import styled from 'styled-components'

export const ContainerLoading = styled.div`
    align-items: center;
    background-color: #e86e5a;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;

    img {
        animation: fadein 1s ease-in-out alternate infinite;

        @keyframes fadein {
        from { opacity: 1; }
        to { opacity: 0.3; }
        }
    }
`