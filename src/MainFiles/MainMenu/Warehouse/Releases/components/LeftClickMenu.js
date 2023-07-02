import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { Table, Topic } from "../../../styled";
import { StyledNewDataContainer } from './styled'
import { selectClients } from "../../../Slices/clientsSlice";
import { selectNewRelesesDetails } from "../newRelesesDetailsSlice";
import { selectReleses } from "../relesesSlice";

const LeftClickMenu = ({ modal, closeModal }) => {
    const { releses } = useSelector(selectReleses);
    const { newRelesesDetails } = useSelector(selectNewRelesesDetails);
    const { clients } = useSelector(selectClients);

    const onClose = () => {
        closeModal()
    };
    return (
        <Popup open={modal.show} onClose={onClose}>
            <StyledNewDataContainer>
                <Topic>WYDANIA PRZYJĘCIA</Topic>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', color: 'white', minWidth: '800px' }}>
                    <div>
                        <p>Dane klienta:</p>
                        <Table>
                        {clients.filter(clients => clients.ID === modal.clientId).map(client => (
                                <tbody>
                                    <tr>
                                        <th>Nazwa:</th>
                                        <td>{client.NAZWA}</td>
                                    </tr>
                                    <tr>
                                        <th>Adres:</th>
                                        <td>{client.ADRES}</td>
                                    </tr>
                                    <tr>
                                        <th>Miejscowość:</th>
                                        <td>{client.KOD_POCZTOWY} {client.MIEJSCOWOSC}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </div>
                    <div>
                        <p>Szczególy obsługi:</p>
                        <Table>
                        {releses.filter(releses => releses.ID === modal.orderId).map(order => (
                                <tbody key={order.ID}>
                                    <tr>
                                        <th>Magazynier:</th>
                                        <td>{order.OBSLUGA}</td>
                                    </tr>
                                    <tr>
                                        <th>Czas rozpoczęcia:</th>
                                        <td>{order.OBSLUGA_START}</td>
                                    </tr>
                                    <tr>
                                        <th>Czas zakończenia:</th>
                                        <td>{order.OBSLUGA_KONIEC}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </div>
                    <div>
                        <p>Dane odbiorcy:</p>
                        <Table>
                        {releses.filter(releses => releses.ID === modal.orderId).map(order => (
                                <tbody key={order.ID}>
                                    <tr>
                                        <th>Nazwa:</th>
                                        <td>{order.ODBIORCA}</td>
                                    </tr>
                                    <tr>
                                        <th>Adres:</th>
                                        <td>{order.ADRES}</td>
                                    </tr>
                                    <tr>
                                        <th>Miejscowość:</th>
                                        <td>{order.KOD_POCZTOWY} {order.MIEJSCOWOSC}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </div>
                    <div>
                        <p>Szczegóły operacji:</p>
                        <ul>
                        {newRelesesDetails.filter(newRelesesDetails => newRelesesDetails.WYDANIE_ID === modal.orderId).map(orderDetails => (
                                <>
                                    <li key={orderDetails.ID}>
                                        {orderDetails.ILOSC}szt. {orderDetails.NAZWA_PRODUKTU} ({orderDetails.KOD_PRODUKTU} ) // {orderDetails.WAGA}kg
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </div>
            </StyledNewDataContainer>
        </Popup >
    );
};

export default LeftClickMenu;