/* eslint-disable prettier/prettier */
import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {images, colors} from '../../assets/assets';
import LogoutModal from '../../Components/logoutModal';
import CameraModal from '../../Components/cameraModal';
import {useNavigation} from '@react-navigation/native';
import {currentPatient, setCurrentPatient} from '../../store/slices/patient';
import { currentDoctor, setCurrentDoctor } from '../../store/slices/doctor';
import {defaultToken} from '../../store/slices/token';
import Axios from '../../Network/axios';
import Loader from '../../Components/loader';
import { useDispatch, useSelector } from 'react-redux';
import PopUpModal from '../../Components/popUpModal';

const DoctorItem = ({name, email, mobileNumber, workingDays,handleRegister}) => (
  <View
    style={styles.optionButton}>
      <View style={styles.textContainer}>
        <Text style={[styles.optionText,{fontWeight: 'bold',color:colors.darkGreen,alignSelf:"center",fontSize:16}]}>{name}</Text>
        <Text style={styles.optionText}>
          <Text style={{fontWeight: 'bold'}}>Email: </Text>
          {email}
        </Text>
        <Text style={styles.optionText}>
          <Text style={{fontWeight: 'bold'}}>Mobile Number: </Text>
          {mobileNumber}
        </Text>
        <Text style={styles.optionText}>
          <Text style={{fontWeight: 'bold'}}>Working Days: </Text>
          {workingDays && workingDays.length > 0 ? workingDays.join(', ') : 'No available days'}
        </Text>
        <TouchableOpacity onPress={handleRegister} style={{alignSelf:'center'}}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>
  </View>
);

