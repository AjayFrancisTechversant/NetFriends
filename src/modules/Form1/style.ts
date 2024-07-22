import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {
      padding: height * 0.01,
      flex: 1,
      backgroundColor: ColorPalette.white,
    },
    heading: {alignSelf: 'center'},
    bigBoldText: {fontSize: 20, fontWeight: 'bold'},
    subHeading: {fontWeight: 'bold'},
    addEducationButton: {
      backgroundColor: ColorPalette.orange,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: height * 0.05,
      margin: height * 0.01,
      width: width * 0.8,
      alignSelf: 'center',
    },
    submitButton: {
      backgroundColor: ColorPalette.green,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: height * 0.05,
      margin: height * 0.01,
      width: width * 0.8,
      alignSelf: 'center',
    },
    whiteText: {color: ColorPalette.white},
    SACAContainer: {flexDirection: 'row',alignItems:'center'},
  });
export default styles;
