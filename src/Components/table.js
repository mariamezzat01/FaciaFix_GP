// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { images, colors } from '../assets/assets';
// import { useNavigation } from '@react-navigation/native';

// const MyTable =() => {
//     const navigation = useNavigation();
//     const backendData = [
//         { name: 'Amira Mohamed', startDate: ' 28.10.23' },
//         { name: 'Doha Eid', startDate: '8.1.23' },
//         { name: 'Mariam Mohamed ', startDate: '2.4.22' },
//         { name: 'Maye Khaled', startDate: '15.11.22' },
//         { name: 'Mayar Ehab', startDate: '7.5.21' },
//     ];
//     const moreDetailsContent = 'More Details';
//     const deleteImage = images.delete;

//     const handleMoreDetailsPress = () => {
//         navigation.navigate('LoginScreen')
//         console.log('More Details button pressed');
//     };

//     return (
//         <View style={styles.tableContainer}>
//             {/* Header Row */}
//             <View style={styles.header}>
//                 <View style={[styles.cell, { flex: 1 }]}>
//                     <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Name</Text>
//                 </View>
//                 <View style={[styles.cell, { flex: 1 }]}>
//                     <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Started Date</Text>
//                 </View>
//                 <View style={[styles.cell, { flex: 2 }]}>
//                 </View>
                
//             </View>

//             {/* Table Rows */}
//             {backendData.map((rowData, rowIndex) => (
//                 <View key={rowIndex} style={styles.row}>
//                     <View style={[styles.cell, { flex: 1 }]}>
//                         <Text style={styles.cellText}>{rowData.name}</Text>
//                     </View>
//                     <View style={[styles.cell, { flex: 1 }]}>
//                         <Text style={styles.cellText}>{rowData.startDate}</Text>
//                     </View>
//                     <View style={[styles.cell, { flex: 1 }]}>
//                         {/* Use TouchableOpacity to make the text a button */}
//                         <TouchableOpacity
//                          onPress={handleMoreDetailsPress}>
//                             <Text style={[styles.cellText, styles.buttonText]}>{moreDetailsContent}</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={[styles.cell, { flex: 1 }]}>
//                         {/* Use Image component instead of Text */}
//                         <Image source={deleteImage} style={styles.image} />
//                     </View>
//                 </View>
//             ))}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     tableContainer: {
//         flex: 1,
//         marginRight: 30,
//         marginLeft: 30,
//         marginTop:30,
//         borderStyle: 'solid',
//         borderWidth: 3,
//         borderRadius: 15,
//         borderColor: colors.green,
//         marginBottom:30,
//     },
//     header: {
//         flexDirection: 'row',
//         backgroundColor: colors.mintGreen,
//         borderStyle: 'solid',
//         borderBottomColor: colors.green,
//         borderBottomWidth: 3,
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12,
//     },
//     row: {
//         flexDirection: 'row',
//         borderBottomColor: colors.green,
//         borderBottomWidth: 1, // Add border bottom for rows
//     },
//     cell: {
//         paddingVertical: 12,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRightColor: colors.green,
//         borderRightWidth: 1, // Add border right for cells
//     },
//     cellText: {
//         fontSize: 18,
//         color: colors.darkBlue,
//         textAlign: 'center',
//     },
//     image: {
//         width: 35, 
//         height: 35, 
//     },

//     buttonText: {
//         textDecorationLine: 'underline',
//     },
// });

// export default MyTable;


import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { images, colors } from '../assets/assets';
import { useNavigation } from '@react-navigation/native';
import { currentPatient, setCurrentPatient } from '../store/slices/patient';

const MyTable =(props) => {
    const { patientList,handleMoreDetailsPress, ...attributes } = props;
    const navigation = useNavigation();
    const moreDetailsContent = 'More Details';


    return (
        <View style={styles.tableContainer}>
            {/* Header Row */}
            <View style={styles.header}>
                <View style={[styles.cell, { flex: 1 }]}>
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Name</Text>
                </View>
                <View style={[styles.cell, { flex: 1 }]}>
                    <Text style={[styles.cellText, { fontWeight: 'bold' }]}>Started Date</Text>
                </View>
                <View style={[styles.cell, { flex: 1 }]}>
                </View>
                
            </View>

            {patientList.map((patient, index) => (
                <View key={index} style={styles.row}>
                    <View style={[styles.cell, { flex: 1 }]}>
                        <Text style={styles.cellText}>{patient.user.first_name} {patient.user.last_name}</Text>
                    </View>
                    <View style={[styles.cell, { flex: 1 }]}>
                        <Text style={styles.cellText}>{patient.user.birthdate}</Text>
                    </View>
                    <View style={[styles.cell, { flex: 1 }]}>
                        <TouchableOpacity onPress={() => handleMoreDetailsPress(index)}>
                            <Text style={[styles.cellText, styles.buttonText]}>{moreDetailsContent}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        marginRight: 15,
        marginLeft: 15,
        marginTop:30,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 15,
        borderColor: colors.green,
        marginBottom:30,
        width:'85%',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: colors.mintGreen,
        borderStyle: 'solid',
        borderBottomColor: colors.green,
        borderBottomWidth: 3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: colors.green,
        borderBottomWidth: 1,
    },
    cell: {
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: colors.green,
        borderRightWidth: 1, 
    },
    cellText: {
        fontSize: 18,
        color: colors.darkBlue,
        textAlign: 'center',
    },
    image: {
        width: 35, 
        height: 35, 
    },
    buttonText: {
        textDecorationLine: 'underline',
    },
});

export default MyTable;
