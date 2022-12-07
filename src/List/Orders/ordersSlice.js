import { createSlice } from "@reduxjs/toolkit";
import { exampleTasks } from "../../exampleOrders";

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: exampleTasks
    },
    reducers: {
        addOrder: ({ orders }, { payload: order }) => {
            orders.push(order)
        },
    },
});

export const { 
    addOrder
} = orderSlice.actions;

    export const selectOrders = state => state.orders;

    export default orderSlice.reducer;