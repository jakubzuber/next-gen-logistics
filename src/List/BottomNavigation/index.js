import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../Orders/ordersSlice"


const BottomNavigation = () => {
    const [ newId, setNewId ] = useState("");
    const [ newClient, setNewClient ] = useState("");
    const [ newNrOfPals, setNewNrOfPals ] = useState("");
    const [ newLenght, setNewLenght ] = useState("");
    const [ newWidth, setNewWidth ] = useState("");
    const [ newHeight, setNewHeight ] = useState("");
    const [ newColDate, setNewColDate ] = useState("");
    const [ newDelDate, setNewDelDate ] = useState("");

    const dispath = useDispatch();

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispath(addOrder({
            id: newId,
            client: newClient,
            quantities: newNrOfPals,
            length: newLenght,
            width: newWidth,
            height: newHeight,
            colDate: newColDate,
            delDate: newDelDate,
        }));
    };

    return (
      
            <form onSubmit={onFormSubmit}>
                <p>Dodaj nowe zlecenie: <button>Dodaj!</button></p>
                <input
                    type="number"
                    placeholder="ID"
                    required
                    value={newId}
                    onChange={({ target }) => setNewId(target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Client"
                    required
                    value={newClient}
                    onChange={({ target }) => setNewClient(target.value)}
                ></input>
                <input
                    type="number"
                    placeholder="Nr of pals"
                    required
                    value={newNrOfPals}
                    onChange={({ target }) => setNewNrOfPals(target.value)}
                ></input>
                <input
                    type="number"
                    placeholder="Lenght"
                    required
                    value={newLenght}
                    onChange={({ target }) => setNewLenght(target.value)}
                ></input>
                <input
                    type="number"
                    placeholder="width"
                    required
                    value={newWidth}
                    onChange={({ target }) => setNewWidth(target.value)}
                ></input>
                <input
                    type="number"
                    placeholder="height"
                    required
                    value={newHeight}
                    onChange={({ target }) => setNewHeight(target.value)}
                ></input>
                <input
                    type="date"
                    placeholder="Col date"
                    required
                    value={newColDate}
                    onChange={({ target }) => setNewColDate(target.value)}
                ></input>
                <input
                    type="date"
                    placeholder="Del date"
                    required
                    value={newDelDate}
                    onChange={({ target }) => setNewDelDate(target.value)}
                ></input>
            </form>
       
    )
}

export default BottomNavigation;