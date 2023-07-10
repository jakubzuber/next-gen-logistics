import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHistoryReleases = createAsyncThunk('routes/fetchHistoryReleasesApi', async () => {
    const response = await fetch('./fetchHistoryReleases', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const historyReleasesSlice = createSlice({
    name: 'histReleases',
    initialState: {
        histReleases: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchHistoryReleases.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchHistoryReleases.fulfilled, (state, action) => {
            state.histReleases = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchHistoryReleases.rejected, (state, action) => {
            state.histReleases = []
            state.loading = false
            state.error = action.error.message
        })
    }
});

export const selectHistOrders = state => state.histReleases

export default historyReleasesSlice.reducer;