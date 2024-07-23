import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {
      flex: 1,
      padding: height * 0.01,
      backgroundColor: ColorPalette.white,
    },
    heading: {alignSelf: 'center'},
    bigBoldText: {fontSize: 20, fontWeight: 'bold'},
    segmentedButtonsStyle: {margin: height * 0.005,},
  });
export default styles;
