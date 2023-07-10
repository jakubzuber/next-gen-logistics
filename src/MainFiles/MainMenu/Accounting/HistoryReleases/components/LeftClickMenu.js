import Popup from "reactjs-popup";
import { Table, Topic } from "../../../styled";
import { StyledNewDataContainer } from './styled'
import { useSelector } from "react-redux";
import { selectClients } from "../../../Slices/clientsSlice";
import { selectHistOrders } from "../historyReleasesSlice";
import { selectHistOrdersDetails } from "./historyReleasesDetailsSlice";

const LeftClickMenu = ({ modal, closeModal }) => {
    const { clients } = useSelector(selectClients);
    const { histReleases } = useSelector(selectHistOrders);
    const { histReleasesDetails} = useSelector(selectHistOrdersDetails);
    console.log(histReleasesDetails)

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
                            {histReleases.filter(histReleases => histReleases.WYDANIE_ID === modal.orderId).map(order => (
                                <tbody key={order.ID}>
                                    <tr>
                                        <th>Magazynier:</th>
                                        <td>{order.OBSLUGA}</td>
                                    </tr>
                                    <tr>
                                        <th>Czas rozpoczęcia:</th>
                                        <td>{order.OBLUSG_START}</td>
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
                            {histReleases.filter(histReleases => histReleases.WYDANIE_ID === modal.orderId).map(order => (
                                <tbody key={order.ID}>
                                    <tr>
                                        <th>Nazwa:</th>
                                        <td>{order.ODBIORCA}</td>
                                    </tr>
                                    <tr>
                                        <th>Adres:</th>
                                        <td>{order.ADERES}</td>
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
                            {histReleasesDetails.filter(histReleasesDetails => histReleasesDetails.WYDANIE_ID === modal.orderId).map(orderDetails => (
                                <>
                                    <li key={orderDetails.ID}>
                                        {orderDetails.ILOSC}szt. {orderDetails.KOD} - Paleta: {orderDetails.PALETA}
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