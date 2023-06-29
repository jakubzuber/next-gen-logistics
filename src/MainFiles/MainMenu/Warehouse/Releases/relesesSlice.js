import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const selectReleses = state => state.releses

export default relecesSlice.reducer;