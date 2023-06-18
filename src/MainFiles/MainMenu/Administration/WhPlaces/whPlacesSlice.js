import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletePlace } from "./components/CallsToDatabase";

export const fetchWhPlaces = createAsyncThunk('routes/getWhPlaces', async () => {
    const response = await fetch('./apiGetWhPlaces', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const whPlacesSlice = createSlice({
    name: 'whPlaces',
    initialState: {
        whPlaces: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        removePlace: ({whPlaces}, {payload: placeId}) => {
            const index = whPlaces.findIndex(({ ID }) => ID === placeId)
            whPlaces.splice(index, 1)
            deletePlace(placeId)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchWhPlaces.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchWhPlaces.fulfilled, (state, action) => {
            state.whPlaces = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchWhPlaces.rejected, (state, action) => {
            state.whPlaces = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { 
    removePlace
} = whPlacesSlice.actions;

export const selectWhPlaces = state => state.whPlaces

export default whPlacesSlice.reducer;