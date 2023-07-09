import { useState } from "react";
import Popup from "reactjs-popup";
import { StyledNewDataContainer, Input, Flex } from "./styled";
import { NewOrderButton, ButtonContainer, FromSubmitButton } from "../../../styled";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../usersSlice";
import { addUser } from "./CallsToDatabase";


const NewUser = ({ modal, closeModal }) => {
    const dispatch = useDispatch()

    const onClose = () => {
        closeModal()
    };

    const onAccept = () => {
        addUser(newUser)
        dispatch(fetchUsers())
        onClose()
    };

    const initialClients = {
        imie: null,
        nazwisko: null,
        login: null,
        haslo: null,
        do: null
    };

    const [newUser, setNewUser] = useState(initialClients);



    return (
        <Popup open={modal} onClose={onClose}>
            <StyledNewDataContainer>
                <div style={{ minHeight: '400px' }}>
                    <p>Dodanie nowego użytkownika do bazy</p>
                    <form onSubmit={onAccept}>
                        <Flex>
                            <Input
                                required
                                onChange={({ target }) => setNewUser({ ...newUser, imie: target.value })}
                                placeholder="Imie" />
                            <Input
                                required
                                onChange={({ target }) => setNewUser({ ...newUser, nazwisko: target.value })}
                                placeholder="Nazwisko" />
                            <Input
                                required
                                onChange={({ target }) => setNewUser({ ...newUser, login: target.value })}
                                placeholder="Login" />
                            <Input
                                required
                                type="password"
                                onChange={({ target }) => setNewUser({ ...newUser, haslo: target.value })}
                                placeholder="Hasło" />
                            <select style={{ padding: 5, backgroundColor: '#1266d4', border: 'none', color: 'white', fontSize: '16px' }}
                                required
                                onChange={({ target }) => setNewUser({ ...newUser, do: target.value })}
                                defaultValue=""
                            >
                                <option value="" disabled >Wybierz aplikacje</option>
                                <option key={1} value={1}>Aplikacja webowa</option>
                                <option key={1} value={2}>Aplikacja mobilna</option>
                            </select>
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

export default NewUser;