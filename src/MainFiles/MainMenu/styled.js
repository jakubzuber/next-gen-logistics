import styled from "styled-components";

export const Main = styled.main`
    position: sticky;
    left: 0;
    display: grid;
    grid-template-columns: ${props => props.collapsed ? '4.2%' : '13%'} auto;
    transition-duration: 300ms ;
`

export const MainContent = styled.div`
    margin: 40px;
`;