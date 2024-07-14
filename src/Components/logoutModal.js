import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {images , colors} from '../assets/assets';
import {useNavigation} from '@react-navigation/native';
import { logout } from '../store/api';

const LogoutModal = ({logoutVisible,setLogoutVisible,user,setUser,token,dispatch,onLogout }) =>{
    const navigation = useNavigation();

    const loggingout = async () => {
        const result = await logout(user,setUser,token,dispatch);
        onLogout(result);
    };
    
    return(
        <Modal 
            transparent={true}
            animationType={'none'}
            visible={logoutVisible}
            onRequestClose={()=>setLogoutVisible(false)}
            >
            <TouchableWithoutFeedback onPress={()=>setLogoutVisible(false)}>
            <View style={styles.logoutCenteredView}>
                <View style={styles.logoutModalView}>
                    <View style={[styles.textModal,{padding:10}]}>
                        <Image source={images.logoutMintGreen} style={styles.icon} />
                        <Text style={styles.logoutText}>Are you sure you want to logout?</Text>
                    </View>
                    <View style={[styles.textModal,{padding:10}]}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={loggingout}>
                        <Text style={styles.closeButtonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={()=>setLogoutVisible(false)}>
                        <Text style={styles.closeButtonText}>No</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default LogoutModal;


const styles = StyleSheet.create({
    logoutModalView:{
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        elevation: 5,
        minWidth: '70%',
        maxWidth: '85%',
        marginTop: 100,
        flexDirection:'colomn',
    },
    logoutCenteredView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    closeButton: {
        alignItems:'center',
        borderRadius:20,
        backgroundColor:colors.darkBlue,
        padding:10,
    },
    closeButtonText: {
        color:colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft:10,
        marginRight:10,
    },
    textModal:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logoutText:{
        fontSize:16,
        color:colors.darkBlue,
    }
});
