import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHistoryDetailsReleases = createAsyncThunk('routes/fetchHistoryDetailsReleasesApi', async () => {
    const response = await fetch('./fetchHistoryDetailsReleases', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const historyReleasesDetailsSlice = createSlice({
    name: 'histReleasesDetails',
    initialState: {
        histReleasesDetails: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchHistoryDetailsReleases.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchHistoryDetailsReleases.fulfilled, (state, action) => {
            state.histReleasesDetails = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchHistoryDetailsReleases.rejected, (state, action) => {
            state.histReleasesDetails = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectHistOrdersDetails = state => state.histReleasesDetails

export default historyReleasesDetailsSlice.reducer;