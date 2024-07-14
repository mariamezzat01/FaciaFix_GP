/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

// import React from 'react';
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import RegisterScreen2Doctors from './src/Screens/RegisterScreen2Doctors';
import RegisterScreen2Patients from './src/Screens/RegisterScreen2Patients';
import PatientsHomeScreen from './src/Screens/PatientsScreens/PatientsHomeScreen.js';
import PatientsEditProfile from './src/Screens/PatientsScreens/PatientsEditProfile.js';
import NewScanScreen from './src/Screens/PatientsScreens/NewScan.js';
import PatientResults from './src/Screens/PatientsScreens/PatientResults.js';
import Assessment from './src/Screens/PatientsScreens/Assessment.js';
import Progress from './src/Screens/PatientsScreens/Progress.js';
import DoctorsEditProfile from './src/Screens/DoctorsScreens/DoctorsEditProfile.js';
import PatientsData from './src/Screens/DoctorsScreens/PatientsData.js';
import DoctorListScreen from './src/Screens/PatientsScreens/doctorListScreen.js';
import DoctorsHomeScreen from './src/Screens/DoctorsScreens/doctorsHomeScreen.js';
import DoctorAssessment from './src/Screens/DoctorsScreens/DoctorAssessment.js';
import Patients from './src/Screens/DoctorsScreens/Patients';
import DoctorsProgress from './src/Screens/DoctorsScreens/DoctorsProgress.js';
import { Provider } from 'react-redux';
import store from './src/store/store';

// Parse.setAsyncStorage(AsyncStorage);

// const PARSE_APPLICATION_ID = 'YOUR_PARSE_APPLICATION_ID';
// const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
// const PARSE_JAVASCRIPT_ID = 'YOUR_PARSE_JAVASCRIPT_ID';
// Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
// Parse.serverURL = PARSE_HOST_URL;


const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen2Doctors"
        component={RegisterScreen2Doctors}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen2Patients"
        component={RegisterScreen2Patients}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    
  );
};

const PatientsScreens = () => {
  return (
    <Stack.Navigator initialRouteName="PatientsHomeScreen">
      <Stack.Screen
        name="PatientsHomeScreen"
        component={PatientsHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
      name="PatientsEditProfile"
      component={PatientsEditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientResults"
        component={PatientResults}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Assessment"
        component={Assessment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Progress"
        component={Progress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewScanScreen"
        component={NewScanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};


const DoctorsScreen = () => {
  return (
    <Stack.Navigator initialRouteName="DoctorsHomeScreen">
      <Stack.Screen
        name="DoctorsEditProfile"
        component={DoctorsEditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorsHomeScreen"
        component={DoctorsHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientsData"
        component={PatientsData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Patients"
        component={Patients}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorAssessment"
        component={DoctorAssessment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorsProgress"
        component={DoctorsProgress}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{headerShown: false}}
          />
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="PatientsScreens"
            component={PatientsScreens}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DoctorsScreen"
            component={DoctorsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
