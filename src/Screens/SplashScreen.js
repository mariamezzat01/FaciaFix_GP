import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';
import {images , colors} from '../assets/assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/loader';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //     setAnimating(false);
    //     //Check if user_id is set or not
    //     //If not then send for Authentication
    //     //else send to Home Screen
    //     AsyncStorage.getItem('user_id').then(value =>
    //         navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
    //     );
    //     }, 5000);
    // }, [navigation]);

    useEffect(() => {
        setTimeout( async() => {
            setAnimating(false);
            const userType = await AsyncStorage.getItem('userType');
            if (userType === 'patient') {
                navigation.replace('PatientsScreens');
            } else if (userType === 'doctor') {
                navigation.replace('DoctorsScreen');
            } else {
                navigation.replace('Auth');
            }
        }, 5000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={images.faciaFixLogo}
                />
                <ActivityIndicator
                    animating={animating}
                    size="large"
                    color='#ffffff'
                    style={styles.activityIndicator}
                />
            </View>
            <View>
                <Text style ={styles.text}>
                    " The Simple Way for Early Diagnosis "
                </Text>
            </View>
        </View>
        
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.blueFF,
        justifyContent:'center',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 90,
        color:colors.white,
    },
    logo:{
        alignItems: 'center',
    },
    text:{
        fontSize: 28,
        textAlign: 'center',
        color: colors.white,
    },
    });


