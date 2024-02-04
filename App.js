// import React from 'react';
// import LoginScreen from './src/Screens/login';

// const App = () => {
//   return <LoginScreen />;
// };

// export default App;

//...................................... start of new code....................................................

// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import RegisterScreen2Doctors from './src/Screens/RegisterScreen2Doctors';
import RegisterScreen2Patients from './src/Screens/RegisterScreen2Patients';
import PatientsHomeScreen from './src/Screens/PatientsHomeScreen';
import DrawerNavigationRoutes from './src/Screens/DrawerNavigationRoutes';
import PatientsEditProfile from './src/Screens/PatientsEditProfile';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
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
    </Stack.Navigator>
  );
};

const App = () => {
  return (
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
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;