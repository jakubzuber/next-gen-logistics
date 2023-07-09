import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteClient } from "./components/CallsToDatabase";

export const fetchClients = createAsyncThunk('routes/getClientsApi', async () => {
    const response = await fetch('./getClients', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const clientsSliceList = createSlice({
    name: 'clientsList',
    initialState: {
        clientsList: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        deleteCli: ({clientsList}, {payload: clientId}) => {
            const index = clientsList.findIndex(({ ID }) => ID === clientId)
            clientsList.splice(index, 1)
            deleteClient(clientId)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchClients.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.clientsList = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchClients.rejected, (state, action) => {
            state.clientsList = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { 
    deleteCli
} = clientsSliceList.actions;
export const selectClientsList = state => state.clientsList

export default clientsSliceList.reducer;