import { useState } from "react";
import NewOrder from "./NewOrder";
import { selectNewOrders, fetchNewOrders } from "./newOrdersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Table, Topic, Thead, Td, Th, StyledButton, FunctionButtons, Tr } from "./styled";

const NewOrders = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { newOrders } = useSelector(selectNewOrders);

    useEffect(() => {
        dispatch(fetchNewOrders())
    }, [dispatch])

    const toggleModal = () => {
        setModal(!modal)
    };

    const closeModal = () => {
        setModal(false)
    };

    return (
        <div>
            <Topic>PRZYJĘCIA</Topic>
            <FunctionButtons>
                <StyledButton
                    onClick={toggleModal}
                >Dodaj nowe zlecenie</StyledButton>
            </FunctionButtons>
            <Table>
                <Thead>
                    <tr>
                        <Th>ID</Th>
                        <Th>KLIENT_ID</Th>
                        <Th>NR_WLASNY</Th>
                        <Th>ILOSC</Th>
                        <Th>WAGA</Th>
                        <Th>NADAWCA</Th>
                        <Th>KOD</Th>
                        <Th>MIEJSCOWOSC</Th>
                        <Th>ADRES</Th>
                        <Th>KRAJ</Th>
                        <Th>UWAGI</Th>
                        <Th>DANE AUTA</Th>
                    </tr>
                </Thead>
                <tbody>
                    {newOrders.map(orders => (
                        <Tr key={orders.ID}>
                            <Td>{orders.ID}</Td>
                            <Td>{orders.KLIENT_ID}</Td>
                            <Td>{orders.NR_WLASNY}</Td>
                            <Td>{orders.ILOSC}</Td>
                            <Td>{orders.WAGA}</Td>
                            <Td>{orders.NADAWCA}</Td>
                            <Td>{orders.KOD_POCZTOWY}</Td>
                            <Td>{orders.MIEJSCOWOSC}</Td>
                            <Td>{orders.ADRES}</Td>
                            <Td>{orders.KRAJ}</Td>
                            <Td>{orders.UWAGI}</Td>
                            <Td>{orders.DANE_AUTA}</Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
            <NewOrder modal={modal} closeModal={closeModal}/>
        </div>
    );
};

export default NewOrders;