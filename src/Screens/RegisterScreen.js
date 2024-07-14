import React, {useState, useEffect,createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

import Loader from '../Components/loader';
import {images, colors} from '../assets/assets';
import emailValidator from 'email-validator';
import PopUpModal from '../Components/popUpModal';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [mobileNumber, setmobileNumber] = useState('');
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const secondNameInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();
  const mobileInputRef = createRef();
  const titleOptions = ['patient', 'doctor'];

  const [passwordValidations, setPasswordValidations] = useState({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  });

  const handlePasswordChange = newPassword => {
    setPassword(newPassword);
    validatePassword(newPassword);
  };
  const validatePassword = newPassword => {
    setPasswordValidations({
      minValueValidation: newPassword.length >= 8,
      numberValidation: /\d/.test(newPassword),
      capitalLetterValidation: /[A-Z]/.test(newPassword),
      specialCharacterValidation: /[^A-Za-z0-9]/.test(newPassword),
    });
  };

  const handleSubmitButton = () => {
    setText('');
    if (!firstName) {
      setText('Please fill your First Name');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!lastName) {
      setText('Please fill your Second Name');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!email) {
      setText('Please fill Email');
      setModalVisible(true);
      setError(true);
      return;
    } else if (!emailValidator.validate(email)) {
      setText('Please enter a valid email address');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!password) {
      setText('Please fill your Password');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!confirmPassword) {
      setText('Please confirm your Password');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!title) {
      setText('Please select your title');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (password !== confirmPassword) {
      setText('Passwords do not match');
      setModalVisible(true);
      setError(true);
      return;
    }
    validatePassword(password);
    if (
      !passwordValidations.minValueValidation ||
      !passwordValidations.numberValidation ||
      !passwordValidations.capitalLetterValidation ||
      !passwordValidations.specialCharacterValidation
    ) {
      setText('Password is not valid, Please check the requirements.');
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!mobileNumber) {
      setText('Please fill Mobile Number');
      setModalVisible(true);
      setError(true);
      return;
    } else if (!/^\d{11}$/.test(mobileNumber)) {
      setText('Please enter a valid 11-digit mobile number');
      setModalVisible(true);
      setError(true);
      return;
    } else if (mobileNumber.charAt(0) !== '0') {
      setText('Mobile Number should start with 0');
      setModalVisible(true);
      setError(true);
      return;
    }
    const formData = new FormData();

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', confirmPassword);
    formData.append('mobileNumber', mobileNumber);
    formData.append('title', title);

    if (title === 'doctor') {
      navigation.navigate('RegisterScreen2Doctors',  formData );
    } else if (title === 'patient') {
      navigation.navigate('RegisterScreen2Patients',formData);
    }
  };
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
      <View style={styles.upperSection}>
        <Image source={images.upperImage} style={styles.roundedImage} />
      </View>
      <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          
          }}>
        <View style={styles.lowerSection}>
          <View style={{borderTopRightRadius: 60, backgroundColor: colors.white,}}>
          <KeyboardAvoidingView enabled>
            <Text style={styles.header}>Sign Up</Text>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputBar}>
                <Image source={images.user} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={FirstName => setFirstName(FirstName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter your First Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    secondNameInputRef.current &&
                    secondNameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <Text style={styles.label}>Second Name</Text>
              <View style={styles.inputBar}>
                <Image source={images.user} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={SecondName => setSecondName(SecondName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter your Second Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  ref={secondNameInputRef}
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputBar}>
                <Image source={images.mailIcon} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={Email => setEmail(Email)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter your Email"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputBar}>
                <Image source={images.passwordIcon} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={handlePasswordChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter your Password"
                  placeholderTextColor="#8b9cb5"
                  ref={passwordInputRef}
                  returnKeyType="next"
                  secureTextEntry={isPasswordShown}
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current &&
                    confirmPasswordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
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
              {isPasswordFocused && (
                <View>
                  {Object.entries(passwordValidations).map(([key, value]) => (
                    <View
                      key={key}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: -9,
                      }}>
                      {value ? (
                        <Image source={images.right} style={styles.icon} />
                      ) : (
                        <Image source={images.wrong} style={styles.icon} />
                      )}
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '400',
                          color: value ? '#20D56F' : '#C82214',
                          marginLeft: 8,
                        }}>
                        {key === 'minValueValidation' &&
                          'Password must be at least 8 Characters'}
                        {key === 'numberValidation' &&
                          'Password must have at least one Number'}
                        {key === 'capitalLetterValidation' &&
                          'Password must have at least one Capital Letter'}
                        {key === 'specialCharacterValidation' &&
                          'Password must have at least one Special Character'}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputBar}>
                <Image source={images.passwordIcon} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={password2 =>
                    setConfirmPassword(password2)
                  }
                  underlineColorAndroid="#f000"
                  placeholder="Re-Enter your Password"
                  placeholderTextColor="#8b9cb5"
                  ref={confirmPasswordInputRef}
                  secureTextEntry={isPasswordShown}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    mobileInputRef.current && mobileInputRef.current.focus()
                  }
                  blurOnSubmit={false}
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
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputBar}>
                <Image source={images.mobile} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={mobileNumber => setmobileNumber(mobileNumber)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Mobile Number"
                  keyboardType="numeric"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  ref={mobileInputRef}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              <Text style={styles.label}>Are you</Text>
              <View style={styles.optionsContainer}>
                {titleOptions.map(titleOption => {
                  return (
                    <TouchableOpacity
                      key={titleOption}
                      style={styles.singleOptionContainer}
                      onPress={() => setTitle(titleOption)}>
                      <View style={styles.outerCircle}>
                        {title === titleOption ? (
                          <View style={styles.innerCircle} />
                        ) : null}
                      </View>
                      {titleOption == 'patient' ? (
                        <>
                          <Image
                            source={images.patient}
                            style={{
                              width: 20,
                              height: 20,
                              marginLeft: 10,
                              marginTop: -4,
                            }}
                          />
                          <Text style={{
                          color: colors.darkBlue,
                          marginLeft: 5,
                          marginTop: -2,
                        }}>Patient</Text>
                        </>
                      ) : (
                        <>
                        <Image
                          source={images.doctor}
                          style={{
                            width: 20,
                            height: 20,
                            marginLeft: 10,
                            marginTop: -4,
                          }}
                        />
                        <Text style={{
                          color: colors.darkBlue,
                          marginLeft: 5,
                          marginTop: -2,
                        }}>Doctor</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('LoginScreen')}>
                Already have an account? <Text style={styles.a}>Login Here</Text>
              </Text>
          </KeyboardAvoidingView>
          </View>
      </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: 'center',
  },
  upperSection: {
    margin: 0,
  },
  roundedImage: {
    width: '100%',
    height: 135,
    borderBottomLeftRadius: 60,
  },
  lowerSection: {
    backgroundColor: colors.blueLogo,
    margin: 0,
    zIndex: 20,
  },
  container: {
    // marginTop: -50,
  },
  header: {
    marginTop: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: colors.darkBlue,
    fontSize: 23,
    fontWeight: '500',
  },
  label: {
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
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.borderColor,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 8,
    marginRight: 10,
    marginLeft: 10,
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
    marginLeft: 'auto',
    marginRight: 'auto',
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
    marginBottom: 20,
  },
  a: {
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  modalView:{
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    minWidth: '70%',
    maxWidth: '85%',
    marginTop: 22,
    flexDirection:'colomn',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    alignItems:'flex-end',
  },
  closeButtonText: {
    color: colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft:10,
    marginRight:10,
    paddingTop:20,
  },
  textModal:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    marginRight:10,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginLeft: 100,
    justifyContent: 'space-around',
    marginTop: -15,
  },
  singleOptionContainer: {
    flexDirection: 'row',
  },
  outerCircle: {
    width: 15,
    height: 15,
    borderColor: colors.green,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
});
