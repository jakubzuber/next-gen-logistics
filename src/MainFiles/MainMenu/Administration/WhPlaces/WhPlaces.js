import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWhPlaces, selectWhPlaces } from "./whPlacesSlice";
import { FunctionButtons, StyledButton } from "../../styled";
import NewWhPlace from "./components/NewWhPlace";

import { MaterialReactTable } from 'material-react-table';
import { MenuItem } from '@mui/material';
import { MRT_Localization_PL } from 'material-react-table/locales/pl'

const WhPlaces = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [rowSelection, setRowSelection] = useState({});
    const { whPlaces } = useSelector(selectWhPlaces);

    useEffect(() => {
        dispatch(fetchWhPlaces())
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal)
    };

    const closeModal = () => {
        setModal(false)
    };

    const columns = useMemo(
        () => [
          {
            accessorKey: 'ID', //access nested data with dot notation
            header: 'Id',
            size: 50,
          },
          {
            accessorKey: 'KOD_KRESKOWY', //normal accessorKey
            header: 'Kod',
            size: 150,
          },
          {
            accessorKey: 'OPIS',
            header: 'Opis',
            size: 300,
          },
          {
            accessorKey: 'KOD',
            header: 'Kod kreskowy',
            size: 150,
          },
        ],
        [],
      );

      const deletePlace = async ( id ) => {
        console.log(id)
        await fetch('/deletePlace', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                idPlace: id
            })
        })
        window.location.reload(false);
    };

    return (
        <div>
            <FunctionButtons>
                <StyledButton
                    onClick={() => toggleModal()}>
                    Nowe miejsca składowe
                </StyledButton>
            </FunctionButtons>
            <MaterialReactTable 
            columns={columns} 
            data={whPlaces} 
            localization={MRT_Localization_PL} 
            enableRowSelection
            onRowSelectionChange={setRowSelection}
            state={{ rowSelection }}
            enableRowActions 
            renderRowActionMenuItems={({ row }) => [
                <MenuItem key="edit" onClick={() => console.info()}>
                    Edit
                </MenuItem>,
                <MenuItem key="Usuń" onClick={() =>deletePlace(row.original.ID)}>
                    Delete
                </MenuItem>,
            ]} />
            <NewWhPlace modal={modal} closeModal={closeModal} />
        </div>
    );
};

export default WhPlaces;