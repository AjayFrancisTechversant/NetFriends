import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    mainHeading: {
      fontSize: 20,
      margin: height*0.0250,
      fontWeight: 'bold',
    },
    circleSkeleton: {
      height: 30,
    },
    skeletonContainer: {
      flexDirection: 'row',
    },
  });
export default styles;
