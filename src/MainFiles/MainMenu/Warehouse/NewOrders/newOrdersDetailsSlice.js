import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchNewOrdersDetails = createAsyncThunk('routes/fetchNewOrdersDetails', async () => {
    const response = await fetch('./apiFetchNewOrdersDetails', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const newOrdersDetailsSlice = createSlice({
    name: 'newOrdersDetails',
    initialState: {
        newOrdersDetails: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchNewOrdersDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNewOrdersDetails.fulfilled, (state, action) => {
            state.newOrdersDetails = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchNewOrdersDetails.rejected, (state, action) => {
            state.newOrders = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const selectNewOrdersDetails = state => state.newOrdersDetails

export default newOrdersDetailsSlice.reducer;