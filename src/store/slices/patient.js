import { createSlice } from '@reduxjs/toolkit';


const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        currentPatient: null,
    },
    reducers: {
        setCurrentPatient: (state, action) => {
        state.currentPatient = action.payload;
        },
    },
});  

export const { setCurrentPatient} = patientSlice.actions;

export const currentPatient = state => state.patient.currentPatient;

export default patientSlice.reducer;
