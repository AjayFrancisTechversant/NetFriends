import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (height: number, width: number, sliderWidth: number) =>
  StyleSheet.create({
    container: {
      height: height,
      width: width,
      borderRadius: 10,
      justifyContent: 'center',
    },
    slider: {
      height: '100%',
      width: sliderWidth,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderBackgroundContainer: {
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      gap: 10,
    },
    sliderBGText: {
      alignSelf: 'center',
      fontSize: height * 0.3,
      color: ColorPalette.white,
      fontFamily: 'Helvetica-Bold',
    },
    sliderBGIcon: {
      color: ColorPalette.green,
    },
  });
export default styles;
