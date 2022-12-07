import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './List/Orders/ordersSlice';

export default configureStore({
    reducer: {
        orders: ordersReducer,
    },
});