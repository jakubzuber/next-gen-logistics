import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearWorkerFromRelese, deleteRelese, newRelese, setWorkerToRelese } from "./components/CallsToDatabase";

export const fetchReleses = createAsyncThunk('routes/fetchRelesesOrders', async () => {
    const response = await fetch('./apiFetchRelesesOrders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const relecesSlice = createSlice({
    name: 'releses',
    initialState: {
        releses: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        removeOrder: ({releses}, {payload: orderId}) => {
            const index = releses.findIndex(({ ID }) => ID === orderId)
            releses.splice(index, 1)
            deleteRelese(orderId)
        },
        clearWorker: ({releses}, {payload: orderId}) => {
            const index = releses.findIndex(({ ID }) => ID === orderId)
            releses[index].OBSLUGA = null
            clearWorkerFromRelese(orderId)
        },
        assignWhWorker: ({releses}, { payload: state}) => {
            const index = releses.findIndex(({ ID }) => ID === state.id)
            releses[index].OBSLUGA = state.worker
            setWorkerToRelese({id: state.id, worker: state.worker}) 
        },
        addRelese: ({ releses }, { payload: state }) => {
            releses.push(state.order)
            newRelese({newOrder: state.order, data: state.details})
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchReleses.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchReleses.fulfilled, (state, action) => {
            state.releses = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchReleses.rejected, (state, action) => {
            state.releses = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const { 
    removeOrder,
    clearWorker,
    assignWhWorker,
    addRelese
} = relecesSlice.actions;

export const selectReleses = state => state.releses

export default relecesSlice.reducer;