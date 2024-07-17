import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    sliderContainer: {
      borderRadius: 10,
      //   alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.9,
      height: height * 0.1,
      alignSelf: 'center',
      position: 'relative',
    },
    rail: {
      width: '100%',
      height: 5,
      backgroundColor: ColorPalette.gray,
    },
    railFill:{backgroundColor:ColorPalette.green,width:'100%',position:'absolute',left:0,height:5},
    handle: {
      width: 30,
      height: 30,
      borderRadius: 30,
      backgroundColor: ColorPalette.green,
      position: 'absolute',
    },
  });
export default styles;
