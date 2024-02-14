import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        currentDoctor: null,
        // loading: false,
        // error: null,
    },
    reducers: {
        setCurrentDoctor: (state, action) => {
        state.currentDoctor = action.payload;
        },
        // setLoading: (state, action) => {
        // state.loading = action.payload;
        // },
        // setError: (state, action) => {
        // state.error = action.payload;
        // },
    },
});  

// export const { setCurrentDoctor, setLoading, setError } = doctorSlice.actions;

export const { setCurrentDoctor} = doctorSlice.actions;

export const currentDoctor = state => state.doctor.currentDoctor;

export default doctorSlice.reducer;
