import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStocks = createAsyncThunk('routes/fetchStocks', async () => {
    const response = await fetch('./apiFetchStocks', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
    })
    const data = response.json()
    return data
});

const stocksSlice = createSlice({
    name: 'stocks',
    initialState: {
        stocks: [],
        loading: false | true,
        error: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchStocks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchStocks.fulfilled, (state, action) => {
            state.stocks = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchStocks.rejected, (state, action) => {
            state.stocks = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectStocks = state => state.stocks

export default stocksSlice.reducer;