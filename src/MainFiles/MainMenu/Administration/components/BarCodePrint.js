import { BarCodeTextContainer, BarCodeText } from './styled'
var Barcode = require('react-barcode');

const BarCodePrint = ({ rowSelection }) => {
    return (
        <BarCodeTextContainer >
                {Object.keys(rowSelection).map((key, index) => (
                    <Barcode value={key} />
                ))}   
        </BarCodeTextContainer>
    );
};

export default BarCodePrint;
