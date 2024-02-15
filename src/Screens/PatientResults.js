/* eslint-disable prettier/prettier */
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {images, colors} from '../assets/assets';

const PatientResults = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');

  return (
    <View style={styles.mainBody}>
      <View style={styles.upperSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PatientsHomeScreen')}
          style={{margin: 20}}>
          {<Image source={images.backArrow} />}
        </TouchableOpacity>
        <View style={styles.profileField}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.profilePicture}
              style={{marginLeft: 30, height: 55, width: 55}}
            />
            <View
              style={{flexDirection: 'column', marginLeft: 20, marginTop: 5}}>
              <Text style={{fontSize: 18, color: colors.white}}>Hello,</Text>
              <Text style={styles.profileText}>Mohamed Ali</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.searchButton}>
            <Image source={images.search} style={{width: 23, height: 23}} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={styles.lowerSection}>
            <View
              style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
              <View style={styles.heading}>
                <Image
                  source={images.resultsBlue}
                  style={{width: 30, height: 30}}
                />
                <Text style={styles.header}>Results</Text>
              </View>
              <View>
                <Text style={styles.imageHeader}>Scanned Image </Text>
                <View style={styles.scannedImage} />
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.diagnosisField}>
                    <Text style={styles.diagnosisTitle}>
                      Paralysis’ Degree{' '}
                    </Text>
                  </View>
                  <View style={styles.resultField}>
                    <Text style={styles.result}>Severe </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={styles.diagnosisField}>
                    <Text style={styles.diagnosisTitle}>
                      Paralysis’ Location{' '}
                    </Text>
                  </View>
                  <View style={styles.resultField}>
                    <Text style={styles.result}>Mouth & Eyes </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PatientsHomeScreen')}
          style={styles.navBarButton}>
          <Image source={images.home} style={styles.navBarIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.cameraButton}>
          <Image source={images.camera} style={styles.navBarIcon} />
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
export default PatientResults;

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
    marginTop: 20,
    color: colors.darkBlue,
  },

  scannedImage: {
    borderColor: colors.mintGreen,
    borderWidth: 2,
    height: 200,
    width: 360,
    marginLeft: 25,
    marginTop: 10,
    borderRadius: 20,
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  diagnosisField: {
    backgroundColor: colors.mintGreen,
    height: 35,
    width: 370,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
  },

  diagnosisTitle: {
    color: colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    marginTop: 5,
  },
  resultField: {
    backgroundColor: colors.white,
    marginRight: 100,
    // borderColor: colors.darkBlue,
    // borderWidth: 2,
    marginLeft: -200,
    marginTop: 15,
    height: 25,
    width: 190,
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
  activeButton: {
    backgroundColor: colors.mintGreen,
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
