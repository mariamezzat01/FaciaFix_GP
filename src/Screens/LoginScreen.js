import React, { useState, createRef } from "react";
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
  Modal,
} from "react-native";

import Loader from "../Components/loader";
import { images, colors } from "../assets/assets";
import Input from "../assets/input";
import emailValidator from "email-validator";

import Axios from "../Network/axios";
import { setToken } from "../store/slices/token";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentPatient } from "../store/slices/patient";
import { setCurrentDoctor } from "../store/slices/doctor";
import { login } from "../store/api";
import PopUpModal from "../Components/popUpModal";

const LoginScreen = () => {

  const navigation = useNavigation();

  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState("");

  const passwordInputRef = createRef();

  const dispatch = useDispatch();

  const handleSubmitPress = async () => {
    // setUserEmail("mayar@gmail.com");
    // setUserPassword("Mayar@1234");
    setText("");
    if (!email) {
      setText("Please fill Email");
      setModalVisible(true);
      setError(true);
      return;
    } else if (!emailValidator.validate(email)) {
      setText("Please enter a valid email address");
      setModalVisible(true);
      setError(true);
      return;
    }
    if (!password) {
      setText("Please fill Password");
      setModalVisible(true);
      setError(true);
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    login(formData,dispatch,navigation,setModalVisible,setError,setText,setLoading);
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible} error={error} text={text}/>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.upperSection}>
          <Image source={images.upperImage} style={styles.roundedImage} />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.lowerSection}>
            <View
              style={{
                backgroundColor: colors.white,
                borderTopRightRadius: 60,
              }}
            >
              <Text style={styles.header}>Login to your Account</Text>
              <Input
                label="Email Address"
                imageSource={images.mailIcon}
                value={email}
                onChangeText={(email) => setUserEmail(email)}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  passwordInputRef.current && passwordInputRef.current.focus();
                }}
                returnKeyType="next"
              />
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputBar}>
                <Image source={images.passwordIcon} style={styles.icon} />
                <TextInput
                  style={styles.inputStyle}
                  value={password}
                  onChangeText={(password) => setUserPassword(password)}
                  placeholder="Enter your Password"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  secureTextEntry={isPasswordShown}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown == false ? (
                    <Image source={images.eyeClosedIcon} style={styles.icon} />
                  ) : (
                    <Image source={images.eyeOpenIcon} style={styles.icon} />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
              >
                <Text style={styles.buttonTextStyle}>Login</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                Don’t have an account? <Text style={styles.a}>Create one</Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: colors.white,
    alignContent: "center",
  },
  upperSection: {
    margin: 0,
  },
  roundedImage: {
    width: "100%",
    height: 275,
    borderBottomLeftRadius: 60,
  },
  lowerSection: {
    backgroundColor: colors.blueLogo,
  },
  header: {
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
    color: colors.darkBlue,
    fontSize: 23,
    fontWeight: "500",
  },
  label: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    color: colors.gray1,
    fontSize: 16,
  },
  inputBar: {
    flexDirection: "row",
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.borderColor,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 8,
    marginRight: 10,
    marginLeft: 10,
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
    alignItems: "center",
    borderRadius: 30,
    marginLeft: "auto",
    marginRight: "auto",
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
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 20,
  },
  a: {
    fontWeight: "bold",
    color: colors.darkBlue,
  },
});
