import styled from "styled-components";
import { MenuItem, SubMenu } from 'react-pro-sidebar';

export const Main = styled.main`
    position: sticky;
    left: 0;
    display: grid;
    grid-template-columns: ${props => props.collapsed ? '4.2%' : '13%'} auto;
    transition-duration: 300ms ;
    color: white;
`

export const MainContent = styled.div`
    margin: 40px;
`;

export const StyledMenuItem = styled(MenuItem)`
    background-color: #272953;
    transition-duration: 300ms ;

    :hover {
        background-color: #16113a;
    }
`;

export const StyledSubMenu = styled(SubMenu)`
    transition-duration: 300ms ;

    :hover {
        background-color: #16113a;
    }
`;
