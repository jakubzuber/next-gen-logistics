import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHistoryDetailsOrders = createAsyncThunk('routes/fetchHistoryDetailsOrdersApi', async () => {
    const response = await fetch('./fetchHistoryDetailsOrders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const historyOrdersDetailsSlice = createSlice({
    name: 'histOrderDetails',
    initialState: {
        histOrderDetails: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchHistoryDetailsOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchHistoryDetailsOrders.fulfilled, (state, action) => {
            state.histOrderDetails = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchHistoryDetailsOrders.rejected, (state, action) => {
            state.histOrderDetails = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectHistOrdersDetails = state => state.histOrderDetails

export default historyOrdersDetailsSlice.reducer;