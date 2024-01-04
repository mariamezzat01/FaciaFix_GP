// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, Text} from 'react-native';
import {images , colors} from '../assets/assets';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        AsyncStorage.getItem('user_id').then(value =>
            navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
        );
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
                    color="#FFFFFF"
                    size="large"
                    style={styles.activityIndicator}
                />
            </View>
            <View>
                <Text style ={styles.text}>
                    " The simple way for early diagnosis "
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
    },
    activityIndicator: {
        alignItems: 'center',
        height: 90,
    },
    logo:{
        marginTop: 100,
        alignItems: 'center',
    },
    text:{
        fontSize: 28,
        textAlign: 'center',
        color: colors.white,
    },
    });
