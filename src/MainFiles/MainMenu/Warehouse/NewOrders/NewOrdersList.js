import { useState } from "react";
import NewOrder from "./NewOrder";
import { selectNewOrders, fetchNewOrders } from "./newOrdersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Table, Topic, Thead, Td, Th } from "./styled";

const NewOrders = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { newOrders } = useSelector(selectNewOrders);

    useEffect(() => {
        dispatch(fetchNewOrders())
    }, [dispatch])

    setTimeout(() => {
        console.log(newOrders[0]);
    }, 2000);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
            <button
                style={{ height: 40, widTh: 100 }}
                onClick={toggleModal}
            >Dodaj nowe zlecenie</button>
            <Table>
                <Thead>
                    <tr>
                        <Th></Th>
                        <Th>adasd</Th>
                        <Th>adasd</Th>
                        <Th>adasd</Th>
                        <Th>adasd</Th>
                        <Th>adasd</Th>
                    </tr>
                </Thead>
                <tbody>
                    <tr>
                        <Td>adasd</Td>
                        <Td>adasd</Td>
                        <Td>adasd</Td>
                        <Td>adasd</Td>
                        <Td>adasd</Td>
                    </tr>
                </tbody>
            </Table>
            <NewOrder modal={modal} />
        </>
    );
};

export default NewOrders;