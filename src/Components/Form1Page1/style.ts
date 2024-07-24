import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {flex: 1, backgroundColor: ColorPalette.white,},
    subHeading: {fontWeight: 'bold'},
    personalDetailsCard: {
      padding: height * 0.01,
      margin: height * 0.01,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
      borderWidth: 0.4,
      borderColor: ColorPalette.gray,
    },
    textInput:{marginBottom:height*0.01},
    DOBButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dobTextInput: {flex: 0.9},
    calenderButton: {
      backgroundColor: ColorPalette.lightGreen,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    saveButton: {
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
      alignSelf: 'flex-end',
      padding: height * 0.01,
      alignItems: 'center',
      margin:height*0.02
    },
    whiteText: {color: ColorPalette.white},
    errorText: {
      color: 'red',
      fontSize: 12,
    }
  });
export default styles;
