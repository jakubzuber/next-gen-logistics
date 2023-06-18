import { BarCodeTextContainer, BarCodeText } from './styled'

const BarCodePrint = ({ rowSelection }) => {
    return (
        <BarCodeTextContainer >
                {Object.keys(rowSelection).map((key, index) => (
                    <BarCodeText key={index}> {key}</BarCodeText>
                ))}   
        </BarCodeTextContainer>
    );
};

export default BarCodePrint;
