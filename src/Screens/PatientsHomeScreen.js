/* eslint-disable prettier/prettier */

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {BoxShadow} from 'react-native-shadow';

import {images, colors} from '../assets/assets';

const PatientsHomeScreen = ({navigation}) => {
  const shadowOpt = {
    width: 200,
    height: 200,
    color: '#000',
    border: 10,
    radius: 10,
    opacity: 0.1,
    x: 0,
    y: 0,
  };
  return (
    <View style={styles.mainBody}>
      <View style={styles.upperSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
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
            {<Image source={images.search} style={{width: 23, height: 23}} />}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.lowerSection}>
          <View
            style={{backgroundColor: colors.white, borderTopRightRadius: 60}}>
            <Text style={styles.header}>What do you need?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.optionButton}>
                {
                  <View style={styles.option}>
                    <Image
                      source={images.stethoscope}
                      style={{width: 40, height: 40}}
                    />
                    <Text style={styles.optionText}>Doctors</Text>
                  </View>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.optionButton}>
                {
                  <View style={styles.option}>
                    <Image
                      source={images.results}
                      style={{width: 40, height: 40}}
                    />
                    <Text style={styles.optionText}>Results</Text>
                  </View>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.optionButton}>
                {
                  <View style={styles.option}>
                    <Image
                      source={images.assessment}
                      style={{width: 40, height: 40}}
                    />
                    <Text style={styles.optionText}>Detailed assessment</Text>
                  </View>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={styles.optionButton}>
                {
                  <View style={styles.option}>
                    <Image
                      source={images.progress}
                      style={{width: 40, height: 40}}
                    />
                    <Text style={styles.optionText}>Progress</Text>
                  </View>
                }
              </TouchableOpacity>
            </View>
            <View style={styles.helpfulLinks}>
              <Text style={styles.helpfulLinksHeader}>Helpful Links</Text>
              <ScrollView horizontal style={styles.scrollView}>
                <View style={styles.linksContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.linksButton}></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.linksButton}></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.linksButton}></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.linksButton}></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.linksButton}></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.linksButton}></TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <View style={styles.navBar}>

        </View> */}
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
    marginLeft: 35,
    marginRight: 35,
    color: colors.darkBlue,
    fontSize: 19,
  },
  helpfulLinksHeader: {
    color: colors.darkBlue,
    fontSize: 19,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 30,
  },
  optionButton: {
    width: 150,
    height: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    color: colors.white,
    textAlign: 'center',
  },
  helpfulLinks: {
    borderRadius: 20,
    borderBottomColor: colors.mintGreen,
    borderLeftColor: colors.mintGreen,
    borderRightColor: colors.mintGreen,
    borderTopColor: colors.white,
    borderWidth: 1.5,
    margin: 30,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    margin: 3,
    gap: 30,
    paddingRight: 30,
  },
  linksButton: {
    backgroundColor: colors.mintGreen,
    width: 82,
    height: 110,
    borderRadius: 20,
  },
  label: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    color: colors.gray1,
    fontSize: 16,
  },
  inputBar: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.borderColor,
  },
  backButton: {
    margin: 20,
  },
  inputStyle: {
    flex: 1,
    color: colors.darkBlue,
  },
  buttonStyle: {
    backgroundColor: colors.green,
    color: colors.white,
    width: 350,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
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
