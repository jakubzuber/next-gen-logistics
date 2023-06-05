import { useEffect, useRef, useState } from "react";

const RightClickMenu = ({ x, y, closeContexMenu, whWorker, id }) => {
    let menuRef = useRef();

    // useEffect do zamknięcia onContexMenu po klicknięciu w obaszar poza listą

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

    // update na bazie odnośnie wybranego magazyniera

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
        }
    };

    return (
        <form
            ref={menuRef}
            style={{ position: 'absolute', top: `${y - 10}px`, left: `${x + 15}px`, width: '5%', height: '5%', zIndex: 2 }} >
            <select
                style={{ padding: 5, backgroundColor: 'white', border: 'none', fontSize: '16px' }}
                required
                onChange={({ target }) => setWorkerToOrder({worker: target.value, id})}
                defaultValue=""
            >
                <option value="" >Wybierz magazyniera</option>
                {whWorker.map(worker => (
                    <option key={worker.ID} value={worker.ID}>{worker.SYMBOL}</option>
                ))}
            </select>
        </form >
    );
};

export default RightClickMenu;