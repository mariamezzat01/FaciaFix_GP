/* eslint-disable prettier/prettier */
import React, {useState, createRef, useEffect} from 'react';
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

import {images, colors} from '../../assets/assets';
import LogoutModal from '../../Components/logoutModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { currentDoctor, setCurrentDoctor } from '../../store/slices/doctor';
import { currentPatient } from '../../store/slices/patient';
import { defaultToken } from '../../store/slices/token';
import Loader from '../../Components/loader';
import PopUpModal from '../../Components/popUpModal';

const PatientsData = () => {
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

  useEffect(() => {
    if (doctor) {
    if(doctor.gender === 'male'){
        setGender('Male');
      } else{
          setGender('Female');
      }}
}, [patient,doctor]);

const handleLogoutButton = () =>{
  setLogoutVisible(true);
};

const handleLogoutResult = (result) => {
if (result) {
    setLoading(result);
    navigation.navigate("LoginScreen");
}
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
                    <View style={{flexDirection: 'row'}}>
                    {gender === "Male" ? (
          <Image source={images.profileMale} style={{marginLeft: 30, height: 55, width: 55}} />
          ) : gender === "Female" ? (
              <Image source={images.profileFemale} style={{marginLeft: 30, height: 55, width: 55}} />
          ) : <Image source={images.profilePicture} style={{marginLeft: 30, height: 55, width: 55}} />}
                        <View
                        style={{flexDirection: 'column', marginLeft: 20, marginTop: 5}}>
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
                <View style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
                  <View style={styles.heading}>
                    <Image
                    source={images.data}
                    style={{width: 40, height: 40}}
                    />
                    <Text style={styles.header}>Patient's Data</Text>
                  </View>

                  <View style={styles.dataField}>
                    <Text style={styles.dataTitle}> Full Name {' '} </Text>
                    {patient && 
                    <Text style={[styles.result,{marginRight:20}]}> {patient.first_name} {patient.last_name} </Text>}
                  </View>

                  <View style={styles.dataField}>
                    <Text style={styles.dataTitle}> Gender {' '} </Text>
                    {patient && 
                    <Text style={[styles.result,{marginRight:20}]}> {patient.gender} </Text>}
                  </View>

                  <View style={styles.dataField}>
                    <Text style={styles.dataTitle}> Age {' '} </Text>
                    {patient && 
                    <Text style={[styles.result,{marginRight:20}]}> {patient.age} </Text>}
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.imageHeader}>Eyebrow Details </Text>
                    {patient && 
                    <Image source={{ uri: patient.original_image_eyebrows}} style={styles.scannedImage} />}
                    <View style={styles.diagnosisField}>
                      <Text style={styles.diagnosisTitle}> Classification</Text>
                      <View style={styles.resultField}>
                        {patient && 
                        <Text style={styles.result}> {patient.eyebrow_classification} </Text>}
                      </View>
                    </View>
                  </View>
                  <View style={styles.container}>
                <Text style={[styles.imageHeader, {marginTop:20}]}>Eye Details </Text>
                {patient && 
                <Image source={{ uri: patient.original_image_eye}} style={styles.scannedImage} />}
                <View style={styles.diagnosisField}>
                  <Text style={styles.diagnosisTitle}> Classification</Text>
                  <View style={styles.resultField}>
                    {patient && 
                    <Text style={styles.result}> {patient.eye_classification} </Text>}
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <Text style={[styles.imageHeader, {marginTop:20}]}>Mouth Details</Text>
                {patient && 
                <Image source={{ uri: patient.original_image_mouth}} style={styles.scannedImage} />}
                <View style={styles.diagnosisField}>
                  <Text style={styles.diagnosisTitle}> Classification</Text>
                  <View style={styles.resultField}>
                    {patient && 
                    <Text style={styles.result}> {patient.mouth_classification} </Text>}
                  </View>
                </View>
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
export default PatientsData;

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
  profileField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
  },
  profileText: {
    color: '#C3C9D3',
    fontSize: 16,
  },
  lowerSection: {
    backgroundColor: colors.darkBlue,
    marginBottom: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
    gap: 20,
  },
  header: {
    color: colors.darkBlue,
    fontSize: 20,
    fontWeight: '500',
  },
  imageHeader: {
    fontSize: 17,
    marginTop:20,
    color: colors.darkBlue,
    fontWeight:'bold',
    marginLeft: 20,
  },
  scannedImage: {
    borderColor: colors.darkBlue,
    borderWidth: 2,
    height: 300,
    width: 300,
    marginTop: 10,
    borderRadius: 20,
    marginBottom:10,
    marginLeft: 20,
  },
  dataField: {
    backgroundColor:colors.mintGreen,
    height: 35,
    width: 370,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:10,
  },
  dataTitle: {
    color: colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
  },
  result: {
    color: colors.darkBlue,
    fontSize: 17,
    textAlign: 'center',
  },
  resultField: {
    backgroundColor: colors.white,
    height: 50,
    width: 200,
    borderRadius: 20,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center',
  },
  diagnosisTitle: {
    color: colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
  },

  navBar: {
    height: 50,
    borderWidth: 1.5,
    borderColor: colors.mintGreen,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBarButton: {
    borderRadius: 40,
    width: 50,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  activeButton: {
    backgroundColor: colors.mintGreen,
  },
  navBarIcon: {
    width: 30,
    height: 30,
    padding: 10,
  },
  cameraButton: {
    backgroundColor: colors.green,
    width: 60,
    height: 60,
    borderRadius: 40,
    borderColor: '#DCDCDC',
    borderTopWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 5,
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    justifyContent:'center',
    marginBottom:10,
    marginLeft: 20,
    marginRight: 20,
  },
  diagnosisField: {
    backgroundColor:colors.mintGreen,
    height: 70,
    width: 370,
    marginTop: 10,
    borderRadius: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:10,
    alignSelf:'center',
  },

});
