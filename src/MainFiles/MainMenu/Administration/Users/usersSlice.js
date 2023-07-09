import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "./components/CallsToDatabase";

export const fetchUsers = createAsyncThunk('routes/apiFetchUsers', async () => {
    const response = await fetch('./fetchUsers', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    return data
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false | true,
        error: ''
    },
    reducers: {
        deleteCli: ({users}, {payload: userId}) => {
            console.log(userId)
            const index = users.findIndex(({ ID }) => ID === userId)
            users.splice(index, 1)
            deleteUser(userId)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.users = []
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { 
    deleteCli
} = usersSlice.actions;

export const selectUsers = state => state.users

export default usersSlice.reducer;