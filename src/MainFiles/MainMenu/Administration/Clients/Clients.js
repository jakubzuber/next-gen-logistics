/* eslint-disable */
import React, { useReducer, useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FunctionButtons, StyledButton, Topic } from "../../styled";
import { MenuItem, Box, Toolbar } from "@mui/material";
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { deleteCli, fetchClients, selectClientsList } from './clientsSliceList';
import NewClient from './components/NewClient';

const Clients = () => {
    const dispatch = useDispatch();
    const { clientsList } = useSelector(selectClientsList);
    const [modal, setModal] = useState(false);

    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const rerender = useReducer(() => ({}), {})[1];
    const [columnVisibility, setColumnVisibility] = useState({});
    const [density, setDensity] = useState('compact');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [showColumnFilters, setShowColumnFilters] = useState(false);

    //new client modal
    useEffect(() => {
        dispatch(fetchClients())
    }, [dispatch]);

    const toggleModal = () => {
        setModal(!modal)
    };

    const closeModal = () => {
        setModal(false)
    };

    // modal for created clients
    const initialDetails = {
        show: false,
        kod: null,
    };

    const [details, setDetails] = useState(initialDetails);
    
    const openDetials = ({ idCient }) => {
        setDetails({ show: true, kod: idCient })
        console.log(details)
        //dispatch(fetchStocksDetails(kodProduktu))
    };

    const closeDetils = () => {
        setDetails({ show: false, kod: null })
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'ID',
                header: 'Id',
                size: 50,
            },
            {
                accessorKey: 'SYMBOL',
                header: 'Symbol',
                size: 100,
            },
            {
                accessorKey: 'NAZWA',
                header: 'Nazwa',
                size: 200,
            },
            {
                accessorKey: 'NIP',
                header: 'Nip',
                size: 100,
            },
            {
                accessorKey: 'KOD_POCZTOWY',
                header: 'Kod pocztowy',
                size: 100,
            },
            {
                accessorKey: 'MIEJSCOWOSC',
                header: 'Miejscowość',
                size: 100,
            },
            {
                accessorKey: 'ADRES',
                header: 'Adres',
                size: 100,
            },
            {
                accessorKey: 'KRAJ',
                header: 'Kraj',
                size: 100,
            },
            {
                accessorKey: 'ADRES_EMAIL',
                header: 'Email',
                size: 100,
            },
            {
                accessorKey: 'TELEFON',
                header: 'Tel.',
                size: 100,
            },
        ],
        [],
    );

    return (
        <>
            <Topic>MIEJSCA MAGAZYNOWE</Topic>
            <FunctionButtons>
                <StyledButton
                    onClick={() => toggleModal()}>
                    Nowy klient
                </StyledButton>
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
                    data={clientsList}
                    enableColumnOrdering={false}
                    enableBottomToolbar={false}
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => {openDetials({ idCient: row.original.ID })},
                        hover: false,
                        sx: { backgroundColor: '#1266d4', color: 'white', cursor: 'pointer', ":hover": { backgroundColor: '#1457ad' } }
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
                    enableColumnResizing
                    positionActionsColumn={'last'}
                    renderRowActionMenuItems={({ row, closeMenu }) => [
                        <MenuItem key="usun" onClick={() => {dispatch(deleteCli(row.original.ID)), closeMenu()}}>
                            Usuń
                        </MenuItem>
                    ]}
                    enableRowSelection
                    getRowId={(row) => row.KOD}
                    enableTopToolbar={false}
                    icons={{
                        MoreHorizIcon: (props) => <MoreHorizIcon sx={{ color: 'white' }} {...props} />
                    }}
                    initialState={{ showGlobalFilter: true }}
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
            <NewClient modal={modal} closeModal={closeModal} />
        </>
    );
};

export default Clients;