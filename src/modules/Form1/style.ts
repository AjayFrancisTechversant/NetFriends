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
    whiteText: {color: ColorPalette.white},
    personalDetailsCard: {
      margin: height * 0.01,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
    },
    SACAContainer: {flexDirection: 'row', alignItems: 'center'},
    commonAddressDetailsCard: {
      margin: height * 0.01,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
    },
    educationDetailsCard: {
      margin: height * 0.01,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
    },
    AddiEduHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: height * 0.02,
    },
    removeEducationButton: {
      borderColor: ColorPalette.gray,
      borderWidth:0.5,
      borderRadius: 5,
    },
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
  });
export default styles;
