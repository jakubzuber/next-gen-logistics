import { useState } from "react";
import Popup from "reactjs-popup";
import * as XLSX from "xlsx";

const NewOrder = ({modal}) => {

    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const render = new FileReader();
        render.readAsBinaryString(e.target.files[0]);
        render.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: "binary"});
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData)
        };
    };

    return (
        <Popup open={modal} modal>
            <div style={{backgroundColor: 'blue', padding: 100}}>
                <input 
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                />
                {data.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Popup>
    );
};

export default NewOrder;