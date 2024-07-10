import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      flex: 1,
      backgroundColor: ColorPalette.white,
    },
    renderItemContainer: {
      width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageWrapper: {
      width: width * 0.76,
      height: height * 0.6,
      overflow: 'hidden',
      alignItems: 'center',
      borderRadius: 10,
    },
    imageSuperWrapper: {
      padding: height * 0.0125,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
    },
    ImageStyle: {
      height: height * 0.6,
      width: width * 0.76 * 1.4,
    },
    avatarImageStyle: {
      height: 60,
      width: 60,
      borderRadius: 60,
      borderWidth: 7,
      borderColor: ColorPalette.white,
      position: 'absolute',
      bottom: -30,
      right: 30,
    },
  });
export default styles;
