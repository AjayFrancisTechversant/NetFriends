import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
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
