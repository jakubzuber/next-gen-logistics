import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCarrier } from './components/CallsToDatabase';

export const fetchWhCarriers = createAsyncThunk('routes/getWhCarriers', async () => {
    const response = await fetch('./apiGetWhCarriers', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const whPlacesCarriers = createSlice({
    name: 'whCarriers',
    initialState: {
        whCarriers: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        removeCarrier: ({whCarriers}, {payload: carrierId}) => {
            const index = whCarriers.findIndex(({ ID }) => ID === carrierId)
            whCarriers.splice(index, 1)
            deleteCarrier(carrierId)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchWhCarriers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchWhCarriers.fulfilled, (state, action) => {
            state.whCarriers = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchWhCarriers.rejected, (state, action) => {
            state.whCarriers = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { 
    removeCarrier
} = whPlacesCarriers.actions;

export const selectWhCarriers = state => state.whCarriers

export default whPlacesCarriers.reducer;