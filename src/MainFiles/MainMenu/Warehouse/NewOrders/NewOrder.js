import { useState } from "react";
import Popup from "reactjs-popup";
import * as XLSX from "xlsx";
import { Table, Thead, Td, Topic, StyledInput, ButtonContainer, NewOrderButton } from "./styled";
import { useEffect } from "react";

const NewOrder = ({ modal, closeModal }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setOpen(modal)
    }, [modal]);

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

    console.log(data)

    const onClose = () => {
        closeModal()
        setData([])
    };

    return (
        <Popup open={modal} onClose={onClose}>
            <div style={{ backgroundColor: '#272953', padding: 30, maxWidth: '1400px', borderRadius: 10, textAlign: 'center', border: '3px solid white' }}>
                <Topic>NOWE PRZYJĘCIE</Topic>
                <StyledInput
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                >
                </StyledInput>
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
                    <NewOrderButton
                    >
                        Zaakceptuj
                    </NewOrderButton>
                    <NewOrderButton
                    onClick={onClose}
                    >
                        Odrzuć
                    </NewOrderButton>
                </ButtonContainer>
            </div>
        </Popup>
    );
};

export default NewOrder;