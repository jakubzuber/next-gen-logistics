import { useRef } from "react";

const RightClickMenu = ({ x, y, closeContexMenu }) => {
    const contexMenuRef = useRef(null)
    useClickOutside(contexMenuRef, closeContexMenu)

    return (
        <div
            ref={contexMenuRef}
            onClick={() => closeContexMenu()}
            style={{ position: 'absolute', backgroundColor: 'red', top: `${y}px`, left: `${x}px` }} >
            <p>asdasdasd</p>
        </div>
    );
};

export default RightClickMenu;