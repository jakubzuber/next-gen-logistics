import { configureStore } from "@reduxjs/toolkit";
import newOrdersSlice from './MainFiles/MainMenu/Warehouse/NewOrders/newOrdersSlice'

export default configureStore({
    reducer: {
        newOrders: newOrdersSlice,
    }
});