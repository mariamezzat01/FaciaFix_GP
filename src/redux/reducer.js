import { SET_DOCTOR, SET_PATIENT } from "./actions";

const initialState = {
    patient:null,
    doctor:null,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PATIENT:
            return { ...state, patient: action.payload };
        case SET_DOCTOR:
            return{...state, doctor: action.payload}    
        default:
            return state;
    }
}

export default userReducer;