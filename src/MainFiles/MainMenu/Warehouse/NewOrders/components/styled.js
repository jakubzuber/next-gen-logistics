import styled from "styled-components";

export const StyledNewDataContainer = styled.div`
    background-color: #161b70;
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
