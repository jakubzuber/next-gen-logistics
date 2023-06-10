import { configureStore } from "@reduxjs/toolkit";
import newOrdersSlice from './MainFiles/MainMenu/Warehouse/NewOrders/newOrdersSlice';
import newOrdersDetailsSlice from "./MainFiles/MainMenu/Warehouse/NewOrders/newOrdersDetailsSlice";
import clientsSlice from "./MainFiles/MainMenu/Slices/clientsSlice"

export default configureStore({
    reducer: {
        newOrders: newOrdersSlice,
        newOrdersDetails: newOrdersDetailsSlice,
        clients: clientsSlice
    }
});