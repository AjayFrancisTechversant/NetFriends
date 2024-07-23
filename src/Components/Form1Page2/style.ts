import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    BackSaveButtonContainer:{flexDirection:'row',justifyContent:'space-between'},
    goBackButton: {
        backgroundColor: ColorPalette.red,
        borderRadius: 10,
        alignSelf: 'flex-end',
        padding: height * 0.01,
        alignItems: 'center',
        margin:height*0.02
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
  });
export default styles;
