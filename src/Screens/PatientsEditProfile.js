
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

import {images , colors} from '../assets/assets';
import emailValidator from 'email-validator';

const PatientsEditProfile = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(true);
    const [mobileNumber, setmobileNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [fillData, setFillData] = useState(false);
    const [errors, setErrors] = useState({
        minValueValidation: false,
        numberValidation: false,
        capitalLetterValidation: false,
        specialCharacterValidation: false,
    });

    const secondNameInputRef = createRef();
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();
    const mobileInputRef = createRef();
    const ageInputRef = createRef();
    const genderOptions = ['Male', 'Female'];

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
        if (!password) {
            alert('Please fill your Password');
            return;
        }
        if (!confirmPassword) {
            alert('Please confirm your Password');
            return;
        }
        if (!age) {
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
            <View style={styles.upperSection}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={{margin: 20}}>
                    {   <Image source={images.backArrow}/> }
                </TouchableOpacity>
                <View style={styles.profileField}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={images.profilePicture} style={{marginLeft:30, height:55, width:55}}/>
                        <View style={{flexDirection:"column",marginLeft:20,marginTop:5}}>
                            <Text style ={{fontSize:18,color:colors.white}}>
                                Hello,
                            </Text>
                            <Text style ={styles.profileText}>
                            Mohamed Ali
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginScreen')}
                        style={styles.searchButton}>
                        <Image source={images.search} style={{width:23,height:23}} /> 
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView enabled>
                <View style={styles.lowerSection}>
                    <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60}}>
                        <View style={styles.heading}>
                            <Image source={images.profileBlue} style={{width:30,height:30}} /> 
                            <Text style ={styles.header}>
                                Edit Profile
                            </Text>
                        </View>
                        <Text style ={styles.label}>
                        First Name
                        </Text>
                        <View style={styles.inputBar}>
                            <Image source={images.user} style={styles.icon} />
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
                            onSubmitEditing={() =>
                                ageInputRef.current &&
                                ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                            />
                        </View>
                        <Text style ={styles.label}>
                            Age
                        </Text>
                        <View style={styles.inputBar}>
                            <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Age) => setAge(Age)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter your Age"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            />
                        </View>
                        <Text style ={styles.label}>
                            Gender
                        </Text>
                        <View style={styles.optionsContainer}>
                            {genderOptions.map(genderOption => {
                                return (
                                    <TouchableOpacity
                                        key={genderOption}
                                        style={styles.singleOptionContainer}
                                        onPress={() => setGender(genderOption)}>
                                        <View style={styles.outerCircle}>
                                            {gender === genderOption ? (
                                            <View style={styles.innerCircle} />
                                            ) : null}
                                        </View>
                                        {genderOption == "Male"?( 
                                            <Image source={images.male} style={{width:20,height:20,marginLeft:10,marginTop:-4}} />
                                            ) : (
                                            <Image source={images.female} style={{width:20,height:20,marginLeft:10,marginTop:-4}}/>
                                        )}
                                        <Text style ={{fontsize:13,color: colors.darkBlue,marginLeft:5,marginTop:-2}}>{genderOption}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {handleSubmitButton()}}>
                            <Text style={styles.buttonTextStyle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatientsHomeScreen')}
                    style={[styles.navBarButton, styles.activeButton]}>
                    <Image source={images.home} style={styles.navBarIcon} /> 
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.cameraButton}>
                    <Image source={images.camera} style={styles.navBarIcon} /> 
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatientsEditProfile')}
                    style={styles.navBarButton}>
                    <Image source={images.profileGreen} style={styles.navBarIcon} /> 
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default PatientsEditProfile;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: colors.white,
        alignContent: 'center',
    },
    upperSection:{
        margin:0,
        height:180,
        backgroundColor:colors.darkBlue,
        borderBottomLeftRadius:60,
    },
    profileField:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:20,
        marginTop:10,
    },
    profileText:{
        color:colors.white,
        fontSize:16,
    },
    searchButton:{
        backgroundColor:colors.green,
        width:40,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    lowerSection:{
        backgroundColor: colors.darkBlue,
        marginBottom:10,
    },
    heading:{
        flexDirection:'row',
        alignItems:'center',
        marginTop: 30,
        marginLeft: 35,
        marginRight: 35,
        gap:20,
    },
    header:{
        color: colors.darkBlue,
        fontSize: 20,
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
    navBar:{
        height:50,
        borderWidth:1.5,
        borderColor:colors.mintGreen,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    navBarButton:{
        borderRadius:40,
        width:50,
        height:50,
        marginLeft:20,
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
    },
    activeButton:{
        backgroundColor:colors.mintGreen,
    },
    navBarIcon:{
        width:30,
        height:30,
        padding:10,
    },
    cameraButton:{
        backgroundColor:colors.green,
        width:60,
        height:60,
        borderRadius:40,
        borderColor:'#DCDCDC',
        borderTopWidth:1,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderBottomWidth:5,
        marginBottom:45,
        alignItems:'center',
        justifyContent:'center',
    },
});