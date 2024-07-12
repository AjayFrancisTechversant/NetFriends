import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    flashMessageStyle: {borderWidth: 2, borderColor: ColorPalette.white},
    flashMessageTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingVertical: height * 0.01,
    },
  });
export default styles;
