import { createSlice } from '@reduxjs/toolkit';


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
        // loading: false,
        // error: null,
    },
    reducers: {
        setToken: (state, action) => {
        state.token = action.payload;
        },
        // setLoading: (state, action) => {
        // state.loading = action.payload;
        // },
        // setError: (state, action) => {
        // state.error = action.payload;
        // },
    },
});  

// export const { setToken, setLoading, setError } = tokenSlice.actions;

export const { setToken} = tokenSlice.actions;

export const defaultToken = state => state.token.token;

export default tokenSlice.reducer;
