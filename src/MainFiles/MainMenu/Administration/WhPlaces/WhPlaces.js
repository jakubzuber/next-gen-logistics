/* eslint-disable */
import React, { useReducer, useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchWhPlaces, selectWhPlaces, removePlace } from "./whPlacesSlice";
import NewWhPlace from "./components/NewWhPlace";
import BarCodePrint from '../components/BarCodePrint';
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
import ReactToPrint from 'react-to-print';

const WhPlaces = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { whPlaces } = useSelector(selectWhPlaces);
    let componentRef = useRef();

    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const rerender = useReducer(() => ({}), {})[1];
    const [columnVisibility, setColumnVisibility] = useState({});
    const [density, setDensity] = useState('compact');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [showColumnFilters, setShowColumnFilters] = useState(false);

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
                accessorKey: 'ID',
                header: 'Id',
                size: 50,
            },
            {
                accessorKey: 'KOD_KRESKOWY',
                header: 'Kod',
                size: 150,
            },
            {
                accessorKey: 'KOD',
                header: 'Kod kreskowy',
                size: 200,
            },
            {
                accessorKey: 'OPIS',
                header: 'Opis',
                size: 600,
            },
        ],
        [],
    );

    return (
        <>
            <Topic>MIEJSCA MAGAZYNOWE</Topic>
            <FunctionButtons>
                {Object.keys(rowSelection).length !== 0 &&
                    <ReactToPrint
                        trigger={() =>
                            <StyledButton>
                                Wydrukuj zaznaczone
                            </StyledButton>}
                        content={() => componentRef}
                    />
                }
                <StyledButton
                    onClick={() => toggleModal()}>
                    Nowe miejsca składowe
                </StyledButton>
            </FunctionButtons>
            <Box sx={{ borderRadius: '7px', backgroundColor: '#1a1e75' }}>
                {tableInstanceRef.current && (
                    <Toolbar
                        sx={(theme) => ({
                            backgroundColor: '#1a1e75',
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
                    data={whPlaces}
                    enableColumnOrdering={false}
                    enableBottomToolbar={false}
                    muiTableBodyRowProps={{ hover: false, sx: { backgroundColor: '#161b70', color: 'white' } }}
                    muiTableBodyProps={{ sx: { backgroundColor: '#161b70', color: 'white' } }}
                    muiTableBodyCellProps={{ sx: { color: 'white' } }}
                    muiTableHeadRowProps={{ sx: { backgroundColor: '#161b70' } }}
                    muiTableHeadCellProps={{ sx: { color: 'white' } }}
                    muiSelectCheckboxProps={{ sx: { color: 'white' } }}
                    muiSelectAllCheckboxProps={{ sx: { color: 'white' } }}
                    muiTableHeadCellColumnActionsButtonProps={{ sx: { color: 'white' } }}
                    muiTableHeadCellFilterTextFieldProps={{ sx: { backgroundColor: 'white', borderRadius: '7px', padding: '2px' } }}
                    enableRowActions
                    enableColumnResizing
                    positionActionsColumn={'last'}
                    renderRowActionMenuItems={({ row, closeMenu }) => [
                        <MenuItem key="usun" onClick={() => {dispatch(removePlace(row.original.ID)), closeMenu()}}>
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
            <NewWhPlace modal={modal} closeModal={closeModal} />
            <div style={{ display: 'none' }}>
                <div ref={(el) => (componentRef = el)}>
                    <BarCodePrint rowSelection={rowSelection} />
                </div>
            </div>
        </>
    );
};

export default WhPlaces;