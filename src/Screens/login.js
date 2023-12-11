/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
// import {FontAwesome5} from 'react-native-vector-icons';
import {useNavigation} from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Login</Text>
      </View>
      <View style={styles.text2}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}> Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        <Input
          leftIcon={
            <Icon
              name="user-secret"
              size={24}
              color="black"
              type="font-awesome-5"
            />
          }
          placeholder="Username or Email"
        />
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <Input
          leftIcon={
            <Icon name="key" size={24} color="black" type="font-awesome-5" />
          }
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>

      {/* Button */}
      <View style={styles.buttonStyle}>
        <Button
          title="LOGIN"
          buttonStyle={styles.buttonDesign}
          onPress={() => {}}
        />
      </View>

      {/* Line */}
      <View style={styles.lineStyle}>
        <View style={styles.lineText} />
        <View>
          <Text style={styles.text_4}>Or</Text>
        </View>
        <View style={styles.viewStyle} />
      </View>

      {/* Image */}
      <View style={styles.boxStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('#')}
          style={styles.imageStyle}>
          <Image
            style={styles.imageSource}
            source={{
              uri: 'https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png',
            }}
          />
        </TouchableOpacity>
        {/* Add similar TouchableOpacity components for other images */}
      </View>
    </View>
  );
}

export default function App() {
  return <Login />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
  },
  Middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text_4: {
    width: 50,
    textAlign: 'center',
  },
  text2: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  signupText: {
    fontWeight: 'bold',
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  lineText: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: '#026efd',
  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  imageSource: {
    width: 80,
    height: 80,
  },

  boxStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
  },
});
