import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    videoPlayerContainer: {flex: 1, backgroundColor: ColorPalette.black},
    VideoPlayer: {
      flex: 1,
    },
    backButton: {
      zIndex: 2,
      position: 'absolute',
      top: height * 0.01,
      left: height * 0.01,
    },
  });
export default styles;
