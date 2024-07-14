import React, {useState,createRef} from 'react';
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
import {useDispatch} from 'react-redux';
import  {setCurrentDoctor}  from '../store/slices/doctor';
import  {setToken}  from '../store/slices/token';
import { useNavigation } from '@react-navigation/native';
import DatePicker, { getToday ,getFormatedDate } from 'react-native-modern-datepicker';
import PopUpModal from '../Components/popUpModal';
import DropDownPicker from 'react-native-dropdown-picker';
import { register } from "../store/api";

const RegisterScreen2Doctors = ({route}) => {
    const navigation = useNavigation();
    const [gender, setGender] = useState('');
    const [workingDays,setWorkingDays]= useState([]);

    const [birthDate, setBirthDate] = useState();
    const [displaymode, setMode] = useState('calendar');
    const [isDisplayDate, setShow] = useState(false);
    const [dateText, setDateText] = useState('Select Birthdate');

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState("");

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' },
    ]);

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
    const startDate = getFormatedDate(today.setDate(today.getDate() +1 ,'YYYY/MM/DD'));

    const genderOptions = ['male', 'female'];

    const dispatch = useDispatch();

    const handleSubmitButton = async() => {
        setText('');
        if (!birthDate) {
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
        if (workingDays.length === 0) {
            setText('Please select your Working Days');
            setModalVisible(true);
            setError(true);
            return;
        }

        // const formData = new FormData();
        const  formData  = route.params;

        // formData.append('first_name', 'Maye');
        // formData.append('last_name', 'Khaled');
        // formData.append('email', 'maye@gmail.com');
        // formData.append('password1', 'mayemaye');
        // formData.append('password2', 'mayemaye');
        // formData.append('mobileNumber', '01003982004');
        // formData.append('title', 'doctor');
        
        // formData.append('birthdate', "2001-04-07");
        formData.append('birthdate', birthDate);
        formData.append('gender', gender); 
        formData.append('working_days', JSON.stringify(workingDays));
        // console.log(formData);

        register(formData, dispatch,navigation,setError,setModalVisible,setText,setLoading);


    //     setLoading(true);
    //     const response = await Axios.post('/register/', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    //     console.log('response:',response);
    //     // console.log('account:',response.data);
    //     if (response.status === 200 || response.status === 201) {
    //     dispatch(setCurrentDoctor(response.data));
    //     dispatch(setToken(response.data.token));
    //     setLoading(false);
    //     navigation.navigate('doctorsHomeScreen');
    //     } else {
    //         setText(response.data.non_field_errors);
    //         setModalVisible(true);
    //         setLoading(false);
    //     }
    // setLoading(false);
};

    return (
        <View style={styles.mainBody}>
        <Loader loading={loading} />
        <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
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
                                            selected={birthDate}
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
                    {gender === genderOption ? (
                    <View style={styles.innerCircle} />
                    ) : null}
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
            <Text style ={styles.label}>
                Working Days
            </Text>
            <DropDownPicker
                open={open}
                value={workingDays}
                items={items}
                setOpen={setOpen}
                setValue={setWorkingDays}
                setItems={setItems}
                multiple={true}
                mode="BADGE"
                badgeColors={colors.mintGreen}
                badgeStyle={{maxWidth:120,alignItems:"center",justifyContent:'center',textAlign:'center'}}
                badgeDotColors={colors.green}
                placeholder="Select working days"
                placeholderStyle={{ color: '#8b9cb5' }}
                style={[styles.inputBar, { width:340}]}
                dropDownContainerStyle={[styles.inputBar, {zIndex:1,height:600,marginTop:20,width:340}]}
                textStyle={styles.inputStyle}
                tickIconStyle={{ tintColor: colors.green }}
                arrowIconStyle={{tintColor:colors.darkBlue}}
                renderListItem={({ item, onPress }) => (
                    <TouchableOpacity
                        key={item.value}
                        onPress={() => onPress(item)}
                        style={{
                            padding: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: workingDays.includes(item.value) ? colors.lightGreen : colors.white,
                        }}>
                        {workingDays.includes(item.value) && (
                            <Image
                                source={images.right}
                                style={{ tintColor: colors.green, marginRight: 10,width:15,height:15 }}
                            />
                        )}
                        <Text style={{ color: workingDays.includes(item.value) ? colors.green : colors.darkBlue }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
            />
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
        alignItems:'center',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderWidth:1,
        borderRadius: 12,
        borderColor: colors.borderColor,
        padding:0,
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
    },
    dropDownContainerStyle:{
        // margin:10,
        // width:100,
    },
    containerStyle:{
        width:350,

    }
    });