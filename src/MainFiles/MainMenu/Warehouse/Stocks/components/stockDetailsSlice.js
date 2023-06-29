import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStocksDetails = createAsyncThunk('routes/fetchStocksDetails', async (kodProduktu) => {
    const response = await fetch('./apiFetchStocksDetails', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            kod: kodProduktu
        })
    })
    const data = response.json()
    return data
});

const stocksDetailsSlice = createSlice({
    name: 'stocksDetails',
    initialState: {
        stocksDetails: [],
        loading: false | true,
        error: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchStocksDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchStocksDetails.fulfilled, (state, action) => {
            state.stocksDetails = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchStocksDetails.rejected, (state, action) => {
            state.stocksDetails = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectStockDetails = state => state.stocksDetails
export const selectStockLoading = state => state.stocksDetails.loading

export default stocksDetailsSlice.reducer;