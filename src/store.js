import { configureStore } from "@reduxjs/toolkit";
import newOrdersSlice from './MainFiles/MainMenu/Warehouse/NewOrders/newOrdersSlice';
import newOrdersDetailsSlice from "./MainFiles/MainMenu/Warehouse/NewOrders/newOrdersDetailsSlice";
import clientsSlice from "./MainFiles/MainMenu/Slices/clientsSlice";
import whPlacesSlice from "./MainFiles/MainMenu/Administration/WhPlaces/whPlacesSlice";
import whCarriersSlice from "./MainFiles/MainMenu/Administration/WhCarriers/whCarriersSlice";

export default configureStore({
    reducer: {
        newOrders: newOrdersSlice,
        newOrdersDetails: newOrdersDetailsSlice,
        clients: clientsSlice,
        whPlaces: whPlacesSlice,
        whCarriers: whCarriersSlice,
    }
});