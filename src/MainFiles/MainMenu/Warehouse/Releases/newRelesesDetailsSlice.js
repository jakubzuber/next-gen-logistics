import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchNewRelesesDetails = createAsyncThunk('routes/FetchNewRelesesDetails', async () => {
    const response = await fetch('./apiFetchNewRelesesDetails', {
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
    name: 'newRelesesDetails',
    initialState: {
        newRelesesDetails: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchNewRelesesDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNewRelesesDetails.fulfilled, (state, action) => {
            state.newRelesesDetails = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchNewRelesesDetails.rejected, (state, action) => {
            state.newRelesesDetails = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const selectNewRelesesDetails = state => state.newRelesesDetails

export default newOrdersDetailsSlice.reducer;