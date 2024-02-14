export const SET_PATIENT = 'SET_PATIENT';
export const SET_DOCTOR = 'SET_DOCTOR';

export const setPatient = patient => dispatch => {
    dispatch({
        type: SET_PATIENT,
        payload: patient,
    });
};

export const setDoctor = doctor => dispatch => {
    dispatch({
        type: SET_DOCTOR,
        payload: doctor,
    });
};