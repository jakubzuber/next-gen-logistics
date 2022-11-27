import { createSlice } from "@reduxjs/toolkit";
import { exampleTasks } from "../exampleOrders";

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: exampleTasks
    },
    reducers: {

    },
});

    export const selectOrders = state => state.orders;

    export default orderSlice.reducer;