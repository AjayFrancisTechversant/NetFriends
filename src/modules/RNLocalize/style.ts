import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {flex: 1, padding: height * 0.01},
    heading: {alignSelf: 'center', fontSize: 20, fontWeight: 'bold'},
  });
export default styles;
