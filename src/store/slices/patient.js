import { createSlice } from '@reduxjs/toolkit';


const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        currentPatient: null,
        // loading: false,
        // error: null,
    },
    reducers: {
        setCurrentPatient: (state, action) => {
        state.currentPatient = action.payload;
        },
        // setLoading: (state, action) => {
        // state.loading = action.payload;
        // },
        // setError: (state, action) => {
        // state.error = action.payload;
        // },
    },
});  

// export const { setCurrentPatient, setLoading, setError } = patientSlice.actions;

export const { setCurrentPatient} = patientSlice.actions;

export const currentPatient = state => state.patient.currentPatient;

export default patientSlice.reducer;
