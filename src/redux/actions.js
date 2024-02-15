export const SET_PATIENT = 'SET_PATIENT';
export const SET_DOCTOR = 'SET_DOCTOR';
export const SET_TOKEN = 'SET_TOKEN';

export const setPatient = patient => dispatch => {
    dispatch({
        type: SET_PATIENT,
        payload: patient,
    });
};

// export const setDoctor = doctor => dispatch => {
//     dispatch({
//         type: SET_DOCTOR,
//         payload: doctor,
//     });
// };

export const setToken = token => dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
  };