import styled from "styled-components";

export const StyledNewDataContainer = styled.div`
    background-color: #272953;
    padding: 30px;
    max-width: 1400px;
    border: 3px solid white;
    border-radius: 10px;
    text-align: center;
    color: white;
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 70% 10% 10%;
    margin: 20px;
    color: white;
    align-items: center;
`;

export const Plus = styled.div`
    color: green;
    font-size: 30px;
    font-weight: 600;

    :hover {
        color: #36d630;
        cursor: pointer;
    }
`;

export const Minus = styled.div`
    color: red;
    font-size: 30px;
    font-weight: 600;

    :hover {
        color: #c76a6a;
        cursor: pointer;
    }
`;

export const Input = styled.input`
    padding: 10px;
    margin: 5px;
`;

export const StyledForm = styled.form`
    position: absolute;
    width: 10%;
    height: 6%;
    padding: 2px;
    z-index: 2;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    background-color: #7c81dd;
    display: grid;
`;

export const RightClickButton = styled.button`
    font-weight: 300;
    height: 25px;
`;