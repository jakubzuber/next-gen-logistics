import { useState, useEffect } from "react";
import NewOrder from "./NewOrder";
import { selectNewOrders, fetchNewOrders } from "./newOrdersSlice";
import { useSelector, useDispatch } from "react-redux";
import { Table, Topic, Thead, Td, Th, StyledButton, FunctionButtons, Tr } from "./styled";
import RightClickMenu from "./RightClickMenu";

const NewOrders = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { newOrders } = useSelector(selectNewOrders);
    const [clients, setClients] = useState([]);

    const initalContexMenu = {
        show: false,
        x: 0,
        y: 0
    };

    


    const [contexMenu, setContextMenu ] = useState(initalContexMenu)

    useEffect(() => {
        let handler = () => {
            setContextMenu(initalContexMenu)
        }

        document.addEventListener("mousedown", handler)
    });

    const fetchClientsList = async () => {
        const newData = await fetch('./fetchClients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        console.log(newData)
        return setClients(newData)
    };

    useEffect(() => {
        dispatch(fetchNewOrders())
    }, [dispatch])

    const toggleModal = () => {
        fetchClientsList()
        setModal(!modal)  
    };

    const closeModal = () => {
        setModal(false)
    };

    const handleContexMenu = (e) => {
        e.preventDefault()

        const { pageX, pageY } = e
        setContextMenu({ show: true, x: pageX, y: pageY })
    };

    const contexMenuClose = () => { 
        setContextMenu(initalContexMenu)
    };
   
    return (
        <div>
             { contexMenu.show && <RightClickMenu closeContexMenu={contexMenuClose} x={contexMenu.x} y={contexMenu.y} />}
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
                        <Tr 
                        onContextMenu={(e) => {handleContexMenu(e)}} 
                        key={orders.ID}
                        >
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
            <NewOrder modal={modal} closeModal={closeModal} clients={clients}/>
        </div>
    );
};

export default NewOrders;