import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    commentsContainer: {
      backgroundColor: ColorPalette.lightOrange,
      height: screenContext.isPortrait ? height * 0.75 : width * 0.55,
      elevation: 5,
      borderRadius: 20,
      margin: height*0.0250,
      overflow: 'hidden',
    },
    emptyComponentContainer: {
      margin: height*0.0376,
      alignSelf: 'center',
    },
    emptyComponentText: {
      color: ColorPalette.white,
      fontSize: 15,
      fontWeight: 'bold',
    },
    loadingContainer: {
      margin: height*0.0376,
      alignSelf: 'center',
    },
  
    separator: {
      height: 5,
    },
  });
export default styles;
