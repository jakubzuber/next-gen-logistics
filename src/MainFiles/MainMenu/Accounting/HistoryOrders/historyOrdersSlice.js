import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHistoryOrders = createAsyncThunk('routes/fetchHistoryOrdersApi', async () => {
    const response = await fetch('./fetchHistoryOrders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const historyOrdersSlice = createSlice({
    name: 'histOrders',
    initialState: {
        histOrders: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchHistoryOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchHistoryOrders.fulfilled, (state, action) => {
            state.histOrders = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchHistoryOrders.rejected, (state, action) => {
            state.histOrders = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectHistOrders = state => state.histOrders

export default historyOrdersSlice.reducer;