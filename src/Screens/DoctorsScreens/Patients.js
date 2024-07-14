import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,

} from 'react-native';

import React, { useState, useEffect } from 'react';


import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setCurrentDoctor} from '../../store/slices/doctor';
import {currentDoctor} from '../../store/slices/doctor';
import {setCurrentPatient} from '../../store/slices/patient';
import {currentPatient} from '../../store/slices/patient';
import {defaultToken} from '../../store/slices/token';
import {setToken} from '../../store/slices/token';
import Axios from '../../Network/axios';
import {images , colors} from '../../assets/assets';
import Loader from '../../Components/loader';
import LogoutModal from '../../Components/logoutModal';
import PopUpModal from '../../Components/popUpModal';

const Patients = () => {
    const navigation = useNavigation();
    const doctor = useSelector(currentDoctor);
    const patient = useSelector(currentPatient);
    const token = useSelector(defaultToken);
    const dispatch = useDispatch();

    const [gender, setGender] = useState("");
    const [logoutVisible, setLogoutVisible] = useState("");
    const [loading, setLoading] = useState(false);
  
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState("");

    const handleLogoutButton = () =>{
        setLogoutVisible(true);
    };
  
    const handleLogoutResult = (result) => {
      if (result) {
          setLoading(result);
          navigation.navigate("LoginScreen");
      }
    };

    useEffect(() => {
        if(doctor){
        if(doctor.gender === 'male'){
            setGender('Male');
        } else{
            setGender('Female');
        }}
    }, [patient,doctor]);
    
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
          ) : <Image source={images.profilePicture} style={{marginLeft: 30, height: 55, width: 55}} />}
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
                    <View style={styles.patientsInfo}>
                    {patient && 
                        <Text style={styles.patientsText}> {patient.first_name}'s {patient.last_name} Data </Text>}
                    </View>
                    <View style={styles.container}>
                        <Text style ={styles.header}>
                            What do you need?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PatientsData')}
                            style={styles.optionButton}>
                            {  
                            <View  style={styles.option}>
                                <Image source={images.stethoscope} style={{width:30,height:30}} /> 
                                <Text style ={styles.optionText}> Patient's Data </Text>
                            </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DoctorsProgress')}
                            style={styles.optionButton}>
                            {  
                            <View  style={styles.option}>
                                <Image source={images.progress} style={{width:30,height:30}} /> 
                                <Text style ={styles.optionText}> Progress </Text>
                            </View>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DoctorAssessment')}
                            style={styles.optionButton}>
                            {  
                            <View  style={styles.option}>
                                <Image source={images.assessment} style={{width:30,height:30}} /> 
                                <Text style ={styles.optionText}> Detailed assessment </Text>
                            </View>
                            }
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </ScrollView>
        <View style={styles.navBar}>
            <TouchableOpacity
                onPress={() => navigation.navigate('DoctorsHomeScreen')}
                style={styles.navBarButton}>
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

export default Patients;

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
        marginLeft: 35,
        marginRight: 35,
        color: colors.darkBlue,
        fontSize: 20,
        fontWeight:"500",
        alignSelf: 'flex-start',
    },
    optionButton:{
        marginTop:20,
        width:340,
        height:50,
        borderRadius:20,
        justifyContent:'center',
        backgroundColor:colors.green,
    },
    option:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:40,
        gap:20,
    },
    optionText:{
        fontSize:17,
        color:colors.white,
        textAlign:'center',
    },
    scrollView: {
        flexDirection: 'row',
        padding: 10,
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
    navBarIcon:{
        width:30,
        height:30,
        padding:10,
    },
    patientsInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50,
        width: 300,
        height: 50,
        marginTop: 40,
        borderRadius: 20,
        borderColor: colors.mintGreen,
        borderWidth: 1.5,
    },
    patientsText: {
        fontSize: 17,
        color: colors.darkBlue,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container:{
        borderRadius: 20,
        borderBottomColor: colors.mintGreen,
        borderLeftColor: colors.mintGreen,
        borderRightColor: colors.mintGreen,
        borderTopColor: colors.white,
        borderWidth: 1.5,
        marginLeft:10,
        marginRight:10,
        marginTop:30,
        paddingLeft: 10,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom:20,

    },
});