import { useState } from "react";
import Popup from "reactjs-popup";
import { postNewCarriers } from "./CallsToDatabase";
import { Minus, Plus, StyledNewDataContainer, GridContainer } from "./styled";
import { NewOrderButton, ButtonContainer, FromSubmitButton } from "../../../styled";


const NewWhCarriers = ({ modal, closeModal }) => {
    const [number, setNumber] = useState(1);

    const onClose = () => {
        closeModal()
        setNumber(1)
    };

    const addPlace = () => {
        if (number === 20) {
            return
        } else {
            setNumber(number + 1)
        }
    };

    const minusPlace = () => {
        if (number === 1) {
            return
        } else {
            setNumber(number - 1)
        }
    };

    const onAccept = () => {
        postNewCarriers(number)
    };

    return (
        <Popup open={modal} onClose={onClose}>
            <StyledNewDataContainer>
                <div style={{ minHeight: '650px' }}>
                    <p>Ile nośników chcesz stworzyć?</p>
                    <form onSubmit={onAccept}>
                        <GridContainer>
                            <div>Obecnie: {number} </div>
                            <Plus onClick={() => addPlace()}>+</Plus>
                            <Minus onClick={() => minusPlace()}>-</Minus>
                        </GridContainer>

                        <ButtonContainer>
                            <FromSubmitButton type="submit" value='Dodaj'></FromSubmitButton>
                            <NewOrderButton onClick={() => onClose()}>Anuluj</NewOrderButton>
                        </ButtonContainer>
                    </form>
                </div>
            </StyledNewDataContainer>
        </Popup>
    );
};

export default NewWhCarriers;