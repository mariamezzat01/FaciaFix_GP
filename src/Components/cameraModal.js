import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import {images , colors} from '../assets/assets';


const CameraModal = ({cameraVisible,setCameraVisible }) =>{
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState('');
    const [image, setImage] = useState('');

    const uploadImage = async() =>{
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
            setImageUri(selectedImage.uri);
            setImage(selectedImage);
            console.log('Image:', imageUri);
        } catch (error) {
            console.log('Image picker error:', error);
        }
        setCameraVisible(false);
    };

    const checkAndRequestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (status) {
                opencamera();
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
                opencamera();
                } else {
                console.log('Camera permission denied');
                }
            }
        } else {
            const status = await check(PERMISSIONS.IOS.CAMERA);
            if (status === RESULTS.GRANTED) {
                opencamera();
            } else {
                const result = await request(PERMISSIONS.IOS.CAMERA);
                if (result === RESULTS.GRANTED) {
                    opencamera();
                } else {
                    console.log('Camera permission denied');
                }
            }
        }
        setCameraVisible(false);
    };

    const opencamera = async () => {
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
            setImageUri(selectedImage.uri);
            setImage(selectedImage);
            console.log('Image:', imageUri);
        }
    };


    return(
        <Modal 
        transparent={true}
        animationType={'none'}
        visible={cameraVisible}
        onRequestClose={()=>setCameraVisible(false)}>
        <TouchableWithoutFeedback onPress={()=>setCameraVisible(false)}>
        <View style={styles.cameraCenteredView}>
        <View style={styles.cameraModalView}>
            <View style={[styles.textModal,{padding:5}]}>
                <TouchableOpacity
                    style={styles.cameraCloseButton}
                    onPress={uploadImage}>
                        <Image source={images.uploadImage} style={styles.icon} />
                        <Text style={styles.cameraButtonText}>Upload Image</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.textModal,{padding:5}]}>
                <TouchableOpacity
                    style={styles.cameraCloseButton}
                    onPress={checkAndRequestCameraPermission}>
                        <Image source={images.openCamera} style={styles.icon} />
                        <Text style={styles.cameraButtonText}>Open Camera</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
</Modal>
    );
};

export default CameraModal;


const styles = StyleSheet.create({
    cameraModalView:{
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 5,
        minWidth: '50%',
        maxWidth: '85%',
        marginLeft:200,
        marginRight:20,
        marginBottom: 90,
        padding:10,
        flexDirection:'colomn',
    },
    cameraCenteredView: {
        flex: 1,
        zIndex:1,
        alignItems: 'center',
        justifyContent:'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    cameraCloseButton:{
        flexDirection:'row',
        alignItems:'center',
    },
    cameraButtonText:{
        color:colors.darkBlue,
        fontSize:16,
    },
    textModal:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        margin: 8,
        marginRight: 10,
        marginLeft: 10,
    }

});
