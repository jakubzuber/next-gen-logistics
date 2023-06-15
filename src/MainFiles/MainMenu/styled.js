/* eslint-disable */
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
    background-color: #181c66;
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

export const Topic = styled.div`
    text-align: center;
    font-size: 20px;
    color: #050505;
    font-weight: 500;
    padding: 2px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    margin: 10px 0px;
`;

export const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;


    @media (max-width: 768px) {
        min-width: 1200px;
    }
`;

export const Thead = styled.thead`
    background-color: #f6f9fc;
    color: #8493a5;
    height: 30px;
    color: #000000;
    font-size: 12px;
`;

export const Th = styled.th`
    border-bottom: 2px solid #dddddd;
    text-align: center;
`;

export const Tr = styled.tr`
    transition-duration: 300ms ;

    :hover {
        background-color: #181c66;
        cursor: pointer;
    }
`;

export const Td = styled.td`
    border-bottom: 1px solid #dddddd;
    padding: 5px 0px;
    text-align: center;
    color: white;
    font-size: 12px;
`;

export const StyledButton = styled.div`
    margin: 20px 0;
    padding: 5px;
    color: white;
    transition-duration: 300ms ;

    :hover {
        color: #9e9fac;
        cursor: pointer;
    }
`;

export const FunctionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const StyledInput = styled.input`
    color: white;
    padding: 15px;
    text-align: center;
    margin-bottom: 10px;

    :hover {
        border: 1px solid white;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    color: white;
    visibility: ${props => props.data != '' ? '' : 'hidden'};
    padding: 5px;
    margin-top: 30px;
`;

export const NewOrderButton = styled.div`
    transition-duration: 300ms;
    font-weight: 500;

    :hover {
     color: #9e9fac;
     cursor: pointer;
    }
`;

export const FromSubmitButton = styled.input`
    transition-duration: 300ms;
    background-color: transparent;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 500;

    :hover {
        color: #9e9fac;
        cursor: pointer;
}
`;
