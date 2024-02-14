import { SET_DOCTOR, SET_PATIENT, SET_TOKEN } from "./actions";

const initialState = {
    patient:null,
    // doctor:null,
    token:null,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PATIENT:
            return { ...state, patient: action.payload };
        // case SET_DOCTOR:
        //     return{...state, doctor: action.payload}    
        case SET_TOKEN:
            return{...state, token: action.payload}    
        default:
            return state;
    }
}

export default userReducer;