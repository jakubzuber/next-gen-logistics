import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTransfers = createAsyncThunk('routes/fetchTransfers', async () => {
    const response = await fetch('./apiTransfers', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const transfersSlice = createSlice({
    name: 'transfers',
    initialState: {
        transfers: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchTransfers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTransfers.fulfilled, (state, action) => {
            state.transfers = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchTransfers.rejected, (state, action) => {
            state.transfers = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectTransfers = state => state.transfers

export default transfersSlice.reducer;