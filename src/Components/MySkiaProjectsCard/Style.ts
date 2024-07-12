import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    card: {
      borderRadius: 10,
      elevation: 5,
      backgroundColor: ColorPalette.white,
      margin: height * 0.01,
      width: screenContext.isPortrait ? width * 0.45 : height * 0.23,
    },
    imageThumbnail: {
      width: screenContext.isPortrait ? width * 0.45 : height * 0.23,
      height: height / 4,
    },
    fullScreenImage: {
      marginTop: screenContext.isPortrait ? height * 0.01 : width * 0.01,
      height: screenContext.isPortrait ? height * 0.9 : width * 0.9,
      width: screenContext.isPortrait ? width * 0.95 : height * 0.9,
      alignSelf: 'center',
    },
    goBackButton: {
      position: 'absolute',
      top: height * 0.02,
      left: height * 0.02,
      zIndex: 1,
    },
  });
export default styles;
