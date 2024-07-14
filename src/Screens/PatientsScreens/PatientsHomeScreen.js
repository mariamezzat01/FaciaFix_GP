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
import {setCurrentPatient} from '../../store/slices/patient';
import {currentPatient} from '../../store/slices/patient';
import {defaultToken} from '../../store/slices/token';
import Axios from '../../Network/axios';
import {images , colors} from '../../assets/assets';
import Loader from '../../Components/loader';

import LogoutModal from '../../Components/logoutModal';

const PatientsHomeScreen = () => {
    const navigation = useNavigation();
    const patient = useSelector(currentPatient);
    const token = useSelector(defaultToken);
    const dispatch = useDispatch();
    const [gender, setGender] = useState("");
    
    const [logoutVisible, setLogoutVisible] = useState("");
    
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        const response = await Axios.get('/user/');
        if (response.status === 200) {
            dispatch(setCurrentPatient(response.data));
        }
        console.log('Data:', response.data);
        if(response.data.gender === 'male'){
            setGender('Male');
        } else{
            setGender('Female');
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

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <View style={styles.upperSection}>
                <LogoutModal logoutVisible={logoutVisible} setLogoutVisible={setLogoutVisible} user={'patient'} setUser={ setCurrentPatient} token = {token} dispatch={dispatch} onLogout={handleLogoutResult}/>
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
                            <Text style ={{fontSize:18,color:'#C3C9D3', fontWeight: 'bold'}}>Hello,</Text>
                            {patient && 
                            <Text style ={styles.profileText}>
                                {patient.first_name} {patient.last_name}
                            </Text>}
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.lowerSection}>
                    <View style ={{backgroundColor:colors.white ,borderTopRightRadius:60}}>
                        <Text style ={styles.header}>
                            What do you need?
                        </Text>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DoctorListScreen')}
                                style={styles.optionButton}>
                                <View  style={styles.option}>
                                    <Image source={images.stethoscope} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Doctors </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('PatientResults')}
                                style={styles.optionButton}>
                                <View  style={styles.option}>
                                    <Image source={images.results} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Results </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Assessment')}
                                style={styles.optionButton}> 
                                <View  style={styles.option}>
                                    <Image source={images.assessment} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Detailed assessment </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Progress')}
                                style={styles.optionButton}>
                                <View  style={styles.option}>
                                    <Image source={images.progress} style={{width:40,height:40}} /> 
                                    <Text style ={styles.optionText}> Progress </Text>
                                </View>
                            </TouchableOpacity>
                        </View >
                    </View>
                </View>
            </ScrollView>
            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatientsHomeScreen')}
                    style={[styles.navBarButton, styles.activeButton]}>
                    <Image source={images.home} style={styles.navBarIcon} /> 
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewScanScreen')}
                    style={styles.cameraButton}>
                    <Image source={images.add} style={{width:25,height:25,}} /> 
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatientsEditProfile')}
                    style={styles.navBarButton}>
                    <Image source={images.profileGreen} style={styles.navBarIcon} /> 
                </TouchableOpacity>
            </View>
        </View>
    );
// }
};

export default PatientsHomeScreen;

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
        marginTop: 60,
        marginLeft: 35,
        marginRight: 35,
        color: colors.darkBlue,
        fontSize: 20,
        fontWeight:"500",
    },
    optionsContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop:40,
        gap:30,
    },
    optionButton:{
        width:150,
        height:90,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.green,
    },
    option:{
        flexDirection:'column',
        alignItems:'center',
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
    activeButton:{
        backgroundColor:colors.mintGreen,
    },
    navBarIcon:{
        width:30,
        height:30,
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
