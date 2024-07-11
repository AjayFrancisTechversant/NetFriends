import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    mainHeading: {
      fontSize: 20,
      margin: height * 0.025,
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
