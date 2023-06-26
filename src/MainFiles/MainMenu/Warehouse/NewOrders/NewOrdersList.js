/* eslint-disable */
import { useReducer, useRef, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NewOrder from "./components/NewOrder";
import { selectNewOrders, fetchNewOrders, removeOrder, clearWorker, assignWhWorker } from "./newOrdersSlice";
import { Topic, StyledButton, FunctionButtons } from "../../styled";
import LeftClickMenu from "./components/LeftClickMenu";
import { fetchNewOrdersDetails } from "./newOrdersDetailsSlice";
import { fetchClients } from "../../Slices/clientsSlice";
import { StyledSelect } from '../../styled'
import { MenuItem } from "@mui/material";
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import {
    MaterialReactTable,
    MRT_FullScreenToggleButton,
    MRT_GlobalFilterTextField,
    MRT_ShowHideColumnsButton,
    MRT_TablePagination,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFiltersButton,
    MRT_ToolbarAlertBanner,
} from 'material-react-table';
import { Box, Toolbar, } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const NewOrders = () => {
    const dispatch = useDispatch();
    const { newOrders } = useSelector(selectNewOrders);
    const [whWorker, setWhWorker] = useState([]);

    //table options

    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const rerender = useReducer(() => ({}), {})[1];
    const [columnVisibility, setColumnVisibility] = useState({});
    const [density, setDensity] = useState('compact');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [showColumnFilters, setShowColumnFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchNewOrders())
        dispatch(fetchNewOrdersDetails())
        dispatch(fetchClients())
    }, [dispatch])


    // modal functions (detals of order)
    const initialDetails = {
        show: false,
        orderId: null,
        clientId: null
    };

    const [details, setDetails] = useState(initialDetails);

    const openDetials = ({ orderId, clientId }) => {
        setDetails({ show: true, orderId: orderId, clientId: clientId })
    };

    const closeDetils = () => {
        setDetails({ show: false, id: null })
    };

    // modal functions (new Order functions)

    const [modal, setModal] = useState(false);
    const [clients, setClients] = useState([]);

    const fetchWhWorker = async () => {
        const newData = await fetch('./fetchWhWorkers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
        return setWhWorker(newData)
    };

    const fetchClientsList = async () => {
        const newData = await fetch('./fetchClients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
        return setClients(newData)
    };

    const toggleModal = () => {
        fetchClientsList()
        setModal(!modal)
    };

    const closeModal = () => {
        setModal(false)
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'ID',
                header: 'Id',
                size: 30,
            },
            {
                accessorKey: 'KLIENT_NAZWA',
                header: 'Klient',
                size: 100,
            },
            {
                accessorKey: 'ILOSC',
                header: 'Ilość',
                size: 30,
            },
            {
                accessorKey: 'WAGA',
                header: 'Waga',
                size: 30,
            },
            {
                accessorKey: 'NADAWCA',
                header: 'Nadawca',
                size: 100,
            },
            {
                accessorKey: 'KOD_POCZTOWY',
                header: 'Kod poczt.',
                size: 30,
            },
            {
                accessorKey: 'MIEJSCOWOSC',
                header: 'Miejscowość',
                size: 60,
            },
            {
                accessorKey: 'ADRES',
                header: 'Adres',
                size: 150,
            },
            {
                accessorKey: 'KRAJ',
                header: 'Kraj',
                size: 30,
            },
            {
                accessorKey: 'DANE_AUTA',
                header: 'Dane auta',
                size: 50,
            },
            {
                accessorKey: 'OBSLUGA',
                header: 'Magazynier',
                size: 50,
            },
        ],
        [],
    );

    

    return (
        <div>
            <Topic>PRZYJĘCIA</Topic>
            <FunctionButtons>
                <StyledButton
                    onClick={toggleModal}
                >Dodaj nowe zlecenie</StyledButton>
            </FunctionButtons>
            <Box sx={{ borderRadius: '7px', backgroundColor: '#1266d4' }}>
                {tableInstanceRef.current && (
                         <Toolbar
                            sx={(theme) => ({
                                backgroundColor: '#1266d4',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: {
                                    xs: 'column',
                                    lg: 'row',
                                },
                                gap: '1rem',
                                justifyContent: 'space-between',
                                p: '1.5rem 0',
                                height: '1vh'
                            })}
                        >
                            <div style={{ backgroundColor: 'white', borderRadius: '7px' }} ><MRT_GlobalFilterTextField table={tableInstanceRef.current} /></div>
                            <Box>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                            <MRT_ToolbarAlertBanner
                                    stackAlertBanner
                                    table={tableInstanceRef.current}
                                />
                                <MRT_ToggleFiltersButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                                <MRT_ShowHideColumnsButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                                <MRT_ToggleDensePaddingButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                                <MRT_FullScreenToggleButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                            </Box>
                        </Toolbar>
                )}
                <MaterialReactTable
                    localization={MRT_Localization_PL}
                    columns={columns}
                    data={newOrders}
                    enableColumnOrdering={false}
                    enableBottomToolbar={false}
                    enableRowSelection
                    enableColumnResizing
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => { openDetials({ orderId: row.original.ID, clientId: row.original.KLIENT_ID }) },
                        hover: false,
                        sx: { backgroundColor: '#1266d4', color: 'white', cursor: 'pointer', ":hover": { backgroundColor: '#1266d4' } }
                    })}
                    muiTableBodyProps={{ sx: { backgroundColor: '#1266d4', color: 'white' } }}
                    muiTableBodyCellProps={{ sx: { color: 'white' } }}
                    muiTableHeadRowProps={{ sx: { backgroundColor: '#1266d4' } }}
                    muiTableHeadCellProps={{ sx: { color: 'white' } }}
                    muiSelectCheckboxProps={{ sx: { color: 'white' } }}
                    muiSelectAllCheckboxProps={{ sx: { color: 'white' } }}
                    muiTableHeadCellColumnActionsButtonProps={{ sx: { color: 'white' } }}
                    muiTableHeadCellFilterTextFieldProps={{ sx: { backgroundColor: 'white', borderRadius: '7px', padding: '2px' } }}
                    enableRowActions
                    positionActionsColumn={'last'}
                    options={{ actionsCellStyle: { display: "flex", justifyContent: "center", backgroundColor: 'red' } }}
                    renderRowActionMenuItems={({ row, closeMenu }) => [
                        <MenuItem  sx={{ justifyContent: 'center' }} key="wydrukuj" onClick={() => {dispatch(clearWorker(row.original.ID)), closeMenu()}}>
                            Usuń magazyniera
                        </MenuItem>,
                        <MenuItem sx={{ justifyContent: 'center' }} key="usun" onClick={() => {dispatch(removeOrder(row.original.ID)), closeMenu()}}>
                            Usuń zlecenie
                        </MenuItem>,
                        <MenuItem sx={{ justifyContent: 'center' }} key="magazynier" onClick={() => fetchWhWorker()} >
                            <StyledSelect
                                onChange={({ target }) => {dispatch(assignWhWorker({ worker: target.value, id: row.original.ID })), closeMenu()}}
                                defaultValue=""
                            >
                                <option key={0} value="" >Wybierz magazyniera</option>
                                {whWorker.map(worker => (
                                    <option value={worker.SYMBOL} key={worker.ID_USER}>{worker.SYMBOL}</option>
                                ))}
                            </StyledSelect>
                        </MenuItem>
                    ]}
                    enableTopToolbar={false}
                    initialState={{ showGlobalFilter: true }}
                    icons={{
                        MoreHorizIcon: (props) => <MoreHorizIcon sx={{ color: '#ffffff' }} {...props} />
                    }}
                    onColumnVisibilityChange={(updater) => {
                        setColumnVisibility((prev) =>
                            updater instanceof Function ? updater(prev) : updater,
                        );
                        queueMicrotask(rerender);
                    }}
                    onDensityChange={(updater) => {
                        setDensity((prev) =>
                            updater instanceof Function ? updater(prev) : updater,
                        );
                        queueMicrotask(rerender);
                    }}
                    onRowSelectionChange={(updater) => {
                        setRowSelection((prev) =>
                            updater instanceof Function ? updater(prev) : updater,
                        );
                        queueMicrotask(rerender);
                    }}
                    onPaginationChange={(updater) => {
                        setPagination((prev) =>
                            updater instanceof Function ? updater(prev) : updater,
                        );
                        queueMicrotask(rerender);
                    }}
                    onShowColumnFiltersChange={(updater) => {
                        setShowColumnFilters((prev) =>
                            updater instanceof Function ? updater(prev) : updater,
                        );
                        queueMicrotask(rerender);
                    }}
                    state={{
                        columnVisibility,
                        density,
                        rowSelection,
                        pagination,
                        showColumnFilters,
                    }}
                    tableInstanceRef={tableInstanceRef}
                />
                {tableInstanceRef.current && (
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ backgroundColor: 'white', margin: 20, borderRadius: 20 }} ><MRT_TablePagination table={tableInstanceRef.current} /></div>

                    </Toolbar>
                )}
            </Box>
            <NewOrder modal={modal} closeModal={closeModal} clients={clients} />
            <LeftClickMenu modal={details} closeModal={closeDetils} />
        </div>
    );
};

export default NewOrders;