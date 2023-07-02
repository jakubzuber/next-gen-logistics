import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { Table, Topic } from "../../../styled";
import { selectStockDetails, selectStockLoading } from "./stockDetailsSlice";
import { StyledNewDataContainer } from './styled'

const LeftClickMenu = ({ modal, closeModal }) => {
    const { stocksDetails } = useSelector(state => selectStockDetails(state));
    const loading = useSelector(selectStockLoading);

    const onClose = () => {
        closeModal()
    };

    return (
        <Popup open={modal.show} onClose={onClose}>
            <StyledNewDataContainer>
                {loading ? <Topic>Ładowanie danych...</Topic> :
                    <>
                        <Topic>SZCZEGÓŁY STANY</Topic>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', color: 'white', minWidth: '800px' }}>
                            <div>
                                <p>Dane zbiorcze: </p>
                                <Table>
                                    <tbody>
                                        {stocksDetails.filter((stocksDetails, index) => index === 0).map(stock => (
                                            <>
                                                <tr>
                                                    <th>Klient: </th>
                                                    <td>{stock.KLIENT_NAZWA}</td>
                                                </tr>
                                                <tr>
                                                    <th>Kod produktu: </th>
                                                    <td>{stock.KOD_PRODUKTU}</td>
                                                </tr>
                                                <tr>
                                                    <th>Nazwa produktu: </th>
                                                    <td>{stock.NAZWA_PRODUKTU}</td>
                                                </tr>
                                                <tr>
                                                    <th>Kod kreskowy: </th>
                                                    <td>{stock.KOD_KRESKOWY}</td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div>
                                <p>Dane szczegółówe: </p>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Paleta</th>
                                            <th>Ilosc</th>
                                            <th>Przyjecie Id</th>
                                        </tr>
                                    </thead>
                                    {stocksDetails.map(stock => (
                                        <tbody>

                                            <>
                                                <td>{stock.ID}</td>
                                                <td>{stock.PALETA_NUMER}</td>
                                                <td>{stock.ILOSC}</td>
                                                <td>{stock.PRZYJECIE_ID}</td>
                                            </>

                                        </tbody>
                                    ))}
                                </Table>
                            </div>
                        </div>
                    </>
                }
            </StyledNewDataContainer>
        </Popup >
    );
};

export default LeftClickMenu;