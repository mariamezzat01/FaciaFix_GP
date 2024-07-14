import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import {images , colors} from '../assets/assets';

const PopUpModal = ({modalVisible,setModalVisible,error,text }) =>{

    
    return(
        <Modal 
            transparent={true}
            animationType={'none'}
            visible={modalVisible}
            onRequestClose={()=>setModalVisible(false)}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.textModal}>
                    {error === true ? (
                        <Image source={images.error} style={styles.icon} />
                    ) : (
                        <Image source={images.check} style={styles.icon} />
                    )}
                    {error === true ? (
                        <Text style={[styles.textStyle,{color:"red"}]}>{text}</Text>
                    ) : (
                        <Text style={styles.textStyle}>{text}</Text>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={()=>setModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                </View>
                </View>
        </Modal>
    );
};

export default PopUpModal;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView:{
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 15,
        elevation: 5,
        minWidth: '70%',
        maxWidth: '85%',
        marginTop: 22,
        flexDirection:'colomn',
    },
    textModal:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10,
        marginRight:10,
    },
    icon: {
        width: 25,
        height: 25,
        margin: 8,
        marginRight: 10,
        marginLeft: 10,
    },
    textStyle: {
        color: colors.green,
        textAlign: "center",
        fontSize: 16,
        fontWeight:'bold',
    },
    closeButton: {
        alignItems:'flex-end',
    },
    closeButtonText: {
        color: colors.blueLogo,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft:10,
        marginRight:10,
    },
});
