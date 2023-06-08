import { useState } from "react";
import ReactJsAlert from "reactjs-alert";
import Popup from "reactjs-popup";
import * as XLSX from "xlsx";
import { Table, Thead, Td, Topic, StyledInput, ButtonContainer, NewOrderButton } from "../styled";
import { StyledNewDataContainer } from './styled'


const NewOrder = ({ modal, closeModal, clients }) => {
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
    const [selectedClient, setSelectedClient] = useState();

    const sendNewOrder = async (newOrder, data) => {
        await fetch('/setNewOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                newOrder,
                data
            })
        })
    };

    const onClose = () => {
        closeModal()
        setData([])
        setSelectedClient()
    };

    const onSubmit = () => {
        if (selectedClient === undefined) {
            setStatus(true)
            setType("error")
            setTitle("Klient nie został uzupełniony")
        } else {
            const newOrder = {
                client: Number(selectedClient),
                number: data.map(i => (i.ILOSC)).reduce((a, b) => a + b, 0),
                weight: data.map(i => (i.WAGA)).reduce((a, b) => a + b, 0).toFixed(3),
                nadawca: data[0].NADAWCA,
                kod: data[0].KOD_POCZTOWY,
                miejscowosc: data[0].MIEJSCOWOSC,
                adres: data[0].ADRES,
                kraj: data[0].KRAJ,
                dane: data[0].DANE_AUTA
            }
            sendNewOrder(newOrder, data)
            onClose()
            window.location.reload(false);
        }
    };

    return (
        <Popup open={modal} onClose={onClose}>
            <StyledNewDataContainer>
                <Topic>NOWE PRZYJĘCIE</Topic>

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
                        <select style={{ padding: 5, backgroundColor: '#272953', border: 'none', color: 'white', fontSize: '16px' }} required onChange={({ target }) => setSelectedClient(target.value)} defaultValue="">
                            <option value="" disabled >Wybierz klienta</option>
                            {clients.map(client => (
                                <option key={client.ID} value={client.ID}>{client.SYMBOL}</option>
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

export default NewOrder;