import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {flex: 1, backgroundColor: ColorPalette.white},
    heading: {
      fontSize: 20,
      alignSelf: 'center',
      margin: height * 0.02,
      fontWeight: 'bold',
    },
    menuButton: {position: 'absolute', left: height * 0.02, top: height * 0.02},
    toggleButton: {
      borderRadius: 10,
      backgroundColor: ColorPalette.yellow,
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.4,
      height: height * 0.1,
      alignSelf: 'center',
      margin: height * 0.01,
    },
    crashButton: {
      borderRadius: 10,
      backgroundColor: ColorPalette.red,
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.4,
      height: height * 0.1,
      alignSelf: 'center',
      margin: height * 0.01,
    },
    whiteText: {color: ColorPalette.white},
  });
export default styles;
