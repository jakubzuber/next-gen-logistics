/* eslint-disable */
import { useReducer, useRef, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchStocks, selectStocks } from "./stocksSlice";
import { Topic, FunctionButtons } from "../../styled";
import LeftClickMenu from './components/LeftClickMenu';
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

const Stocks = () => {
    
    const dispatch = useDispatch();
    const { stocks } = useSelector(selectStocks);

    //table options

    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const rerender = useReducer(() => ({}), {})[1];
    const [columnVisibility, setColumnVisibility] = useState({});
    const [density, setDensity] = useState('compact');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [showColumnFilters, setShowColumnFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchStocks())
    }, [dispatch])

    // modal functions (detals of order)
    const initialDetails = {
        show: false,
        kod: null,
    };

    const [details, setDetails] = useState(initialDetails);
    
    const openDetials = ({ kodProduktu }) => {
        setDetails({ show: true, kod: kodProduktu })
    };

    const closeDetils = () => {
        setDetails({ show: false, kod: null })
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'KOD_PRODUKTU',
                header: 'Kod produktu',
                size: 70,
            },
            {
                accessorKey: 'NAZWA_PRODUKTU',
                header: 'Nazwa produktu',
                size: 100,
            },
            {
                accessorKey: 'KLIENT_NAZWA',
                header: 'Klient',
                size: 100,
            },
            {
                accessorKey: 'ILOSC',
                header: 'Ilosc',
                size: 30,
            },
            {
                accessorKey: 'W_TRAKCIE',
                header: 'Obsługa',
                size: 30,
            },
            {
                accessorKey: 'KOD_KRESKOWY',
                header: 'Kod kreskowy',
                size: 100,
            },
        ],
        [],
    );


    return (
        <div>
            <Topic>STANY MAGAZYNOWE</Topic>
            <FunctionButtons>
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
                    data={stocks}
                    enableColumnOrdering={false}
                    enableBottomToolbar={false}
                    enableColumnResizing
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => {openDetials({ kodProduktu: row.original.KOD_PRODUKTU })},
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
                    options={{ actionsCellStyle: { display: "flex", justifyContent: "center", backgroundColor: 'red' } }}
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
            <LeftClickMenu modal={details} closeModal={closeDetils} />
        </div>
    );
};

export default Stocks;