import Popup from "reactjs-popup";
import { Table, Topic } from "../../../styled";
import { StyledNewDataContainer } from './styled'
import { useSelector } from "react-redux";
import { selectClients } from "../../../Slices/clientsSlice";
import { selectHistOrders } from "../historyOrdersSlice";
import { selectHistOrdersDetails } from "./historyReleasesDetailsSlice";

const LeftClickMenu = ({ modal, closeModal }) => {
    const { clients } = useSelector(selectClients);
    const { histOrders } = useSelector(selectHistOrders);
    const { histOrderDetails } = useSelector(selectHistOrdersDetails);

    const onClose = () => {
        closeModal()
    };

    return (
        <Popup open={modal.show} onClose={onClose}>
            <StyledNewDataContainer>
                <Topic>HISTORIA WYDAŃ</Topic>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', color: 'white', minWidth: '800px' }}>
                    <div>
                        <p>Dane klienta:</p>
                        <Table>
                        {clients.filter(clients => clients.SYMBOL === modal.client).map(client => (
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
                        {histOrders.filter(histOrders => histOrders.PRZYJĘCIE_ID === modal.orderId).map(order => (
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
                        <p>Dane dostawcy:</p>
                        <Table>
                        {histOrders.filter(histOrders => histOrders.PRZYJĘCIE_ID === modal.orderId).map(order => (
                                <tbody key={order.ID}>
                                    <tr>
                                        <th>Nazwa:</th>
                                        <td>{order.NADAWCA}</td>
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
                        {histOrderDetails.filter(histOrderDetails => histOrderDetails.PRZYJCIE_ID === modal.orderId).map(orderDetails => (
                                <>
                                    <li key={orderDetails.ID}>
                                        {orderDetails.ILOSC}szt. {orderDetails.KOD_PRODUKTU} 
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