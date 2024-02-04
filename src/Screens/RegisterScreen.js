
// Import React and Component
import React, {useState, createRef} from 'react';
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
} from 'react-native';

import Loader from './Components/loader';
import {images , colors} from '../assets/assets';
import Input from '../assets/input';
import emailValidator from 'email-validator';

const RegisterScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [mobileNumber, setmobileNumber] = useState('');
    const [title, setTitle]=useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [fillData, setFillData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [errors, setErrors] = useState({
        minValueValidation: false,
        numberValidation: false,
        capitalLetterValidation: false,
        specialCharacterValidation: false,
    });
    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    const validatePassword = (password) => {
        setErrors({
        minValueValidation: password.length >= 8,
        numberValidation: /\d/.test(password),
        capitalLetterValidation: /[A-Z]/.test(password),
        specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
    });}
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
      };
    
      const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
      };
    const secondNameInputRef = createRef();
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();
    const mobileInputRef = createRef();
    const titleOptions = ['Patient', 'Doctor'];

    const handleSubmitButton = () => {
        setErrortext('');
        if (!firstName) {
            alert('Please fill your First Name');
            return;
        }
        if (!secondName) {
            alert('Please fill your Second Name');
            return;
        }
        if (!email) {
            alert('Please fill you Email');
            return;
        }
        if (!password) {
            alert('Please fill your Password');
            return;
        }
        if (!confirmPassword) {
            alert('Please confirm your Password');
            return;
        }
        if (!title) {
            alert('Please select your title');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        } else if (!emailValidator.validate(email)) {
            alert('Please enter a valid email address');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        validatePassword(password);

    if (!errors.minValueValidation || !errors.numberValidation || !errors.capitalLetterValidation || !errors.specialCharacterValidation) {
        alert('Password is not valid. Please check the requirements.');
        return;
    }
        if (!mobileNumber) {
            alert('Please fill Mobile Number');
            return;
        } else if (!/^\d{11}$/.test(mobileNumber)) {
            alert('Please enter a valid 11-digit mobile number');
            return;
        } else if (mobileNumber.charAt(0) !== '0') {
            alert('Mobile Number should start with 0');
            return;
        }
        setFillData(true);
        //Show Loader
        // setLoading(true);
        // var dataToSend = {
        // firstName: firstName,
        // secondName: secondName,
        // email: email,
        // mobileNumber: mobileNumber,
        // password: password,
        // gender:gender,
        // title:title,
        // };
        // var formBody = [];
        // for (var key in dataToSend) {
        // var encodedKey = encodeURIComponent(key);
        // var encodedValue = encodeURIComponent(dataToSend[key]);
        // formBody.push(encodedKey + '=' + encodedValue);
        // }
        // formBody = formBody.join('&');

        // fetch('http://localhost:3000/api/user/register', {
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
        //       setIsRegistraionSuccess(true);
        //       console.log(
        //         'Registration Successful. Please Login to proceed'
        //       );
        //     } else {
        //       setErrortext(responseJson.msg);
        //     }
        //   })
        //   .catch((error) => {
        //     //Hide Loader
        //     setLoading(false);
        //     console.error(error);
        //   });
        // setLoading(false);
        // setIsRegistraionSuccess(true);
        // console.log(
        //     'Registration Successful. Please Login to proceed'
        //     );
    };
    return (
        <View style={styles.mainBody}>
            <Loader loading={loading}/>
                <View style={styles.upperSection}>
                    <Image
                    source={images.upperImage}
                    style={styles.roundedImage}
                    />
                </View>
                <View style={styles.lowerSection}>
                    <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60, height:60}}>
                    </View>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                <View style={styles.container}>
                    <Text style ={styles.header}>
                        Sign Up
                    </Text>
                    <Text style ={styles.label}>
                    First Name
                    </Text>
                    <View style={styles.inputBar}>
                        <Image
                        source={images.user}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.inputStyle}
                        onChangeText={(FirstName) => setFirstName(FirstName)}
                        underlineColorAndroid="#f000"
                        placeholder="Enter your First Name"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            secondNameInputRef.current && secondNameInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                        />
                    </View>
                    {/* <Input  
                        label="First Name"
                        imageSource={images.user}
                        onChangeText={(FirstName) => setFirstName(FirstName)}
                        placeholder="Enter your First Name"
                        autoCapitalize="sentences"
                        keyboardType="default"
                        onSubmitEditing={() =>
                            secondNameInputRef.current && secondNameInputRef.current.focus()
                        }
                        returnKeyType="next"
                    /> */}
                    {/* <Input  
                        label="Second Name"
                        imageSource={images.user}
                        onChangeText={(SecondName) => setSecondName(SecondName)}
                        placeholder="Enter your First Name"
                        autoCapitalize="sentences"
                        keyboardType="default"
                        ref={secondNameInputRef}
                        onSubmitEditing={() =>
                            emailInputRef.current && emailInputRef.current.focus()
                        }
                        returnKeyType="next"
                    /> */}
                    <Text style ={styles.label}>
                        Second Name
                    </Text>
                    <View style={styles.inputBar}>
                        <Image
                        source={images.user}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.inputStyle}
                        onChangeText={(SecondName) => setSecondName(SecondName)}
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
                    <Text style ={styles.label}>
                        Email
                    </Text>
                    <View style={styles.inputBar}>
                        <Image
                        source={images.mailIcon}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.inputStyle}
                        onChangeText={(Email) => setEmail(Email)}
                        underlineColorAndroid="#f000"
                        placeholder="Enter your Email"
                        placeholderTextColor="#8b9cb5"
                        keyboardType="email-address"
                        ref={emailInputRef}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                        />
                    </View>
                    <Text style ={styles.label}>
                    Password
                    </Text>
                    <View style={styles.inputBar}>
                        <Image
                        source={images.passwordIcon}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.inputStyle}
                        onChangeText={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
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
                            position: "absolute",
                            right: 12
                        }}
                        >
                        {
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
                        }
                        </TouchableOpacity>
                    </View>
                    {isPasswordFocused && (
                    <View>
                    {Object.entries(errors).map(([key, value]) => (
                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -9 }}>
                        {value ? (
                            <Image source={images.right} style={styles.icon} />
                        ) : (
                            <Image source={images.wrong} style={styles.icon} />
                        )}
                        <Text style={{ fontSize: 15, fontWeight: '400', color: value ? '#20D56F' : '#C82214', marginLeft: 8 }}>
                            {key === 'minValueValidation' && 'Password must be at least 8 Characters'}
                            {key === 'numberValidation' && 'Password must have at least one Number'}
                            {key === 'capitalLetterValidation' && 'Password must have at least one Capital Letter'}
                            {key === 'specialCharacterValidation' && 'Password must have at least one Special Character'}
                        </Text>
                        </View>
                    ))}
                    </View>
                    )}
                    <Text style ={styles.label}>
                    Confirm Password
                    </Text>
                    <View style={styles.inputBar}>
                        <Image
                        source={images.passwordIcon}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ConfirmPassword) =>
                            setConfirmPassword(ConfirmPassword)
                        }
                        underlineColorAndroid="#f000"
                        placeholder="Re-Enter your Password"
                        placeholderTextColor="#8b9cb5"
                        ref={confirmPasswordInputRef}
                        secureTextEntry={isPasswordShown}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            mobileInputRef.current &&
                            mobileInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                        />
                        <TouchableOpacity
                        onPress={() => setIsPasswordShown(!isPasswordShown)}
                        style={{
                            position: "absolute",
                            right: 12
                        }}
                        >
                        {
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
                        }
                        </TouchableOpacity>
                    </View>
                    <Text style ={styles.label}>
                        Mobile Number
                    </Text>
                    <View style={styles.inputBar}>
                        <Image
                        source={images.mobile}
                        style={styles.icon}
                        />
                        <TextInput
                        style={styles.inputStyle}
                        onChangeText={(mobileNumber) =>
                            setmobileNumber(mobileNumber)
                        }
                        underlineColorAndroid="#f000"
                        placeholder="Enter Mobile Number"
                        keyboardType="numeric"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="none"
                        ref={mobileInputRef}
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        />
                    </View>
                    <Text style ={styles.label}>
                        Are you
                    </Text>
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
                            {titleOption == "Patient"?( <Image
                                    source={images.patient}
                                    style={{width:20,height:20,marginLeft:10,marginTop:-4}}
                                />
                                ) : (
                                    <Image
                                    source={images.doctor}
                                    style={{width:20,height:20,marginLeft:10,marginTop:-4}}
                                />)
                            }
                                <Text style ={{fontsize:13,color: colors.darkBlue,marginLeft:5,marginTop:-2}}>{titleOption}</Text>
                            </TouchableOpacity>
                            );
                            })}
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                        {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        // onPress={{handleSubmitButton}}>
                        onPress={() => {handleSubmitButton();
                            if (fillData) {
                                if (title === 'Doctor') {
                                    navigation.navigate('RegisterScreen2Doctors');
                                } else if (title === 'Patient') {
                                    navigation.navigate('RegisterScreen2Patients');
                                }
                            }
                        }}>
                        <Text style={styles.buttonTextStyle}>Next</Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => navigation.navigate('LoginScreen')}>
                        Already have an account? <Text style={styles.a}>Login Here</Text> 
                    </Text>
                </View>
            </KeyboardAvoidingView>
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
    upperSection:{
        margin:0,
    },
    roundedImage:{
        width: "100%" ,
        height: 135,
        borderBottomLeftRadius:60,
    },
    lowerSection:{
        backgroundColor: colors.blueLogo,
        margin: 0,
        zIndex: 20,
    },
    container:{
        marginTop:-50,
    },
    header:{
        marginTop:25,
        marginLeft: 'auto',
        marginRight: 'auto',
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
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    optionsContainer:{
        flexDirection: 'row',
        marginLeft: 100,
        justifyContent:'space-around',
        marginTop:-15,
    },
    singleOptionContainer: {
        flexDirection: 'row',
    },
    outerCircle: {
        width: 15,
        height: 15,
        borderColor:colors.green,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor:colors.green,
    }
    });