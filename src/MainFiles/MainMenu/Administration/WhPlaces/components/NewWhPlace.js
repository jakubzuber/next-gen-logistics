import { useState } from "react";
import Popup from "reactjs-popup";
import { sendNewPlacesToDatabase } from "./CallsToDatabase";
import { Minus, Plus, StyledNewDataContainer, GridContainer, Input } from "./styled";
import { NewOrderButton, ButtonContainer, FromSubmitButton } from "../../../styled";

const NewWhPlace = ({ modal, closeModal }) => {
    const [places, setPlaces] = useState(1);

    const [symbol0, setSymbol0] = useState();
    const [symbol1, setSymbol1] = useState();
    const [symbol2, setSymbol2] = useState();
    const [symbol3, setSymbol3] = useState();
    const [symbol4, setSymbol4] = useState();
    const [symbol5, setSymbol5] = useState();
    const [symbol6, setSymbol6] = useState();
    const [symbol7, setSymbol7] = useState();
    const [symbol8, setSymbol8] = useState();
    const [symbol9, setSymbol9] = useState();

    const [discription0, setDiscription0] = useState();
    const [discription1, setDiscription1] = useState();
    const [discription2, setDiscription2] = useState();
    const [discription3, setDiscription3] = useState();
    const [discription4, setDiscription4] = useState();
    const [discription5, setDiscription5] = useState();
    const [discription6, setDiscription6] = useState();
    const [discription7, setDiscription7] = useState();
    const [discription8, setDiscription8] = useState();
    const [discription9, setDiscription9] = useState();


    const assignSymbolFunction = ({ value, index }) => {
        switch (index) {
            case 0: setSymbol0(value);
                break;
            case 1: setSymbol1(value);
                break;
            case 2: setSymbol2(value);
                break;
            case 3: setSymbol3(value);
                break;
            case 4: setSymbol4(value);
                break;
            case 5: setSymbol5(value);
                break;
            case 6: setSymbol6(value);
                break;
            case 7: setSymbol7(value);
                break;
            case 8: setSymbol8(value);
                break;
            case 9: setSymbol9(value);
                break;
            default: setSymbol0('')
        };
    };

    const assignDiscryptionFunction = ({ value, index }) => {
        switch (index) {
            case 0: setDiscription0(value);
                break;
            case 1: setDiscription1(value);
                break;
            case 2: setDiscription2(value);
                break;
            case 3: setDiscription3(value);
                break;
            case 4: setDiscription4(value);
                break;
            case 5: setDiscription5(value);
                break;
            case 6: setDiscription6(value);
                break;
            case 7: setDiscription7(value);
                break;
            case 8: setDiscription8(value);
                break;
            case 9: setDiscription9(value);
                break;
            default: setDiscription0('')
        };
    };

    const onClose = () => {
        closeModal()
        setPlaces(1)
    };

    const addPlace = () => {
        if (places === 10) {
            return
        } else {
            setPlaces(places + 1)
        }
    };

    const minusPlace = () => {
        if (places === 1) {
            return
        } else {
            setPlaces(places - 1)
        }
    };

    const onAccept = () => {
        const allData = [
            { symbol: symbol0, discription: discription0 },
            { symbol: symbol1, discription: discription1 },
            { symbol: symbol2, discription: discription2 },
            { symbol: symbol3, discription: discription3 },
            { symbol: symbol4, discription: discription4 },
            { symbol: symbol5, discription: discription5 },
            { symbol: symbol6, discription: discription6 },
            { symbol: symbol7, discription: discription7 },
            { symbol: symbol8, discription: discription8 },
            { symbol: symbol9, discription: discription9 },
        ];
        const dataToUpload = allData.slice(0, places)
        sendNewPlacesToDatabase(dataToUpload)
    };

    return (
        <Popup open={modal} onClose={onClose}>
            <StyledNewDataContainer>
                <div style={{ minHeight: '650px' }}>
                    <p>Ile miejs chcesz stworzyć?</p>
                    <GridContainer>
                        <div>Obecnie: {places} </div>
                        <Plus onClick={() => addPlace()}>+</Plus>
                        <Minus onClick={() => minusPlace()}>-</Minus>
                    </GridContainer>
                    <form onSubmit={onAccept} >
                        {Array.from({ length: places }).map((v, i) =>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                <Input 
                                name="123" 
                                minLength={9} 
                                maxLength={9} 
                                required 
                                onChange={({ target }) => assignSymbolFunction({ value: target.value, index: i })} 
                                placeholder="SYMBOL"
                                >
                                </Input>
                                <Input 
                                name="321" 
                                required 
                                onChange={({ target }) => assignDiscryptionFunction({ value: target.value, index: i })} 
                                placeholder="OPIS"
                                ></Input>
                            </div>
                        )}
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

export default NewWhPlace;