import { useState } from "react";
import Popup from "reactjs-popup";
import { StyledNewDataContainer, Input, Flex } from "./styled";
import { NewOrderButton, ButtonContainer, FromSubmitButton } from "../../../styled";
import { useDispatch } from "react-redux";
import { addClient } from "./CallsToDatabase";
import { fetchClients } from "../clientsSliceList";


const NewClient = ({ modal, closeModal }) => {
    const dispatch = useDispatch()

    const onClose = () => {
        closeModal()
    };

    const onAccept = () => {
        addClient(newClient)
        dispatch(fetchClients())
        onClose()
    };

    const initialClients = {
        symbol: null,
        nazwa: null,
        nip: null,
        kod: null,
        miejscowosc: null,
        adres: null,
        kraj: null,
        email: null,
        telefon: null
    };

    const [newClient, setNewClient] = useState(initialClients);

    return (
        <Popup open={modal} onClose={onClose}>
            <StyledNewDataContainer>
                <div style={{ minHeight: '400px' }}>
                    <p>Dodanie nowego klienta do bazy</p>
                    <form onSubmit={onAccept}>
                        <Flex>
                            <Input 
                            required 
                            onChange={({ target }) => setNewClient({...newClient, symbol: target.value})} 
                            placeholder="Symbol" />
                            <Input
                            required 
                            onChange={({ target }) => setNewClient({...newClient, nazwa: target.value})} 
                            placeholder="Nazwa" />
                            <Input
                            required
                            
                            onChange={({ target }) => setNewClient({...newClient, nip: target.value})} 
                            placeholder="Nip" />
                            <Input
                            required 
                            onChange={({ target }) => setNewClient({...newClient, kod: target.value})} 
                            placeholder="Kod pocztowy" />
                            <Input
                            required 
                            onChange={({ target }) => setNewClient({...newClient, miejscowosc: target.value})} 
                            placeholder="Miejscowosc" />
                            <Input
                            required 
                            onChange={({ target }) => setNewClient({...newClient, adres: target.value})} 
                            placeholder="Adres" />
                            <Input
                            required 
                            onChange={({ target }) => setNewClient({...newClient, kraj: target.value})} 
                            placeholder="Kraj" />
                            <Input 
                            required 
                            type="email"
                            onChange={({ target }) => setNewClient({...newClient, email: target.value})} 
                            placeholder="Email" />
                            <Input 
                            required 
                            onChange={({ target }) => setNewClient({...newClient, telefon: target.value})} 
                            placeholder="Telefon" />
                        </Flex>

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

export default NewClient;