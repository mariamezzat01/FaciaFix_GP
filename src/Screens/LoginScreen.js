/* eslint-disable prettier/prettier */
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

<<<<<<< Updated upstream
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../store/api';

// import Parse from 'parse/react-native';
// import {useNavigation} from '@react-navigation/native';

import Loader from './Components/loader';
=======
import Loader from '../Components/loader';
>>>>>>> Stashed changes
import {images, colors} from '../assets/assets';
import Input from '../assets/input';
import emailValidator from 'email-validator';

import Axios from '../Network/axios';
import {setCurrentPatient} from '../store/slices/patient';
import {setToken} from '../store/slices/token';
import {useSelector, useDispatch} from 'react-redux';

const LoginScreen = ({navigation}) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const patient = useSelector(state => state.patient);
  const dispatch = useDispatch();
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitPress = async () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    } else if (!emailValidator.validate(userEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    // Password validation
    if (!userPassword) {
      alert('Please fill Password');
      return;
    } else if (userPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    const formData = new FormData();
formData.append('userEmail', userEmail);
formData.append('userPassword', userPassword);


  
    setIsRegistraionSuccess(true);
      setLoading(true);
      const response = await Axios.post('/dj-rest-auth/login/', {email: userEmail,
        password: userPassword});
      // const response = await Axios.post('/dj-rest-auth/login/', formData);
      if ( response.status === 200) {
        dispatch(setDefaultUser(response.data));
        dispatch(setToken(response.data.token));
        // Axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Token ${response.data.token}`;
        navigation.navigate('PatientsHomeScreen');
        setIsRegistraionSuccess(false);
        setLoading(false);
        setUserEmail('');
        setUserPassword('');
      } else {
        console.log(response);
        console.log(errortext)
        setErrortext(response.data.errortext);
        setIsRegistraionSuccess(false);
        setLoading(false);
      }
      console.log(response);
      // console.log("token" , response.data.token);
    

    // const doUserLogIn = async function () {
    //   // Note that this values come from state variables that we've declared before
    //   const userEmailValue = userEmail;
    //   const passwordValue = userPassword;
    //   return await Parse.User.logIn(userEmailValue, passwordValue)
    //     .then(async (loggedInUser) => {
    //       // logIn returns the corresponding ParseUser object
    //       Alert.alert(
    //         'Success!',
    //         `User ${loggedInUser.get('username')} has successfully signed in!`,
    //       );
    //       // To verify that this is in fact the current user, currentAsync can be used
    //       const currentUser = await Parse.User.currentAsync();
    //       console.log(loggedInUser === currentUser);
    //       // Navigation.navigate takes the user to the screen named after the one
    //       // passed as parameter
    //       // navigation.navigate('Home');
    //       navigation.replace('Patients');
    //       return true;
    //     })
    //     .catch((error) => {
    //       // Error can be caused by wrong parameters or lack of Internet connection
    //       Alert.alert('Error!', error.message);
    //       return false;
    //     });
    // };

    // let dataToSend = {email: userEmail, password: userPassword};
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('http://localhost:3000/api/user/login', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type':
    //     'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       AsyncStorage.setItem('user_id', responseJson.data.email);
    //       console.log(responseJson.data.email);
    //       navigation.replace('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
    // setLoading(false);
    // navigation.replace('DrawerNavigationRoutes');
=======
    setIsRegistraionSuccess(true);
      setLoading(true);
      const response = await Axios.post('/dj-rest-auth/login/', {email: userEmail,
        password: userPassword});
      // const response = await Axios.post('/dj-rest-auth/login/', formData);
      if ( response.status === 200) {
        dispatch(setDefaultUser(response.data));
        dispatch(setToken(response.data.token));
        // Axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Token ${response.data.token}`;
        navigation.navigate('PatientsHomeScreen');
        setIsRegistraionSuccess(false);
        setLoading(false);
        setUserEmail('');
        setUserPassword('');
      } else {
        console.log(response);
        console.log(errortext)
        setErrortext(response.data.errortext);
        setIsRegistraionSuccess(false);
        setLoading(false);
      }
      console.log(response);
>>>>>>> Stashed changes
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.upperSection}>
          <Image source={images.upperImage} style={styles.roundedImage} />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.lowerSection}>
            <View
              style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
              <Text style={styles.header}>Login to your Account</Text>
              <Input
                label="Email Address"
                imageSource={images.mailIcon}
                value={userEmail}
                onChangeText={email => setUserEmail(email)}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  console.log('onSubmitEditing called');
                  passwordInputRef.current && passwordInputRef.current.focus();
                }}
                returnKeyType="next"
              />
              {/* <Text style ={styles.label}>
                Email Address
            </Text>
            <View style={styles.inputBar}>
                <Image
                source={images.mailIcon}
                style={styles.icon}
                />
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                    setUserEmail(UserEmail)
                }
                placeholder="Enter your Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                />
            </View> */}
              {/* <Input
                label="Password"
                imageSource={images.passwordIcon}
                PasswordShown={isPasswordShown}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter your Password"
                keyboardType="default"
                autoCapitalize="none"
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry={isPasswordShown}
                returnKeyType="next"
                ref={passwordInputRef}
                Password={{
                    onPress:() => setIsPasswordShown(!isPasswordShown),
                    content:
                        isPasswordShown == false ? (
                            <Image
                            source={images.eyeClosedIcon}
                            style={styles.icon}
                        />
                        ) : (
                            <Image
                            source={images.eyeOpenIcon}
                            style={styles.icon}
                        />
                        )
                    ,
                }}
            /> */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputBar}>
                <Image source={images.passwordIcon} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  value={userPassword}
                  onChangeText={password => setUserPassword(password)}
                  placeholder="Enter your Password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={isPasswordShown}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: 'absolute',
                    right: 12,
                  }}>
                  {isPasswordShown == false ? (
                    <Image source={images.eyeClosedIcon} style={styles.icon} />
                  ) : (
                    <Image source={images.eyeOpenIcon} style={styles.icon} />
                  )}
                </TouchableOpacity>
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                {/* onPress={() => navigation.navigate('PatientsHomeScreen')}> */}
                <Text style={styles.buttonTextStyle}>Login</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                Don’t have an account? <Text style={styles.a}>Create one</Text> 
            </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: colors.white,
        alignContent: 'center',
    },
    upperSection:{
        margin:0,
    },
    roundedImage:{
        width: '100%' ,
        height: 275,
        borderBottomLeftRadius:60,
    },
    lowerSection:{
        backgroundColor: colors.blueLogo,
    },
    header:{
        marginTop: 30,
        marginLeft: 35,
        marginRight: 35,
        color: colors.darkBlue,
        fontSize: 23,
        fontWeight:"500",
    },
    label:{
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        color: colors.gray1,
        fontSize: 16,
    },
    inputBar: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderWidth:1,
        borderRadius: 12,
        borderColor: colors.borderColor,
    },
    icon:{
        width:20,
        height:20,
        margin: 8,
        marginRight:10,
        marginLeft:10,
    },
    inputStyle: {
        flex: 1,
        color: colors.darkBlue,
    },
    buttonStyle: {
        backgroundColor: colors.green,
        color: colors.white,
        width: 350,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: colors.white,
        paddingVertical: 10,
        fontSize: 16,
    },
    registerTextStyle: {
        color: colors.gray2,
        textAlign: 'center',
        fontSize: 16,
        alignSelf: 'center',
        marginBottom:20,
    },
    a:{
        fontWeight: 'bold',
        color:colors.darkBlue,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
