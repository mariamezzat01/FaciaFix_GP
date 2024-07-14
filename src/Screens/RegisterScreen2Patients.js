import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import Loader from '../Components/loader';
import {images , colors} from '../assets/assets';

import Axios from '../Network/axios';
import { register } from "../store/api";
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import { useNavigation} from '@react-navigation/native';
import  {setCurrentPatient}  from '../store/slices/patient';
import  {setToken}  from '../store/slices/token';
import DatePicker, { getToday ,getFormatedDate } from 'react-native-modern-datepicker';
import PopUpModal from '../Components/popUpModal';



const RegisterScreen2Patients = ({route})=> {
    const navigation = useNavigation();
    const [gender, setGender] = useState('');

    const [eyeUri, setEyeUri] = useState('');
    const [eyeImage, setEyeImage] = useState('');
    
    const [mouthUri, setMouthUri] = useState('');
    const [mouthImage, setMouthImage] = useState('');
    
    const [eyebrowUri, setEyebrowUri] = useState('');
    const [eyebrowsImage, setEyeBrowImage] = useState('');

    const [birthdate, setBirthDate] = useState();
    const [displaymode, setMode] = useState('calendar');
    const [isDisplayDate, setShow] = useState(false);
    const [dateText, setDateText] = useState('Select Birthdate');

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState("");


    const changeSelectedDate = (selectedDate) => {
        const [year, month, day] = selectedDate.split('/');
        const date = new Date(year, month - 1, day);
        const formattedDate = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        setBirthDate(formattedDate);
        setDateText(formattedDate);
        setShow(false);
    };

    const displayDatepicker = () => {
        setShow(true);
    };
    
    const today  = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1, 'YYYY/MM/DD'));
    
    const genderOptions = ['Male', 'Female'];

    const dispatch = useDispatch();

    const handleImage = async (type) => {
        const options = {
            mediaType: 'photo',
        };

        try {
            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                console.log('User cancelled image picker');
            return;
            }
            const selectedImage = result.assets[0];
            switch (type) {
                case 'eye':
                    setEyeUri(selectedImage.uri);
                    setEyeImage(selectedImage);
                    break;
                case 'mouth':
                    setMouthUri(selectedImage.uri);
                    setMouthImage(selectedImage);
                    break;
                case 'eyebrow':
                    setEyebrowUri(selectedImage.uri);
                    setEyeBrowImage(selectedImage);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log('Image picker error:', error);
        }
    };


    const handleSubmitButton = async () => {
        setText('');
        if (!birthdate) {
            setText('Please select your Birthdate');
            setModalVisible(true);
            setError(true);
            return;
        }
        if (!gender) {
            setText('Please select your Gender');
            setModalVisible(true);
            setError(true);
            return;
        }
        if (!eyeImage) {
            setText('Please upload an eye closure image');
            setModalVisible(true);
            setError(true);
            return;
        }
        if (!mouthImage) {
            setText('Please upload a smiling image');
            setModalVisible(true);
            setError(true);
            return;
        }
        if (!eyebrowsImage) {
            setText('Please upload a raising eyebrows image ');
            setModalVisible(true);
            setError(true);
            return;
        }
        // const formData = new FormData();
        const  formData  = route.params;

        // formData.append('first_name', 'Amira');
        // formData.append('last_name', 'Mohamed');
        // formData.append('email', 'amira@gmail.com');
        // formData.append('password1', 'amiraamira');
        // formData.append('password2', 'amira');
        // formData.append('mobileNumber', '01003982004');
        // formData.append('title', 'Patient');
        // formData.append('birthdate', "2001-04-07");
        formData.append('birthdate', birthdate);
        formData.append('gender', gender);
        formData.append('original_image_eye', { 
            uri: eyeImage.uri,
            name: eyeImage.fileName,
            type: eyeImage.type,
        });
        formData.append('original_image_mouth', { 
            uri: mouthImage.uri,
            name: mouthImage.fileName,
            type: mouthImage.type,
        });
        formData.append('original_image_eyebrows', {
            uri: eyebrowsImage.uri,
            name: eyebrowsImage.fileName,
            type: eyebrowsImage.type,
        });

        register(formData, dispatch,navigation,setError,setModalVisible,setText,setLoading);

        // try {
        //     const response = await Axios.post('/register/', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });

        //     console.log('response:', response);

        //     if (response.status === 200 || response.status === 201) {
        //         dispatch(setCurrentPatient(response.data));
        //         dispatch(setToken(response.data.token));
        //         setLoading(false);
        //         navigation.navigate('PatientsHomeScreen');
        //     } else {
        //         setText(response.data.non_field_errors);
        //         setModalVisible(true);
        //         setLoading(false);
        //     }
        // } catch (error) {
        //     console.log('Registration error:', error);
        //     setText('Registration failed. Please try again.');
        //     setModalVisible(true);
        //     setLoading(false);
        // }
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',}}>
                <View style={styles.upperSection}>
                    <Image source={images.upperImage} style={styles.roundedImage}/>
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.lowerSection}>
                        <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60}}>
                            <Text style ={styles.header}>
                                Sign Up
                            </Text>
                            <Text style={styles.label}>Birthdate</Text>
                            <TouchableOpacity style={styles.inputBar} onPress={displayDatepicker}>
                                <Text style={[styles.inputStyle, { color: dateText === 'Select Birthdate' ? '#8b9cb5' : colors.darkBlue }]}>
                                    {dateText}
                                </Text>
                                    {isDisplayDate && (
                                        <Modal animationType='slide' transparent={true}>
                                            <TouchableWithoutFeedback onPress={()=>setShow(false)}>
                                            <View style={styles.datePicker} >
                                                <DatePicker
                                                    options={{
                                                        backgroundColor: colors.white,
                                                        textHeaderColor: colors.blueFF,
                                                        textDefaultColor: colors.blueLogo,
                                                        selectedTextColor: colors.mintGreen,
                                                        mainColor: colors.green,
                                                        textSecondaryColor: colors.darkBlue,
                                                        borderColor: colors.borderColor,
                                                    }}
                                                    mode={displaymode}
                                                    selected={birthdate}
                                                    maximumDate={startDate}
                                                    style={{ borderRadius: 10 }}
                                                    onDateChange={changeSelectedDate}/>
                                                </View>
                                                </TouchableWithoutFeedback>
                                        </Modal>
                                        )}
                            </TouchableOpacity>
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
                                            {gender === genderOption ? 
                                                ( <View style={styles.innerCircle} /> ) : null}
                                        </View>
                                        {genderOption == "male"?( 
                    <>
                        <Image
                            source={images.male}
                            style={{width:20,height:20,marginLeft:10,marginTop:-4}}
                        />
                        <Text style ={{color: colors.darkBlue,marginLeft:5,marginTop:-2}}>Male</Text>
                    </>
                    ) : (
                    <>
                        <Image
                            source={images.female}
                            style={{width:20,height:20,marginLeft:10,marginTop:-4}}
                        />
                        <Text style ={{color: colors.darkBlue,marginLeft:5,marginTop:-2}}>Female</Text>
                    </>
                    )}
                                    </TouchableOpacity>
                                );
                                })}
                            </View>
                            <Text style={styles.label}>Upload Raising Eyebrows Image</Text>
                            <TouchableOpacity
                                style={styles.uploadImage}
                                onPress={() => handleImage('eyebrow')}>
                                <View style={[{borderColor: eyebrowUri ? 'white' : '#E2E6EA'}, styles.uploadFrame,]}>
                                    {eyebrowUri && (
                                        <Image style={styles.uploadImageStyle} source={{uri: eyebrowUri}}/>
                                    )}
                                    {!eyebrowUri ? (
                                        <Text style={styles.clickText}> Click to browse {'\n'} your files</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.label}>Upload Eye Closure Image</Text>
                            <TouchableOpacity
                                style={styles.uploadImage}
                                onPress={() => handleImage('eye')}>
                                <View style={[{borderColor: eyeUri ? 'white' : '#E2E6EA'}, styles.uploadFrame,]}>
                                    {eyeUri && (
                                        <Image style={styles.uploadImageStyle} source={{uri: eyeUri}}/>
                                    )}
                                    {!eyeUri ? (
                                        <Text style={styles.clickText}> Click to browse {'\n'} your files</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.label}>Upload Smiling Image</Text>
                            <TouchableOpacity
                                style={styles.uploadImage}
                                onPress={() => handleImage('mouth')}>
                                <View style={[{borderColor: mouthUri? 'white' : '#E2E6EA'}, styles.uploadFrame,]}>
                                    {mouthUri && (
                                        <Image style={styles.uploadImageStyle} source={{uri: mouthUri}}/>
                                    )}
                                    {!mouthUri ? (
                                        <Text style={styles.clickText}> Click to browse {'\n'} your files</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleSubmitButton}>
                                <Text style={styles.buttonTextStyle}>Sign Up</Text>
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
export default RegisterScreen2Patients;
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
        alignSelf:'center',
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
    },
    uploadImage: {
        alignItems: 'center',
        marginVertical: 10,
    },
    uploadFrame: {
        borderWidth: 1,
        borderStyle:'dashed',
        borderColor: colors.borderColor,
        borderRadius: 20,
        width: 303,
        height: 303,
        justifyContent:'center',
        alignItems:'center',
    },
    uploadImageStyle: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    clickText: {
        color: '#8b9cb5',
        fontSize: 15,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    datePicker: {
        flex: 1,
        justifyContent: 'center',
        padding:5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    },
    textModal:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10,
    }
    });
