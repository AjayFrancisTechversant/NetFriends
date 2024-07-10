import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    flashMessageStyle: {borderWidth: 2, borderColor: ColorPalette.white},
    flashMessageTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingVertical: height * 0.01,
    },
  });
export default styles;
