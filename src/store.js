import { configureStore } from "@reduxjs/toolkit";
import newOrdersSlice from './MainFiles/MainMenu/Warehouse/NewOrders/newOrdersSlice';
import newOrdersDetailsSlice from "./MainFiles/MainMenu/Warehouse/NewOrders/newOrdersDetailsSlice";
import clientsSlice from "./MainFiles/MainMenu/Slices/clientsSlice";
import whPlacesSlice from "./MainFiles/MainMenu/Administration/WhPlaces/whPlacesSlice";
import whCarriersSlice from "./MainFiles/MainMenu/Administration/WhCarriers/whCarriersSlice";
import stocksSlice from "./MainFiles/MainMenu/Warehouse/Stocks/stocksSlice";
import stokcDetailsSlice from "./MainFiles/MainMenu/Warehouse/Stocks/components/stockDetailsSlice";
import relesesSlice from "./MainFiles/MainMenu/Warehouse/Releases/relesesSlice";


export default configureStore({
    reducer: {
        newOrders: newOrdersSlice,
        newOrdersDetails: newOrdersDetailsSlice,
        clients: clientsSlice,
        whPlaces: whPlacesSlice,
        whCarriers: whCarriersSlice,
        stocks: stocksSlice,
        stocksDetails: stokcDetailsSlice,
        releses: relesesSlice,
    }
});