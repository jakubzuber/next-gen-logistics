import styled from "styled-components";

export const Order = styled.tr`
    border-bottom: 1px solid #eee;
    list-style-type: none;
    padding: 5px;
    font-size: 17px;
    align-items: center;
    word-break: normal;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const OrderDetails = styled.th`
    max-width: 40px;
    max-width: 1200px;
`;