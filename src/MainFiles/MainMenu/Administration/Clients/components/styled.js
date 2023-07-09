import styled from "styled-components";

export const StyledNewDataContainer = styled.div`
    background-color: #1266d4;
    padding: 30px;
    max-width: 800px;
    border: 3px solid white;
    border-radius: 10px;
    text-align: center;
    color: white;
`;

export const Input = styled.input`
    padding: 10px;
    margin: 5px;
`;

export const StyledForm = styled.form`
    position: absolute;
    width: 10%;
    z-index: 2;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    display: grid;
    grid-template-columns: 1fr;
    padding: 10px;
    background-color: white;
    border-radius: 2px;
`;

export const TwoGridContainer = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
`;


