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
} from 'react-native';

import Loader from '../Components/loader';
import {images , colors} from '../assets/assets';
import Input from '../assets/input';

import Axios from '../Network/axios';
import {useSelector, useDispatch} from 'react-redux';
import  {setCurrentDoctor}  from '../store/slices/doctor';
import  {setToken}  from '../store/slices/token';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen2Doctors = ({route}) => {
     const navigation = useNavigation();
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const { first_name, last_name, email,password1,password2,mobileNumber,title } = route.params;

    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);
    
    const ageInputRef = createRef();
    const genderOptions = ['Male', 'Female'];

    const dispatch = useDispatch();

    const handleSubmitButton = async() => {
        setErrortext('');
        if (!age) {
        alert('Please fill Age');
        return;
        }
        if (!gender) {
            alert('Please select your Gender');
            return;
        }
        console.log('Registering:', { first_name, last_name, email,password1,password2,mobileNumber,title,  age,
            gender });

        //Show Loader
        setLoading(true);
        const response = await Axios.post('/dj-rest-auth/registration/', {
            first_name, 
            last_name, 
            email,
            password1,
            password2,
            mobileNumber,
            title,
            age,
            gender
        });
        console.log('response:',response);
        console.log('account:',response.data);
        if (response.status === 200 || response.status === 201) {
        dispatch(setCurrentDoctor(response.data));
        dispatch(setToken(response.data.token));
        Axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
        setIsRegistraionSuccess(true);
        setLoading(false);
        navigation.navigate('PatientsHomeScreen');
        } else {
            setError(response.data.message);
            setIsRegistraionSuccess(false);
            setLoading(false);
            console.log('error', error);
        }
    setLoading(false);
};
if (isRegistraionSuccess) {
    return (
    <View
        style={{
        flex: 1,
        backgroundColor: colors.darkBlue,
        justifyContent: 'center',
        }}>
        
        <Image
        source={images.check}
        style={{
            height: 150,
            width:150,
            alignSelf: 'center'
        }}
        />
        <Text style={styles.successTextStyle}>
        Registration Successful
        </Text>
        <TouchableOpacity style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonTextStyle}>Login Now</Text>
            </TouchableOpacity>
    </View>
    );
}
    return (
        <View style={styles.mainBody}>
        <Loader loading={loading} />
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            }}>
        <View style={styles.upperSection}>
            <Image
            source={images.upperImage}
            style={styles.roundedImage}
            />
        </View>
        <KeyboardAvoidingView enabled>
        <View style={styles.lowerSection}>
            <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60}}>
            <Text style ={styles.header}>
            Sign Up
            </Text>
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
                {genderOption == "Male"?( <Image
                        source={images.male}
                        style={{width:20,height:20,marginLeft:10,marginTop:-4}}
                    />
                    ) : (
                        <Image
                        source={images.female}
                        style={{width:20,height:20,marginLeft:10,marginTop:-4}}
                    />)}
                    <Text style ={{color: colors.darkBlue,marginLeft:5,marginTop:-2}}>{genderOption}</Text>
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
                onPress={handleSubmitButton}>
                {/* onPress={() => {{handleSubmitButton};navigation.navigate('LoginScreen')}}> */}
                <Text style={styles.buttonTextStyle}>Login</Text>
            </TouchableOpacity>
            <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('LoginScreen')}>
                Already have an account? <Text style={styles.a}>Login Here</Text> 
            </Text>
        </View>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </View>

    );

};
export default RegisterScreen2Doctors;
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
    },
    header:{
        marginTop: 25,
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
        fontSize: 20,
        marginTop:10,
        marginBottom:60,
        // padding: 30,
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