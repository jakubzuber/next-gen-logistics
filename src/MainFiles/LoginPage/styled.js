import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const Form = styled.form`
    width: 20%;
    background-color: #272953;
    margin-top: 25vh;
    border-radius: 5px;
    box-shadow: 1px 1px 10px;
    opacity: 0.8;
    display: grid;
    grid-template-columns: 1fr;
`;

export const Title = styled.h2`
    justify-content: center;
    text-align: center;
    margin-top: 5vh;
    color: white;
`;

export const Input = styled.input`
    font-weight: 400;
    padding: 7px;
    height: 45;
    width: 80%;
    margin: 0 auto;
    border: none;
    border-radius: 6px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const Button = styled.p`
    width: 100%;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    padding: 6px;
    color: white;

    &:hover{
        color: #9e9fac;
        cursor: pointer;
    }
`;