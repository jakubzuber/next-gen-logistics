import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewOrder from "./components/NewOrder";
import { selectNewOrders, fetchNewOrders } from "./newOrdersSlice";
import { Table, Topic, Thead, Td, Th, StyledButton, FunctionButtons, Tr } from "./styled";
import RightClickMenu from "./components/RightClickMenu";
import LeftClickMenu from "./components/LeftClickMenu";
import { fetchNewOrdersDetails } from "./newOrdersDetailsSlice";
import { fetchClients } from "../../Slices/clientsSlice";

const NewOrders = () => {
    const dispatch = useDispatch();
    const { newOrders } = useSelector(selectNewOrders);

    useEffect(() => {
        dispatch(fetchNewOrders())
        dispatch(fetchNewOrdersDetails())
        dispatch(fetchClients())
    }, [dispatch])

// modal functions (detals of order)
    const initialDetails = {
        show: false,
        orderId: null,
        clientId: null
    };

    const [details, setDetails] = useState(initialDetails);

    const openDetials = ({orderId, clientId}) => {
        setDetails({show: true, orderId: orderId, clientId: clientId})
    };

    const closeDetils = () => {
        setDetails({show: false, id: null})
    };

// modal functions (new Order functions)

    const [modal, setModal] = useState(false);
    const [clients, setClients] = useState([]);

    const fetchWhWorker = async () => {
        const newData = await fetch('./fetchWhWorkers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
        return setWhWorker(newData)
    };

    const fetchClientsList = async () => {
        const newData = await fetch('./fetchClients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
        return setClients(newData)
    };

    const toggleModal = () => {
        fetchClientsList()
        setModal(!modal)
    };

    const closeModal = () => {
        setModal(false)
    };

// contex menu functions (assign wh worker functions)

    const initalContexMenu = {
        show: false,
        x: 0,
        y: 0,
        id: null
    };
    const [contexMenu, setContextMenu] = useState(initalContexMenu)
    const [whWorker, setWhWorker] = useState([]);

    const handleContexMenu = ({ e, id }) => {
        e.preventDefault()
        const { pageX, pageY } = e
        setContextMenu({ show: true, x: pageX, y: pageY, id: id })
        fetchWhWorker()
    };

    const contexMenuClose = () => {
        setContextMenu(initalContexMenu)
    };

    return (
        <div>
            {contexMenu.show && <RightClickMenu whWorker={whWorker} closeContexMenu={contexMenuClose} x={contexMenu.x} y={contexMenu.y} id={contexMenu.id} />}
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
                        <Th>KLIENT</Th>
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
                        <Th>OBSŁUGA</Th>
                    </tr>
                </Thead>
                <tbody>
                    {newOrders.map(orders => (
                        <Tr
                            onContextMenu={(e) => { handleContexMenu({ e, id: orders.ID })}}
                            onClick={() => openDetials({orderId: orders.ID, clientId: orders.KLIENT_ID})}
                            key={orders.ID}
                        >
                            <Td>{orders.ID}</Td>
                            <Td>{orders.KLIENT_NAZWA}</Td>
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
                            <Td>{orders.OBSLUGA}</Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
            <NewOrder modal={modal} closeModal={closeModal} clients={clients} />
            <LeftClickMenu modal={details} closeModal={closeDetils} />
        </div>
    );
};

export default NewOrders;