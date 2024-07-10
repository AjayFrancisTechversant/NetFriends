import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      flex: 1,
      backgroundColor: 'white',
    },
    MenuDrawerButton: {
      position: 'absolute',
      left: height * 0.025,
      top: height * 0.025,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    plusButtonContainer: {
      position: 'absolute',
      right: height * 0.025,
      top: height * 0.025,
    },
    headingContainer: {
      justifyContent: 'center',
      margin: height * 0.025,
      gap: height * 0.01,
    },
    flexDRow: {
      flexDirection: 'row',
    },
  });
export default styles;
