/* eslint-disable prettier/prettier */
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BoxShadow} from 'react-native-shadow';
import {images, colors} from '../assets/assets';

const DoctorItem = ({name, workingDays, navigation}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('LoginScreen')}
    style={styles.optionButton}>
    <View style={styles.doctorField}>
      <View style={{flexDirection: 'row'}}>
        <Image source={images.profilePicture} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>{name}</Text>
          <Text style={styles.optionText}>
            <Text style={{fontWeight: 'bold'}}>Working days: </Text>
            {workingDays}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const PatientsHomeScreen = ({navigation}) => {
  return (
    <View style={styles.mainBody}>
      <View style={styles.upperSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.backButton}>
          <Image source={images.backArrow} />
        </TouchableOpacity>

        <View style={styles.profileField}>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.profilePicture} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.profileText}>Hello,</Text>
              <Text style={styles.profileText}>Mohamed Ali</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.searchButton}>
            <Image source={images.search} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.lowerSection}>
          <View
            style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.MyoptionButton}>
              <View style={styles.MydoctorField}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={images.profilePicture}
                    style={styles.profileImage}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 20,
                      marginTop: 5,
                    }}>
                    <Text style={styles.optionText}>
                      <Text style={{fontWeight: 'bold'}}>Your doctor: </Text>
                      Dr. Ali Khaled
                    </Text>
                    <Text style={styles.optionText}>
                      <Text style={{fontWeight: 'bold'}}>Working days: </Text>
                      Mon Wed Sat
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={styles.header}>Doctors’ List</Text>
            <View style={styles.optionsContainer}>
              <DoctorItem
                name="Dr Amira Mohamed"
                workingDays="Sun Tues Thurs"
                navigation={navigation}
              />
              <DoctorItem
                name="Dr Maye Khaled"
                workingDays="Mon Wed Fri"
                navigation={navigation}
              />
              <DoctorItem
                name="Dr Mayar Ehab"
                workingDays="Tue Thu Sat"
                navigation={navigation}
              />
              <DoctorItem
                name="Dr Doha Eid"
                workingDays="Tue Thu Sat"
                navigation={navigation}
              />
              <DoctorItem
                name="Dr Maye Khaled"
                workingDays="Mon Wed Fri"
                navigation={navigation}
              />
              <DoctorItem
                name="Dr Mayar Ehab"
                workingDays="Tue Thu Sat"
                navigation={navigation}
              />
              <DoctorItem
                name="Dr Doha Eid"
                workingDays="Tue Thu Sat"
                navigation={navigation}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientsHomeScreen;

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
  scrollView: {
    flexDirection: 'row',
    padding: 10,
  },
  profileField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
    marginLeft: -50,
  },
  doctorField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 80,
  },
  MydoctorField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 80,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 5,
  },
  profileImage: {
    marginLeft: 90,
    width: 40,
    height: 40,
    marginTop: 10,
  },
  profileText: {
    color: colors.white,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: colors.green,
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerSection: {
    backgroundColor: colors.darkBlue,
  },
  header: {
    marginTop: 30,
    marginLeft: 150,
    marginRight: 35,
    color: colors.darkBlue,
    fontSize: 19,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 30,
  },
  optionButton: {
    marginTop: -20,
    width: 294.06,
    height: 78.49,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mintGreen,
    borderWidth: 1.5,
    borderColor: colors.green,
  },
  MyoptionButton: {
    marginLeft: 30,
    width: 350,
    height: 73,
    marginTop: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.mintGreen,
    borderWidth: 1.5,
  },
  optionText: {
    fontSize: 14,
    color: colors.darkBlue,
    textAlign: 'center',
  },
  register: {
    fontSize: 14,
    color: colors.darkBlue,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  label: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    color: colors.gray1,
    fontSize: 16,
  },

  backButton: {
    margin: 20,
  },
  inputStyle: {
    flex: 1,
    color: colors.darkBlue,
  },

  buttonTextStyle: {
    color: colors.white,
    paddingVertical: 10,
    fontSize: 16,
  },
  registerTextStyle: {
    color: colors.gray2,
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  a: {
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
  navBar: {
    height: 40,
    borderRadius: 10,
    // backgroundColor: colors.white,
    // elevation: 30,
  },
});
