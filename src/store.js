import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './OrdersList/ordersSlice';

export default configureStore({
    reducer: {
        orders: ordersReducer,
    },
});