import styled from "styled-components";

export const Main = styled.main`
    position: sticky;
    left: 0;
    display: grid;
    grid-template-columns: ${props => props.collapsed ? '5%' : '13%'} auto;
`