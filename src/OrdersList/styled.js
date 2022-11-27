import styled from "styled-components";

export const List = styled.ul`
    background-color: red;
`;

export const Order = styled.li`
    border-bottom: 1px solid #eee;
    list-style-type: none;
    padding: 5px;
    font-size: 17px;
    align-items: center;
    word-break: normal;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const Title = styled.div`
    margin: 10px;
    padding: 10px;
    color: red;
    background-color: teal;
`

export const OrderDetails = styled.div`
    max-width: 40px;
`