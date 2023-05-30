import styled from "styled-components";

export const Topic = styled.div`
    text-align: center;
    font-size: 20px;
    color: #050505;
    font-weight: 500;
    padding: 2px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
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
`;

export const Th = styled.th`
    border-bottom: 2px solid #dddddd;
    text-align: center;
`;

export const Td = styled.td`
    border-bottom: 1px solid #dddddd;
    padding: 5px 0px;
    text-align: center;
    color: white;
`;

export const StyledButton = styled.div`
    margin: 20px 0;
    padding: 5px;
    color: white;

    :hover {
        color: #1877e4;
        cursor: pointer;
    }
`;

export const FunctionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`;