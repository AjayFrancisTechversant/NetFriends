import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    selectLanguageContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: height*0.0125,
    },
    bodyContainer: {
      margin: height*0.0125,
    },
  });
export default styles;
