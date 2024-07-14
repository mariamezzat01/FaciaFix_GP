import { createSlice } from '@reduxjs/toolkit';


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
        state.token = action.payload;
        },
    },
});  

export const {setToken} = tokenSlice.actions;

export const defaultToken = state => state.token.token;

export default tokenSlice.reducer;
