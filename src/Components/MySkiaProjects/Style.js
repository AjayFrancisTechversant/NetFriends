import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {flex: 1, backgroundColor: ColorPalette.white},
    goBackButton: {
      position: 'absolute',
      top: height * 0.02,
      left: height * 0.02,
      zIndex: 1,
    },
    heading: {
      fontSize: 30,
      alignSelf: 'center',
      fontWeight: 'bold',
      margin: height * 0.01,
    },
  
   
  });
export default styles;
