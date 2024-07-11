import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    commentsContainer: {
      backgroundColor: ColorPalette.lightOrange,
      height: screenContext.isPortrait ? height * 0.75 : width * 0.55,
      elevation: 5,
      borderRadius: 20,
      margin: height * 0.025,
      overflow: 'hidden',
    },
    emptyComponentContainer: {
      margin: height * 0.0376,
      alignSelf: 'center',
    },
    emptyComponentText: {
      color: ColorPalette.white,
      fontSize: 15,
      fontWeight: 'bold',
    },
    loadingContainer: {
      margin: height * 0.0376,
      alignSelf: 'center',
    },

    separator: {
      height: 5,
    },
  });
export default styles;