const DoctorsListScreen = () => {
  const navigation = useNavigation();
  const [logoutVisible, setLogoutVisible] = useState("");
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState("");

  const [gender, setGender] = useState("");
  // const [workingDays, setGender] = useState([]]);

  const patient = useSelector(currentPatient);
  const myDoctor = useSelector(currentDoctor);
  
  const token = useSelector(defaultToken);
  const dispatch = useDispatch();

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    if(patient){
      if(patient.gender === 'male'){
        setGender('Male');
      } else{
          setGender('Female');
      }
      dispatch(setCurrentDoctor(patient.doctor));
      fetchData();
    };
  }, []);

  const fetchData = async () => {

    const doctorData = await Axios.get('/select-doctor/');

    if (doctorData.status === 200) {
      dispatch(setDoctorList(doctorData.data));
      console.log('doctor list',doctorData);
    } else {
    console.log('Error fetching doctor data:');
    }
  };

  const handleLogoutButton = () =>{
      setLogoutVisible(true);
  };

  const handleLogoutResult = (result) => {
    if (result) {
        setLoading(result);
        navigation.navigate("LoginScreen");
    }
  };

  const handleRegister = async (index) =>{
    setLoading(true);
    const selectedId= doctorList[index].id; 

    const formData = new FormData();
    formData.append('doctor_id',selectedId);
    
    const doctorRegister =  await Axios.post("/select-doctor/", formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
    });

      if (doctorRegister.status === 200 || doctorRegister.status === 201) {
        const patientData = await Axios.get('/user/');
        if (patientData.status === 200 || patientData.status === 201 ) {
          dispatch(setCurrentPatient(patientData.data));
          dispatch(setCurrentDoctor(patientData.data.doctor));
          console.log("doctor",patientData.data.doctor);
          setText(`Successfully registered to Dr. ${patientData.data.doctor.full_name}`);
          setModalVisible(true);
          setError(false);
        }
      }
      else{
        console.log('Error select doctor data:');
      }
    setLoading(false);
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.upperSection}>
        <LogoutModal logoutVisible={logoutVisible} setLogoutVisible={setLogoutVisible} user={'patient'} setUser={ setCurrentPatient} token = {token} dispatch={dispatch} onLogout={handleLogoutResult}/>
        <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
        <Loader loading={loading} />
        <TouchableOpacity
            onPress={handleLogoutButton}
            style={{margin: 20}}>
            <Image source={images.logout} style={{width:40,height:40}}/>
        </TouchableOpacity>
        <View style={styles.profileField}>
          <View style={{flexDirection: 'row'}}>
          {gender === "Male" ? (
          <Image source={images.profileMale} style={{marginLeft: 30, height: 55, width: 55}} />
          ) : gender === "Female" ? (
              <Image source={images.profileFemale} style={{marginLeft: 30, height: 55, width: 55}} />
          ) : <Image source={images.profilePicture} style={{marginLeft: 30, height: 55, width: 55}} />}
            <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 5}}>
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
          <View style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
            {/* <TouchableOpacity */}
              {/* onPress={() => navigation.navigate('LoginScreen')} */}
              <View style={styles.MyoptionField}>
              <View style={styles.MydoctorField}>
              {myDoctor == null? (
                <>
                <Text style={[styles.optionText,{alignSelf:"center",fontSize:16,color:colors.darkGreen,fontWeight: 'bold'}]}>
                  <Text>Your Doctor: </Text>
                </Text>
                <Text style={styles.optionText}>
                  <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                </Text>
                <Text style={styles.optionText}>
                  <Text style={{ fontWeight: 'bold' }}>Mobile Number: </Text>
                </Text>
                <Text style={styles.optionText}>
                  <Text style={{ fontWeight: 'bold' }}>Working Days: </Text>
                </Text>
              </>
                ) : (
                  <>
                  <Text style={[styles.optionText,{alignSelf:"center",fontSize:16,color:colors.darkGreen,fontWeight: 'bold'}]}>
                  <Text>Your Doctor: </Text>
                  {myDoctor.full_name}
                </Text>
                    <Text style={styles.optionText}>
                      <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                      {myDoctor.email}
                    </Text>
                    <Text style={styles.optionText}>
                      <Text style={{ fontWeight: 'bold' }}>Mobile Number: </Text>
                      {myDoctor.mobileNumber}
                    </Text>
                    <Text style={styles.optionText}>
                      <Text style={{ fontWeight: 'bold' }}>Working Days: </Text>
                      {myDoctor.working_days && myDoctor.working_days.length > 0 ? myDoctor.working_days.join(', ') : 'No available days'}
                    </Text>
                  </>
                 
                )}
              {/* {doctor && 
                <Text style={[styles.optionText,{alignSelf:"center",fontSize:16,color:colors.darkGreen,fontWeight: 'bold'}]}>
                  <Text>Your Doctor: </Text>
                  {doctor.full_name}
                </Text>}
              {doctor && 
                <Text style={styles.optionText}>
                  <Text style={{fontWeight: 'bold'}}>Email: </Text>
                  {doctor.email}
                </Text>}
              {doctor && 
                <Text style={styles.optionText}>
                  <Text style={{fontWeight: 'bold'}}>Mobile Number: </Text>
                  {doctor.mobileNumber}
                </Text>} */}
              {/* {doctor === null ? (
                <Text style={styles.optionText}>
                  <Text style={{fontWeight: 'bold'}}>Working days: </Text>
                  {doctor.mobileNumber}
                </Text>) : 
                (<Text style={styles.optionText}>
                  <Text style={{fontWeight: 'bold'}}>Working days: </Text>
                  {doctor.working_days && doctor.working_days.length > 0 ? doctor.working_days.join(', ') : 'No available days'}
                </Text>)} */}
                {/* <Text style={styles.optionText}>
                  <Text style={{ fontWeight: 'bold' }}>Working Days: </Text>
                  {doctor && doctor.working_days && doctor.working_days.length > 0 ? doctor.working_days.join(', ') : 'No available days'}
                </Text> */}
              </View>
            </View>
            <Text style={styles.header}>Doctors’ List</Text>
            <View style={styles.optionsContainer}>
            {doctorList.map((doctor, index) => (
              <DoctorItem
                key={index}
                name={doctor.full_name}
                email={doctor.email}
                mobileNumber={doctor.mobileNumber}
                workingDays={doctor.working_days}
                handleRegister= {() => handleRegister(index)}
              />
            ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity
            onPress={() => navigation.navigate('PatientsHomeScreen')}
            style={styles.navBarButton}>
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
};

export default DoctorsListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: 'center',
  },
  upperSection: {
    margin: 0,
    height: 180,
    backgroundColor: colors.darkBlue,
    borderBottomLeftRadius: 60,
  },
  scrollView: {
    flexDirection: 'row',
    padding: 10,
  },
  profileField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
  },
  MydoctorField: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: colors.borderColor,
    borderWidth: 2,
    borderRadius: 10,
    width: 350,
    height: 100,
    marginTop:10,
    backgroundColor:colors.white,
    padding:20,
  },
  MyoptionField: {
    width: 350,
    height: 100,
    marginTop: 30,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    elevation:3,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent:'center',
    alignItems:'flex-start',
  },
  profileText: {
    color: '#C3C9D3',
    fontSize: 16,
  },
  lowerSection: {
    backgroundColor: colors.darkBlue,
  },
  header: {
    marginTop: 30,
    alignSelf:'center',
    color: colors.darkBlue,
    fontSize: 19,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginTop:20,
    marginBottom:30,
  },
  optionButton: {
    width: 350,
    minHeight: 110,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mintGreen,
    borderWidth: 1.5,
    borderColor: colors.green,
    elevation:5,
    padding:10,
  },
  optionText: {
    fontSize: 14,
    color: colors.darkBlue,
    textAlign: 'center',
  },
  register: {
    fontSize: 14,
    color: colors.darkBlue,
    fontWeight:"bold",
    textDecorationLine: 'underline',
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
