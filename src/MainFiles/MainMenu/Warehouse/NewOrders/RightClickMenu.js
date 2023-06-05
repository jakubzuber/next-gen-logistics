import { useEffect, useRef } from "react";

const RightClickMenu = ({ x, y }) => {
    return (
        <div
            style={{ position: 'absolute', backgroundColor: 'red', top: `${y}px`, left: `${x}px` }} >
            <p>asdasdasd</p>
        </div>
    );
};

export default RightClickMenu;