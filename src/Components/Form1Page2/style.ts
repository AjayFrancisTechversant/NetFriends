import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    subHeading: {fontWeight: 'bold'},
    SACAContainer: {flexDirection: 'row', alignItems: 'center'},
    commonAddressDetailsCard: {padding:height*0.01,
      margin: height * 0.01,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
      borderWidth: 0.4,
      borderColor: ColorPalette.gray,
    },
    textInput:{marginBottom:height*0.01},
    BackSaveButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    goBackButton: {
      backgroundColor: ColorPalette.red,
      borderRadius: 10,
      alignSelf: 'flex-end',
      padding: height * 0.01,
      alignItems: 'center',
      margin: height * 0.02,
    },
    saveButton: {
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
      alignSelf: 'flex-end',
      padding: height * 0.01,
      alignItems: 'center',
      margin: height * 0.02,
    },
    whiteText: {color: ColorPalette.white},
    errorText: {
      color: 'red',
      fontSize: 12,
    }
  });
export default styles;
