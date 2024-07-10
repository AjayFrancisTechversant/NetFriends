import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    videoPlayerContainer: {flex: 1,backgroundColor:ColorPalette.black},
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
