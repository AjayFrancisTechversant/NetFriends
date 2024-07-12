import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    menuButton: {position: 'absolute', top: height * 0.01, left: height * 0.01},
  });
export default styles;
