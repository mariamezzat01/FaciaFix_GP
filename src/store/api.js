// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCurrentPatient } from './slices/patient';
import { setCurrentDoctor } from './slices/doctor';
import { setToken } from "../store/slices/token";
import Axios from '../Network/axios';

export const register = async (formData, dispatch,navigation,setError,setModalVisible,setText,setLoading) => {
    setLoading(true);
    const registerResponse = await Axios.post('/register/', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    });
    console.log("registerResponse",registerResponse);
    // await AsyncStorage.setItem('user', JSON.stringify(registerResponse.data));
    if (registerResponse.status === 200 || registerResponse.status === 201) {
      if(registerResponse.data.title === 'patient'){
        dispatch(setCurrentPatient(registerResponse.data));
        dispatch(setToken(registerResponse.data.key));
        console.log('registerResponse',registerResponse.data)
        await AsyncStorage.setItem('userType', 'patient'); 
        await AsyncStorage.setItem('patient', JSON.stringify(registerResponse.data));
        navigation.replace("PatientsScreens");
      } else {
        dispatch(setCurrentDoctor(registerResponse.data));
        dispatch(setToken(registerResponse.data.key));
        await AsyncStorage.setItem('userType', 'doctor'); 
        await AsyncStorage.setItem('doctor', JSON.stringify(registerResponse.data));
        navigation.replace("DoctorsScreen");       
      }
      setLoading(false);
    } else {
      setError(true);
      setModalVisible(true);
      setText('Registeration failed, Please try again later.');
      setLoading(false);
  }
};

export const login = async (formData, dispatch,navigation,setModalVisible,setError,setText,setLoading) => {
    setLoading(true);
    const loginResponse =  await Axios.post("/login/", formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    });
    console.log("loginResponse",loginResponse);
    if (loginResponse.status === 200 || loginResponse.status === 201) {
      if(loginResponse.data.title === 'patient'){
        dispatch(setCurrentPatient(loginResponse.data));
        dispatch(setToken(loginResponse.data.key));
        console.log('loginResponse',loginResponse.data)
        await AsyncStorage.setItem('userType', 'patient'); 
        await AsyncStorage.setItem('patient', JSON.stringify(loginResponse.data));
        navigation.replace("PatientsScreens");
      } else {
        dispatch(setCurrentDoctor(loginResponse.data));
        dispatch(setToken(loginResponse.data.key));
        await AsyncStorage.setItem('userType', 'doctor'); 
        await AsyncStorage.setItem('doctor', JSON.stringify(loginResponse.data));
        navigation.replace("DoctorsScreen");
      }
      setLoading(false);
    }
    else{
      setError(true);
      setModalVisible(true);
      setText('Login failed. Please check your credentials.');
      setLoading(false);
    }
};
// formData, dispatch,navigation,setModalVisible,setError,setText,setLoading
export const logout = async (user,setUser,token,dispatch) => {
  const responseLogout = await Axios.post('/dj-rest-auth/logout/',{token});
  console.log("responseLogout",responseLogout);

  if (user === 'patient'){
    await AsyncStorage.removeItem('patient');
    await AsyncStorage.clear();
  } else {
    await AsyncStorage.removeItem('doctor');
    await AsyncStorage.clear();
  }

  dispatch(setUser(null));
  return true;
};
