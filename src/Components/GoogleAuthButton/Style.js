import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    logoContainer: {
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleLogo: {
      height: 45,
      width: 45,
    },
  });
export default styles;
