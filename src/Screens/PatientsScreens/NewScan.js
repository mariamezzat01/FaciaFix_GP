/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    ScrollView,
} from 'react-native';

import {images, colors} from '../../assets/assets';
import {setCurrentPatient} from '../../store/slices/patient';
import {currentPatient} from '../../store/slices/patient';
import { defaultToken } from '../../store/slices/token';
import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import LogoutModal from '../../Components/logoutModal';
import { launchCamera } from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import PopUpModal from '../../Components/popUpModal';
import Axios from '../../Network/axios';
import Loader from '../../Components/loader';



const NewScanScreen = () => {
  const navigation = useNavigation();
  const patient = useSelector(currentPatient);
  const token =useSelector(defaultToken);
  const dispatch = useDispatch();
  const [logoutVisible, setLogoutVisible] = useState("");
  const [loading, setLoading] = useState("");
  const [gender, setGender] = useState("");
  
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState("");


  const [eyeUri, setEyeUri] = useState('');
    const [eyeImage, setEyeImage] = useState('');
    
    const [mouthUri, setMouthUri] = useState('');
    const [mouthImage, setMouthImage] = useState('');
    
    const [eyebrowUri, setEyebrowUri] = useState('');
    const [eyebrowsImage, setEyeBrowImage] = useState('');
  useEffect(() => {
    if(patient.gender === 'male'){
      setGender('Male');
  } else{
      setGender('Female');
  }
// setGender('Female');
  }, []);


  const handleLogoutButton = () =>{
    setLogoutVisible(true);
  };


  const handleLogoutResult = (result) => {
    if (result) {
        setLoading(result);
        navigation.navigate("LoginScreen");
    }
  };

  const uploadImage = async (type) => {
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

const checkAndRequestCameraPermission = async (type) => {
    if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (status) {
            opencamera(type);
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message:
                    'App needs access to your camera so you can take pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            opencamera(type);
            } else {
            console.log('Camera permission denied');
            }
        }
    } else {
        const status = await check(PERMISSIONS.IOS.CAMERA);
        if (status === RESULTS.GRANTED) {
            opencamera(type);
        } else {
            const result = await request(PERMISSIONS.IOS.CAMERA);
            if (result === RESULTS.GRANTED) {
                opencamera(type);
            } else {
                console.log('Camera permission denied');
            }
        }
    }
};

const opencamera = async (type) => {
    const options = {
        mediaType: 'photo',
        saveToPhotos: true,
    };
    const result = await launchCamera(options);
    if (result.didCancel) {
        console.log('User cancelled image picker');
    } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
    } else if (result.assets) {
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
    }
};

const handleUpdate = async () => {
  setLoading(true);
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

    const formData = new FormData();

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

    const editResponse = await Axios.patch("/user/edit/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("editResponse1:", editResponse);
      if (editResponse.status === 200 || editResponse.status === 201) {
        const response = await Axios.get("/user/");
        dispatch(setCurrentPatient(response.data));
        setText('Successfully Updated!');
        setModalVisible(true);
        setError(false);
      } else {
        setText(response.data.non_field_errors);
        setModalVisible(true);
        setError(true);
      }
      setLoading(false);
};

  return (
    <View style={styles.mainBody}>
      <View style={styles.upperSection}>
      <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
      <Loader loading={loading}/>
      <LogoutModal logoutVisible={logoutVisible} setLogoutVisible={setLogoutVisible} user={'patient'} setUser={ setCurrentPatient} token = {token} dispatch={dispatch} onLogout={handleLogoutResult}/>
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
              source={images.scan}
              style={{width: 40, height: 40}}
              />
              <Text style={styles.header}>Add New Scan</Text>
            </View>
            <View style={styles.container}>
              <Text style={[styles.imageHeader, {marginTop:20}]}>Eyebrow Image </Text>
              <View style={styles.buttonFields}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => checkAndRequestCameraPermission('eyebrow')}>
                <Text style={styles.buttonTextStyle}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => uploadImage('eyebrow')}>
                <Text style={styles.buttonTextStyle}>Upload Image</Text>
              </TouchableOpacity>
              </View>
              <View style={[styles.scannedImage,{borderColor: colors.darkBlue, borderWidth: 2,borderRadius: 20}]}>
                {eyebrowUri && 
                <Image source={{ uri: eyebrowUri}} style={styles.scannedImage} />}
              </View>
            </View>
            <View style={styles.container}>
              <Text style={[styles.imageHeader, {marginTop:20}]}>Eye Image </Text>
              <View style={styles.buttonFields}>
              <TouchableOpacity
                style={styles.buttonStyle}
                
                onPress={ () => checkAndRequestCameraPermission('eye')}>
                <Text style={styles.buttonTextStyle}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                
                onPress={() => uploadImage('eye')}>
                <Text style={styles.buttonTextStyle}>Upload Image</Text>
              </TouchableOpacity>
              </View>
              <View style={[styles.scannedImage,{borderColor: colors.darkBlue, borderWidth: 2,borderRadius: 20}]}>
                {eyeUri && 
                <Image source={{ uri: eyeUri}} style={styles.scannedImage} />}
              </View>
            </View>
            <View style={styles.container}>
              <Text style={[styles.imageHeader, {marginTop:20}]}>Mouth Image </Text>
              <View style={styles.buttonFields}>
              <TouchableOpacity
                style={styles.buttonStyle}
                
                onPress={() =>checkAndRequestCameraPermission('mouth')}>
                <Text style={styles.buttonTextStyle}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => uploadImage('mouth')}>
                <Text style={styles.buttonTextStyle}>Upload Image</Text>
              </TouchableOpacity>
              </View>
              <View style={[styles.scannedImage,{borderColor: colors.darkBlue, borderWidth: 2,borderRadius: 20}]}>
                {mouthUri && 
                <Image source={{ uri: mouthUri}} style={styles.scannedImage}  />}
              </View>
            </View>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity
                style={[styles.buttonStyle,{width:250}]}
                onPress={handleUpdate}>
                <Text style={styles.buttonTextStyle}>Update</Text>
              </TouchableOpacity>
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
          onPress={() => navigation.navigate('PatientsEditProfile')}
          style={[styles.navBarButton]}>
          <Image source={images.profileGreen} style={styles.navBarIcon} />
        </TouchableOpacity>
</View>
    </View>
  );
};
export default NewScanScreen;

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
    marginBottom:30,
  },
  scannedImage: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  buttonFields: {
    height: 35,
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:30,
    paddingLeft:30,
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

  buttonStyle: {
    backgroundColor: colors.green,
    color: colors.white,
    width: 150,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 25,
    justifyContent:'center',
  },
  buttonTextStyle: {
    color: colors.white,
    fontSize: 16,
  },
});
