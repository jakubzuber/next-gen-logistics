import { useEffect, useRef } from "react";
import { StyledForm, RightClickButton } from './styled'
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

const RightClickMenu = ({ x, y, id, kod }) => {
 



    const pageStyls = `
    @media print {
        @page {
          size: 60mm 50mm;
        }
      }`

    return (
            <StyledForm
                ref={menuRef}
                x={x}
                y={y}
            >
                <RightClickButton onClick={() => deletePlace(id)}>Usuń miejsce</RightClickButton>
                
                    <ReactToPrint
                        trigger={() =><RightClickButton>Wydrukuj</RightClickButton>}
                        content={() => bar.current}
                        pageStyle={pageStyls}
                    >
                    </ReactToPrint>
                    <Barcode value={kod} ref={bar}></Barcode>
            </StyledForm >      
    );
};

export default RightClickMenu;