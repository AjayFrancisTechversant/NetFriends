import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressCircle: {
      width: '100%',
      height: '100%',
      borderLeftColor: ColorPalette.white,
      borderRightColor: ColorPalette.white,
      borderBottomColor: ColorPalette.white,
      borderWidth: 5,
      position: 'absolute',
    },
  });
export default styles;
