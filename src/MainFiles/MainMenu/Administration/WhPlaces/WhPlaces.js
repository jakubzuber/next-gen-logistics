import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWhPlaces, selectWhPlaces } from "./whPlacesSlice";
import { Table, Thead, Td, FunctionButtons, Th, StyledButton } from "../../styled";
import NewWhPlace from "./components/NewWhPlace";

const WhPlaces = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { whPlaces } = useSelector(selectWhPlaces);

    useEffect(() => {
        dispatch(fetchWhPlaces())
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal)
    };

    const closeModal = () => {
        setModal(false)
    };

    return (
        <div>
            <FunctionButtons>
                <StyledButton
                onClick={() => toggleModal()}>
                    Nowe miejsca składowe
                </StyledButton>
            </FunctionButtons>
            <Table>
                <Thead>
                    <tr>
                        <Th>ID</Th>
                        <Th>SYMBOL</Th>
                        <Th>OPIS</Th>
                    </tr>
                </Thead>
                <tbody>
                    {whPlaces.map(place => (
                        <tr key={place.ID}>
                            <Td>{place.ID}</Td>
                            <Td>{place.KOD_KRESKOWY}</Td>
                            <Td>{place.OPIS}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <NewWhPlace modal={modal} closeModal={closeModal} />
        </div>
    );
};

export default WhPlaces;