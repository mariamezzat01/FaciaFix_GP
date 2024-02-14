import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import patientSlice from'./slices/patient';
import docSlice from './slices/doctor';

const store = configureStore({
  reducer: {
    patient: patientSlice,
    doctor: docSlice,
  },
  middleware: [...getDefaultMiddleware(), thunk],
  // middleware: [thunk],
});

export default store;