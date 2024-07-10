import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas:{flex:1},
    menuButton:{position:'absolute',top:height*0.01,left:height*0.01}
  });
export default styles;
