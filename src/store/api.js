// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setLoading, setError } from './authSlice';

// Replace this with your actual API endpoint
const API_ENDPOINT = 'http://your-api-endpoint';

export const signup = async (userData, dispatch) => {
  try {
    dispatch(setLoading(true));

    // Perform API request for signup and handle response
    // ...

    // Assuming a successful signup, save user data to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    dispatch(setUser(userData));
  } catch (error) {
    dispatch(setError('Signup failed. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = async (userData, dispatch) => {
  try {
    dispatch(setLoading(true));

    // Perform API request for login and handle response
    // ...

    // Assuming a successful login, save user data to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    dispatch(setUser(userData));
  } catch (error) {
    dispatch(setError('Login failed. Please check your credentials.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Perform API request for logout and handle response
    // ...

    // Remove user data from AsyncStorage
    await AsyncStorage.removeItem('user');

    dispatch(setUser(null));
  } catch (error) {
    dispatch(setError('Logout failed. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};
