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
      setImgUri(result.assets[0].uri);
      console.log('RESULT>>>', result);
    }
  };
import {
  View,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const TrialCamera = () => {
  const [imgUrl, setImgUri] = useState('');

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
      setImgUri(result.assets[0].uri);
      console.log('RESULT>>>', result);
    }
  };

  return (
    <View style={styles.container}>
      {/* Here you can see your clicked Image from camera */}
      {imgUrl ? (
        <Image
          source={{ uri: imgUrl }}
          style={styles.image}
        />
      ) : (
        <Text>No Image Captured</Text>
      )}

      <TouchableOpacity
        onPress={checkAndRequestCameraPermission}
        style={styles.button}>
        <Text style={styles.buttonText}>
          Request Camera Permission
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#CE1C4F',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

export default TrialCamera;
