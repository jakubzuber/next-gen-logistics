import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOrder, clearWorkerFromOrder, setWorkerToOrder } from "./components/CallsToDatabase";

export const fetchNewOrders = createAsyncThunk('routes/fetchNewOrders', async () => {
    const response = await fetch('./apiFetchNewOrders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const newOrdersSlice = createSlice({
    name: 'newOrders',
    initialState: {
        newOrders: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        removeOrder: ({newOrders}, {payload: orderId}) => {
            const index = newOrders.findIndex(({ ID }) => ID === orderId)
            newOrders.splice(index, 1)
            deleteOrder(orderId)
        },
        clearWorker: ({newOrders}, {payload: orderId}) => {
            const index = newOrders.findIndex(({ ID }) => ID === orderId)
            newOrders[index].OBSLUGA = null
            clearWorkerFromOrder(orderId)
        },
        assignWhWorker: ({newOrders}, { payload: state}) => {
            console.log(state)
            const index = newOrders.findIndex(({ ID }) => ID === state.id)
            newOrders[index].OBSLUGA = state.worker
            setWorkerToOrder({id: state.id, worker: state.worker}) 
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchNewOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNewOrders.fulfilled, (state, action) => {
            state.newOrders = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchNewOrders.rejected, (state, action) => {
            state.newOrders = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const { 
    removeOrder,
    clearWorker,
    assignWhWorker
} = newOrdersSlice.actions;

export const selectNewOrders = state => state.newOrders

export default newOrdersSlice.reducer;