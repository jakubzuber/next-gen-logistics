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
    width: 5%;
    height: 5%;
    z-index: 2;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
`;

export const StyledSelect = styled.select`
    padding: 5px;
    background-color: white;
    border: none;
    font-size: 16px;
`;