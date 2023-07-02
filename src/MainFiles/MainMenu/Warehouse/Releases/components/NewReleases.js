import { useState } from "react";
import ReactJsAlert from "reactjs-alert";
import Popup from "reactjs-popup";
import * as XLSX from "xlsx";
import { Table, Thead, Td, Topic, StyledInput, ButtonContainer, NewOrderButton } from "../../../styled";
import { StyledNewDataContainer } from './styled';
import { useDispatch } from "react-redux";
import { addRelese, fetchReleses } from "../relesesSlice";
import { fetchNewRelesesDetails } from "../newRelesesDetailsSlice";


const NewReleases = ({ modal, closeModal, clients }) => {
    const dispatch = useDispatch()

// error hendler
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

// excel functions 
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const render = new FileReader();
        render.readAsBinaryString(e.target.files[0]);
        render.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData)
        };
    };

// sending new order to database functions
    const initialState = {
        id: null,
        symbol: null
    }

    const [selectedClient, setSelectedClient] = useState(initialState);

    const onClose = () => {
        closeModal()
        setData([])
        setSelectedClient()
    };

    const onSubmit = () => {
        if (selectedClient === undefined || selectedClient === null) {
            setStatus(true)
            setType("error")
            setTitle("Klient nie został uzupełniony")
        } else {
            const newOrder = {
                KLIENT_ID: Number(selectedClient.id),
                ILOSC: data.map(i => (i.ILOSC)).reduce((a, b) => a + b, 0),
                WAGA: data.map(i => (i.WAGA)).reduce((a, b) => a + b, 0).toFixed(3),
                ODBIORCA: data[0].NADAWCA,
                KOD_POCZTOWY: data[0].KOD_POCZTOWY,
                MIEJSCOWOSC: data[0].MIEJSCOWOSC,
                ADRES: data[0].ADRES,
                KRAJ: data[0].KRAJ,
                DANE_AUTA: data[0].DANE_AUTA,
                KLIENT_NAZWA: selectedClient.symbol
            }
            dispatch(addRelese({order: newOrder, details: data}))
            onClose()
            dispatch(fetchNewRelesesDetails())
            dispatch(fetchReleses())
        }
    };

    return (
        <Popup open={modal} onClose={onClose}>
            <StyledNewDataContainer>
                <Topic>NOWE WYDANIE</Topic>

                <StyledInput
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
                {data.length > 0 && (
                    <Table>
                        <Thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </Thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <Td key={index}>{value}</Td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                <ButtonContainer data={data}>
                    <form>
                        <select style={{ padding: 5, backgroundColor: '#161b70', border: 'none', color: 'white', fontSize: '16px' }} 
                        required 
                        onChange={({ target }) => setSelectedClient({id: target.value.split(",")[0], symbol: target.value.split(",")[1]})} 
                        defaultValue=""
                        >
                            <option value="" disabled >Wybierz klienta</option>
                            {clients.map(client => (
                                <option key={client.ID} value={[client.ID, client.NAZWA]}>{client.SYMBOL}</option>
                            ))}
                        </select>
                    </form>
                    <NewOrderButton
                        onClick={onSubmit}
                    >
                        Zaakceptuj
                    </NewOrderButton>
                    <NewOrderButton
                        onClick={onClose}
                    >
                        Odrzuć
                    </NewOrderButton>
                </ButtonContainer>
            </StyledNewDataContainer>
            <ReactJsAlert
                status={status} // true or false
                type={type} // success, warning, error, info
                title={title}
                Close={() => setStatus(false)}
            />
        </Popup>
    );
};

export default NewReleases;