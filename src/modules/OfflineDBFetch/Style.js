import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    card: {
      margin: height*0.0062,
      borderRadius: 5,
      padding: height*0.0062,
      elevation: 10,
      backgroundColor: 'white',
    },
  });
export default styles;
