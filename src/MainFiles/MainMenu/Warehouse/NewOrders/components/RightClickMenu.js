import { useEffect, useRef } from "react";
import { StyledSelect, StyledForm } from './styled'

const RightClickMenu = ({ x, y, closeContexMenu, whWorker, id }) => {
    let menuRef = useRef();

    // useEffect to close contexMenu on click outside container
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                closeContexMenu()
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [closeContexMenu]);

    // upade on database - set wh worder to order
    const setWorkerToOrder = async ({id, worker}) => {
        if (worker === null || worker === "") {
            return
        } else {
            await fetch('/setWorkerToOrder', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    idOrder: id,
                    idWorker: worker
                })
            })
            closeContexMenu();
            window.location.reload(false);
        }
    };

    return (
        <StyledForm
            ref={menuRef}
            x={x}
            y={y}
            >
            <StyledSelect
                required
                onChange={({ target }) => setWorkerToOrder({worker: target.value, id})}
                defaultValue=""
            >
                <option value="" >Wybierz magazyniera</option>
                {whWorker.map(worker => (
                    <option key={worker.ID} value={worker.ID}>{worker.SYMBOL}</option>
                ))}
            </StyledSelect>
        </StyledForm >
    );
};

export default RightClickMenu;