/* eslint-disable prettier/prettier */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors, images} from './assets';
const Input = ({
  label,
  imageSource,
  Password,
  onChangeText,
  placeholder,
  keyboardType,
  onSubmitEditing,
  autoCapitalize,
  returnKeyType,
  secureTextEntry,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBar}>
        <Image source={imageSource} style={styles.icon} />
        <TextInput
          style={styles.inputStyle}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8b9cb5"
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          underlineColorAndroid="#f000"
          autoCorrect={false}
          blurOnSubmit={false}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {Password && (
          <TouchableOpacity
            onPress={Password.onPress}
            style={{
              position: 'absolute',
              right: 12,
            }}>
            {Password.content}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    color: colors.gray1,
    fontSize: 16,
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  inputStyle: {
    flex: 1,
    color: colors.darkBlue,
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
});

export default Input;
