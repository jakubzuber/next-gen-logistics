/* eslint-disable */
import React, { useReducer, useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchWhCarriers, selectWhCarriers, removeCarrier } from "./whCarriersSlice";
import NewWhCarriers from "./components/NewWhCarriers";
import BarCodePrint from '../components/BarCodePrint';
import { MenuItem } from "@mui/material";
import { FunctionButtons, StyledButton, Topic } from "../../styled";
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
import ReactToPrint from 'react-to-print';


const WhCarriers = () => {
    const dispatch = useDispatch();
    const { whCarriers } = useSelector(selectWhCarriers);
    const [modal, setModal] = useState(false);
    let componentRef = useRef();

    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const rerender = useReducer(() => ({}), {})[1];
    const [columnVisibility, setColumnVisibility] = useState({});
    const [density, setDensity] = useState('compact');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [showColumnFilters, setShowColumnFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchWhCarriers())
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
                header: 'Kod kreskowy',
                size: 500,
            },
            {
                accessorKey: 'OPIS',
                header: 'Opis',
                size: 500,
            },
        ],
        [],
    );

    return (
        <>
            <Topic>NOŚNIKI</Topic>
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
                    Nowe nośniki
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
                    data={whCarriers}
                    enableColumnOrdering={false}
                    enableBottomToolbar={false}
                    muiTableBodyRowProps={{ hover: false, sx: { backgroundColor: '#1266d4', color: 'white' } }}
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
                        <MenuItem key="usun" onClick={() => {dispatch(removeCarrier(row.original.ID)), closeMenu()}}>
                            Usuń
                        </MenuItem>,
                    ]}
                    enableRowSelection
                    getRowId={(row) => row.KOD_KRESKOWY}
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
            <NewWhCarriers modal={modal} closeModal={closeModal} />
            <div style={{ display: 'none' }}>
                <div ref={(el) => (componentRef = el)}>
                    <BarCodePrint rowSelection={rowSelection} />
                </div>
            </div>
        </>
    );
};

export default WhCarriers;

