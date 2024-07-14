import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';

import {images , colors} from '../../assets/assets';
import {useNavigation} from '@react-navigation/native';
import MyTable from '../../Components/table';
import LogoutModal from '../../Components/logoutModal';
import { currentDoctor, setCurrentDoctor } from '../../store/slices/doctor';
import { currentPatient, setCurrentPatient } from '../../store/slices/patient';
import {defaultToken} from '../../store/slices/token';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../Components/loader';
import Axios from '../../Network/axios';
import React, { useState, useEffect } from 'react';
import PopUpModal from '../../Components/popUpModal';

const DoctorsHomeScreen = () => {
    const navigation = useNavigation();
    const doctor = useSelector(currentDoctor);
    const patient = useSelector(currentPatient);
    const token = useSelector(defaultToken);
    const dispatch = useDispatch();
    
    const [gender, setGender] = useState("");
    const [patientList, setPatientList] = useState([]);

    const [logoutVisible, setLogoutVisible] = useState("");
    const [loading, setLoading] = useState(false);
  
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState("");
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await Axios.get('/user/');
        // console.log(response);
        if (response.status === 200) {
            dispatch(setCurrentDoctor(response.data));
            if(response.data.gender == 'male'){
                setGender('Male');
            } else if(response.data.gender == 'Female'){
                setGender('Female');
            }
        }

        const patientsListResponse = await Axios.get('/doctor/patients/');
        if (patientsListResponse.status === 200) {
            // console.log(patientsListResponse.data);
            setPatientList(patientsListResponse.data);
            console.log(patientList);
        }
    };

    const handleLogoutButton = () =>{
        setLogoutVisible(true);
    };

    const handleLogoutResult = (result) => {
        if (result) {
            setLoading(result);
            navigation.replace("Auth");
        }
    };

    const handleMoreDetailsPress = (index) => {
        dispatch(setCurrentPatient(patientList[index].user));
        console.log('patient:',patientList[index].user);
        navigation.navigate('Patients');
        console.log('More Details button pressed',patient);
    };
    return (
        <View style={styles.mainBody}>
            <View style={styles.upperSection}>
            <LogoutModal logoutVisible={logoutVisible} setLogoutVisible={setLogoutVisible} user={'doctor'} setUser={ setCurrentDoctor} token = {token} dispatch={dispatch} onLogout={handleLogoutResult}/>
            <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
            <Loader loading={loading} />
            <TouchableOpacity
                onPress={handleLogoutButton}
                style={{margin: 20}}>
                <Image source={images.logout} style={{width:40,height:40}}/>
            </TouchableOpacity>
            <View style={styles.profileField}>
                <View style={{flexDirection:'row'}}>
                {gender === "Male" ? (
                    <Image source={images.profileMale} style={{marginLeft: 30, height: 55, width: 55}} />
                ) : gender === "Female" ? (
                    <Image source={images.profileFemale} style={{marginLeft: 30, height: 55, width: 55}} />
                ) : null}
                    <View style={{flexDirection:"column",marginLeft:20,marginTop:5}}>
                        <Text style ={{fontSize:18,color:'#C3C9D3', fontWeight: 'bold'}}>Hello Dr,</Text>
                        {doctor && 
                        <Text style ={styles.profileText}>
                            {doctor.first_name} {doctor.last_name}
                        </Text>}
                    </View>
                </View>
            </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.lowerSection}>
                <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60}}>
                {patientList && 
                    <Text style ={styles.header}>
                        Patients' List
                    </Text>}
                </View>
            </View>
            <View style={styles.container}>
            {patientList == null ? (
                    <Text style ={[styles.header,{color:'red', marginTop:200}]}> No Patients Registered Yet !</Text>
                ) : patientList != null ? (
                    <MyTable patientList={patientList} handleMoreDetailsPress={handleMoreDetailsPress}/>
                    // <Text style ={[styles.header,{color:'red', marginTop:200}]}> No Patients Registered Yet !</Text>
                ) : null}
            {/* {patientList === null ? (
                    <Text style ={[styles.header,{color:'red', marginTop:200}]}> No Patients Registered Yet !</Text>
                ) : (
                    <MyTable patientList={patientList} handleMoreDetailsPress={handleMoreDetailsPress}/>
                )} */}
            </View>
        </ScrollView>
        <View style={styles.navBar}>
            <TouchableOpacity
                onPress={() => navigation.navigate('DoctorsHomeScreen')}
                style={[styles.navBarButton, styles.activeButton]}>
                <Image source={images.home} style={styles.navBarIcon} /> 
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('DoctorsEditProfile')}
                style={styles.navBarButton}>
                <Image source={images.profileGreen} style={styles.navBarIcon} /> 
            </TouchableOpacity>
        </View>
    </View>
    );
};

export default DoctorsHomeScreen;

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
        color:'#C3C9D3',
        fontSize:16,
    },
    lowerSection:{
        backgroundColor: colors.darkBlue,
    },
    header:{
        marginTop: 35,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: colors.darkBlue,
        fontSize: 20,
        fontWeight:"500",
    },
    scrollView: {
        flexDirection: 'row',
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
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
});
