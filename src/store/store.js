// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import authReducer from './authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   middleware: [thunk],
// });

// export default store;

// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;