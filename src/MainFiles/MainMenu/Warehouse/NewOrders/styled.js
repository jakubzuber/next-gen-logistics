import styled from "styled-components";

export const Topic = styled.div`
    text-align: center;
    font-size: 30px;
    background-color: #0057d9;
    color: white;
    padding: 5px;
    margin-top: 1000px;
    width: 100%;

    
    @media (max-width: 768px) {
        min-width: 1200px;
    }
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
    position: sticky;
    top: 0;
    background-color: #f6f9fc;
    color: #8493a5;
`;

export const Th = styled.th`
    position: sticky;
    top: 0;
    background-color: #f6f9fc;
    color: #8493a5;
    border-bottom: 1px solid #dddddd;
    padding: 10px 20px;
    text-align: center;
    height: 60px;
`;

export const Td = styled.td`
    border-bottom: 1px solid #dddddd;
    padding: 10px 0px;
    text-align: center;
`;