import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    heading: {
      fontSize: 20,
      margin: height*0.0125,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: ColorPalette.lightGreen,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    calenderIcon: {
      marginTop: -height*0.00878,
    },
    text: {
      margin: height*0.0125,
    },
    subHeading: {
      fontSize: 12,
      fontWeight: 'bold',
      margin: height*0.0125,
    },
    textInput: {
      width: width * 0.5,
      marginTop: -height*0.00752,
    },
    textInputAndButtonContainer: {
      margin: height*0.0125,
      flexDirection: 'row',
      gap: 10,
    },
  });
export default styles;
