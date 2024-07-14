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

import { PopulationPyramid } from "react-native-gifted-charts";
import PopUpModal from '../../Components/popUpModal';
import { currentDoctor, setCurrentDoctor } from '../../store/slices/doctor';



const DoctorsProgress = () => {
    const navigation = useNavigation();
    const patient = useSelector(currentPatient);
    const doctor= useSelector(currentDoctor);
    const token =useSelector(defaultToken);
    const dispatch = useDispatch();

    const [logoutVisible, setLogoutVisible] = useState("");
    const [loading, setLoading] = useState(false);
  
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [modalVisible, setModalVisible] = useState("");

    const [gender, setGender] = useState("");

    const [eyeData, setEyeData] = useState([]);
    const [eyebrowData, setEyebrowData] = useState([]);
    const [mouthData, setMouthData] = useState([]);

    useEffect(() => {
        if(doctor){
        fetchProgress();
        if(doctor.gender === 'male'){
            setGender('Male');
        } else{
            setGender('Female');
        }}
    }, [patient,doctor]);

    const fetchProgress = async () => {
        const response = await Axios.get('/progress/');
            if (response.status === 200) {
            const {
                previous_right_eye_area: rightEyeArea,
                previous_left_eye_area: leftEyeArea,
                previous_right_eyebrow_distance: rightEyebrowDistance,
                previous_left_eyebrow_distance: leftEyebrowDistance,
                previous_right_mouth_distance: rightMouthDistance,
                previous_left_mouth_distance: leftMouthDistance
            } = response.data[0].user;

            if (rightEyeArea == null && rightEyebrowDistance==null && rightMouthDistance==null){
                const eyeAreaData = [{left: formatToTwoDecimalPlaces(patient.left_eye_area), right: formatToTwoDecimalPlaces(patient.right_eye_area), yAxisLabel: "1"}];
                const eyebrowDistanceData = [{left: formatToTwoDecimalPlaces(patient.left_eyebrow_distance), right: formatToTwoDecimalPlaces(patient.right_eyebrow_distance), yAxisLabel: "1"}];
                const mouthDistanceData = [{left: formatToTwoDecimalPlaces(patient.left_mouth_distance), right: formatToTwoDecimalPlaces(patient.right_mouth_distance), yAxisLabel: "1"}];
                setEyeData(eyeAreaData);
                setEyebrowData(eyebrowDistanceData);
                setMouthData(mouthDistanceData);
            } else {
                const reversedLeftEyeArea = leftEyeArea.reverse();
                const reversedLeftEyebrowDistance = leftEyebrowDistance.reverse();
                const reversedLeftMouthDistance = leftMouthDistance.reverse();

                const eyeAreaData = rightEyeArea.reverse().map((right, index) => ({
                    right: formatToTwoDecimalPlaces(right),
                    left: formatToTwoDecimalPlaces(reversedLeftEyeArea[index]),
                    yAxisLabel: `scan ${rightEyeArea.length - index}`
                }));

                const eyebrowDistanceData = rightEyebrowDistance.reverse().map((right, index) => ({
                    right: formatToTwoDecimalPlaces(right),
                    left: formatToTwoDecimalPlaces(reversedLeftEyebrowDistance[index]),
                    yAxisLabel: `${rightEyebrowDistance.length - index}`
                }));

                const mouthDistanceData = rightMouthDistance.reverse().map((right, index) => ({
                    right: formatToTwoDecimalPlaces(right),
                    left: formatToTwoDecimalPlaces(reversedLeftMouthDistance[index]),
                    yAxisLabel: `${rightMouthDistance.length - index}`
                }));

                setEyeData(eyeAreaData);
                setEyebrowData(eyebrowDistanceData);
                setMouthData(mouthDistanceData);
            };}
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

    const renderTitle = (title) => {
        return(
            <View>
                <Text style={{ color: colors.blueFF,fontSize: 16,textAlign:"center"}}>{title}</Text>
            <View
                style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
                marginBottom:20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                    style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: colors.blueLogo,
                    marginRight: 8,
                    }}
                />
                <Text
                    style={{
                    width: 60,
                    color: colors.blueLogo,
                    fontWeight:'bold',
                    }}>
                    Left
                </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                    style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: colors.green,
                    marginRight: 8,
                    }}
                />
                <Text
                    style={{
                    width: 60,
                    color: colors.green,
                    fontWeight:'bold',
                    }}>
                    Right
                </Text>
                </View>
            </View>
            </View>
        )
    }


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
                    <View style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
                        <View style={styles.heading}>
                            <Image
                            source={images.blueProgress}
                            style={{width: 40, height: 40}}
                            />
                            <Text style={styles.header}>Progress among Scans</Text>
                        </View>
                        <View style={styles.barChart}>
                            {renderTitle("Eye Areas")}
                            <PopulationPyramid 
                            data={eyeData} 
                            showValuesAsBarLabels
                            width={360}
                            height={300}
                            barBorderRadius={5}
                            barLabelColor={colors.blueFF}
                            stepHeight={25}
                            
                            xAxisColor={colors.blueLogo}
                            xAxisLabelColor={colors.blueFF}
                            xAxisIndicesColor={colors.blueFF}

                            yAxisColor={colors.blueLogo}
                            yAxisLabelColor={colors.blueFF}
                            showYAxisIndices={true}
                            yAxisIndicesColor={colors.blueFF}
                            yAxisLabelWidth={15}

                            rightBarColor={colors.green}
                            leftBarColor={colors.blueLogo}
                            leftBarLabelWidth={45}
                            rightBarLabelWidth={45}
                            />
                        </View>
                        <View style={styles.barChart}>
                            {renderTitle("Eyebrows Distances")}
                            <PopulationPyramid 
                            data={eyebrowData} 
                            showValuesAsBarLabels
                            width={360}
                            height={300}
                            barBorderRadius={5}
                            barLabelColor={colors.blueFF}
                            stepHeight={25}
                            
                            xAxisColor={colors.blueLogo}
                            xAxisLabelColor={colors.blueFF}
                            xAxisIndicesColor={colors.blueFF}

                            yAxisColor={colors.blueLogo}
                            yAxisLabelColor={colors.blueFF}
                            showYAxisIndices={true}
                            yAxisIndicesColor={colors.blueFF}
                            yAxisLabelWidth={15}

                            rightBarColor={colors.green}
                            leftBarColor={colors.blueLogo}
                            leftBarLabelWidth={45}
                            rightBarLabelWidth={45}
                            />
                        </View>
                        <View style={styles.barChart}>
                            {renderTitle("Mouth Distances")}
                            <PopulationPyramid 
                            data={mouthData} 
                            showValuesAsBarLabels
                            width={360 }
                            height={300}
                            barBorderRadius={5}
                            barLabelColor={colors.blueFF}
                            stepHeight={25}
                            
                            xAxisColor={colors.blueLogo}
                            xAxisLabelColor={colors.blueFF}
                            xAxisIndicesColor={colors.blueFF}

                            yAxisColor={colors.blueLogo}
                            yAxisLabelColor={colors.blueFF}
                            showYAxisIndices={true}
                            yAxisIndicesColor={colors.blueFF}
                            yAxisLabelWidth={15}

                            rightBarColor={colors.green}
                            leftBarColor={colors.blueLogo}
                            leftBarLabelWidth={45}
                            rightBarLabelWidth={45}
                            />
                        </View>
                    </View>
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
    barChart:{
        width:'90%',
        margin:20,
        // marginTop:30,
        // borderWidth:2,
        // padding:10,
    }
  });
  

export default DoctorsProgress;
