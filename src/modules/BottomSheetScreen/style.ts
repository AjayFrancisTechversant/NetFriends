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
      flex: 1,
      padding: height * 0.01,
    },
    button: {
      backgroundColor: ColorPalette.green,
      padding: height * 0.02,
      elevation: 5,
      alignSelf: 'center',
      borderRadius: 20,
    },
    whiteText: {color: ColorPalette.white},
    contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
  });
export default styles;
