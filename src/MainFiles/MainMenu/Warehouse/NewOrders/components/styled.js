import styled from "styled-components";

export const StyledNewDataContainer = styled.div`
    background-color: #272953;
    padding: 30px;
    max-width: 1400px;
    border: 3px solid white;
    border-radius: 10px;
    text-align: center;
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

export const StyledSelect = styled.select`
    padding: 5px;
    background-color: white;
    border: none;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 1px;
    background-color: transparent;

    :hover {
        background-color: #272953;
        color: white;
    }
`;

export const RightClickButton = styled.button`
    font-weight: 300;
    margin-top: 2px;
    padding: 5px;
    height: 30px;
    border: none;
    background-color: transparent;

    :hover {
        background-color: #272953;
        color: white;
    }
`;