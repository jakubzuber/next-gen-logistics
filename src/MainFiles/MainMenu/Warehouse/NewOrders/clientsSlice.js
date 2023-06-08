import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchClients = createAsyncThunk('routes/fetchClients', async () => {
    const response = await fetch('./fetchClients', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: [],
        loading: false | true,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchClients.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.clients = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchClients.rejected, (state, action) => {
            state.clients = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const selectClients = state => state.clients

export default clientsSlice.reducer;