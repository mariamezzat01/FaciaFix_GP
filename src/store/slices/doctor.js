import { createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        currentDoctor: null,

    },
    reducers: {
        setCurrentDoctor: (state, action) => {
        state.currentDoctor = action.payload;
        },

    },
});  

export const { setCurrentDoctor} = doctorSlice.actions;

export const currentDoctor = state => state.doctor.currentDoctor;

export default doctorSlice.reducer;
