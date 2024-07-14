import { colors } from "../assets/assets";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Loader = (props) => {
  const { loading, ...attributes } = props;

  const initialLoaderStyles = [
    { backgroundColor: colors.blueFF, color: colors.blueFF },
    { backgroundColor: colors.blueLogo, color: colors.blueLogo },
    { backgroundColor: colors.green, color: colors.green },
    { backgroundColor: colors.mintGreen, color: colors.mintGreen },
    { backgroundColor: colors.white, color: colors.white },
  ];

  const [loaderColors, setLoaderColors] = useState(initialLoaderStyles);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoaderColors(prevColors => {
          const newColors = [...prevColors];
          const shiftedColor = newColors.pop(); // Remove the last color
          newColors.unshift(shiftedColor); // Add it to the beginning
          return newColors;
        });
      }, 500); // Adjust the duration as needed

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {loaderColors.map((style, index) => (
            <View
              key={index}
              style={[
                styles.individualIndicatorWrapper,
                { backgroundColor: style.backgroundColor },
              ]}
            >
              <ActivityIndicator
                animating={true}
                color={style.color}
                size="small"
                style={styles.activityIndicator}
              />
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  activityIndicatorWrapper: {
    height: 50,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  individualIndicatorWrapper: {
    height: 25,
    width: 25,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activityIndicator: {
    height: 30,
  },
});
