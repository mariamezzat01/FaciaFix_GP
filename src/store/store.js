import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import patientSlice from'./slices/patient';
import doctorSlice from './slices/doctor';
import tokenSlice from './slices/token';

const store = configureStore({
  reducer: {
    patient: patientSlice,
    // doctor: doctorSlice,
    token : tokenSlice,
  },
  // middleware: [...getDefaultMiddleware(), thunk],
  // middleware: [thunk],
});

export default store;