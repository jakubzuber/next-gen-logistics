/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import { fetchWhCarriers, selectWhCarriers } from "./whCarriersSlice";
import { MenuItem } from "@mui/material";
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import React, { useReducer, useRef, useState, useEffect, useMemo } from 'react';
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

const WhCarriers = () => {
    const dispatch = useDispatch();
    const { whCarriers } = useSelector(selectWhCarriers);
    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const rerender = useReducer(() => ({}), {})[1];

    const [columnVisibility, setColumnVisibility] = useState({});
    const [density, setDensity] = useState('comfortable');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [showColumnFilters, setShowColumnFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchWhCarriers())
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'ID',
                header: 'Id',
                size: 200,
            },
            {
                accessorKey: 'KOD_KRESKOWY',
                header: 'Kod kreskowy',
                size: 300,
            },
            {
                accessorKey: 'OPIS',
                header: 'Opis',
                size: 700,
            },
        ],
        [],
    );

    return (
        <Box sx={{ borderRadius: '7px', backgroundColor: '#1a1e75' }}>
            {tableInstanceRef.current && (
                <>
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
                        })}
                    >
                        <div style={{ backgroundColor: 'white', borderRadius: '7px' }} ><MRT_GlobalFilterTextField table={tableInstanceRef.current} /></div>
                        <Box>
                            <MRT_ToggleFiltersButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                            <MRT_ShowHideColumnsButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                            <MRT_ToggleDensePaddingButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                            <MRT_FullScreenToggleButton sx={{ color: 'white' }} table={tableInstanceRef.current} />
                        </Box>
                    </Toolbar>
                    <Box sx={{ display: 'grid', width: '100%' }}>
                        <MRT_ToolbarAlertBanner
                            stackAlertBanner
                            table={tableInstanceRef.current}
                        />
                    </Box>
                </>
            )}
            <MaterialReactTable
                localization={MRT_Localization_PL}
                columns={columns}
                data={whCarriers}
                enableColumnOrdering={false}
                enableBottomToolbar={false}
                muiTableBodyRowProps={{ hover: false, sx: { backgroundColor: '#161b70', color: 'white', ":hover": { backgroundColor: '#11189b' } } }}
                muiTableBodyProps={{ sx: { backgroundColor: '#161b70', color: 'white' } }}
                muiTableBodyCellProps={{ sx: { color: 'white' } }}
                muiTableHeadRowProps={{ sx: { backgroundColor: '#161b70' } }}
                muiTableHeadCellProps={{ sx: { color: 'white' } }}
                muiSelectCheckboxProps={{ sx: { color: 'white' } }}
                muiSelectAllCheckboxProps={{ sx: { color: 'white' } }}
                muiTableHeadCellColumnActionsButtonProps={{ sx: { color: 'white' } }}
                muiTableHeadCellFilterTextFieldProps={{sx: {backgroundColor: 'white', borderRadius: '7px', padding: '2px'}}}
                enableRowActions
                renderRowActionMenuItems={({ row }) => [
                    <MenuItem key="wydrukuj" onClick={() => console.info('Edit')}>
                        Wydrukuj
                    </MenuItem>,
                    <MenuItem key="usun" onClick={() => console.info('Delete')}>
                        Usuń
                    </MenuItem>,
                ]}
                enableRowSelection
                enableTopToolbar={false}
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
    );
};

export default WhCarriers;

