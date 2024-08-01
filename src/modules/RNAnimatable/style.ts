import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {flex: 1, padding: height * 0.01},
    heading: {alignSelf: 'center', fontSize: 20, fontWeight: 'bold'},
    bounceButton: {
      backgroundColor: ColorPalette.green,
      alignSelf: 'center',
      padding: height * 0.02,
      margin: height * 0.01,
      borderRadius: 10,
    },
  });
export default styles;
