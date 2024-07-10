import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    container: {
      marginBottom: height*0.025,
    },
    button: {
      borderWidth: 1,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 5,
      borderColor: ColorPalette.green,
    },
    icon: {
      marginLeft: width*0.0243,
      color: ColorPalette.green,
    },
    buttonText: {
      marginLeft: width*0.0486,
      color: ColorPalette.green,
    },
    rightIcon: {
      marginRight: width*0.0486,
      color: ColorPalette.green,
    },
  });
export default styles;
