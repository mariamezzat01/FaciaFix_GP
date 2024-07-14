/* eslint-disable prettier/prettier */
import React, {useState, useEffect,createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {images, colors} from '../../assets/assets';
import {setCurrentPatient} from '../../store/slices/patient';
import {currentPatient} from '../../store/slices/patient';
import {useSelector, useDispatch} from 'react-redux';
import LogoutModal from '../../Components/logoutModal';
import CameraModal from '../../Components/cameraModal';
import { defaultToken } from '../../store/slices/token';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Components/loader';
import PopUpModal from '../../Components/popUpModal';

const Assessment = () => {
  const navigation = useNavigation();
  const patient = useSelector(currentPatient);
  const token =useSelector(defaultToken);
  const dispatch = useDispatch();

    const [logoutVisible, setLogoutVisible] = useState("");
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if(patient.gender === 'male'){
      setGender('Male');
  } else{
      setGender('Female');
  }
  }, []);

  const handleCameraButton = () =>{
    setCameraVisible(true);
  };

  const handleLogoutButton = () =>{
    setLogoutVisible(true);
  };

  const formatToTwoDecimalPlaces = (number) => {
    return parseFloat(number).toFixed(2);
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
          <View style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
            <View style={styles.heading}>
              <Image
              source={images.resultsBlue}
              style={{width: 40, height: 40}}
              />
              <Text style={styles.header}>Detailed Assessment</Text>
            </View>
            <View style={styles.container}>
              <Text style={[styles.imageHeader, {marginTop:20}]}>Eyebrow Image </Text>
              {patient && 
              <Image source={{ uri: patient.filtered_image_eyebrows}} style={styles.scannedImage} />}
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Left Distance</Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}> {formatToTwoDecimalPlaces(patient.left_eyebrow_distance)} </Text>}
              </View>
              </View>
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Right Distance </Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.right_eyebrow_distance)}</Text>}
              </View>
              </View>
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Distance Difference </Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.abs_difference_eyebrows)} </Text>}
              </View>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.imageHeader}>Eye Image </Text>
              {patient && 
              <Image source={{ uri: patient.filtered_image_eye}} style={styles.scannedImage} />}
              <View style={styles.diagnosisField}>
                <View>
                  <Text style={styles.diagnosisTitle}>Left Eye Area{' '} </Text>
                </View>
                <View style={styles.resultField}>
                {patient && 
                  <Text style={styles.result}> {formatToTwoDecimalPlaces(patient.left_eye_area)}</Text>}
                </View>
              </View>
              <View style={styles.diagnosisField}>
                <View >
                  <Text style={styles.diagnosisTitle}>Right Eye Area{' '} </Text>
                </View>
                <View style={styles.resultField}>
                {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.right_eye_area)} </Text>}
                </View>
              </View>
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Distance Difference </Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.abs_difference_eye)} </Text>}
              </View>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.imageHeader}>Mouth Image </Text>
              {patient && 
              <Image source={{ uri: patient.filtered_image_mouth}} style={styles.scannedImage} />}
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Right Mouth Distance </Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.right_mouth_distance)} </Text>}
              </View>
              </View>
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Left Mouth Distance{' '} </Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.left_mouth_distance)} </Text>}
              </View>
              </View>
              <View style={styles.diagnosisField}>
              <View>
                  <Text style={styles.diagnosisTitle}> Distance Difference </Text>
              </View>
              <View style={styles.resultField}>
              {patient && 
                  <Text style={styles.result}>{formatToTwoDecimalPlaces(patient.abs_difference_mouth)} </Text>}
              </View>
              </View>
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
export default Assessment;

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
    fontSize: 20,
    textAlign: 'center',
    color: colors.darkBlue,
    fontWeight:'bold',
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:40,
  },
  scannedImage: {
    borderColor: colors.darkBlue,
    borderWidth: 2,
    height: 300,
    width: 300,
    marginTop: 10,
    borderRadius: 20,
    marginBottom:20,
  },
  diagnosisField: {
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
  diagnosisTitle: {
    color: colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
  },
  resultField: {
    backgroundColor: colors.white,
    height: 25,
    width: 100,
    borderRadius: 20,
  },
  result: {
    color: colors.darkBlue,
    fontSize: 17,
    textAlign: 'center',
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
});
