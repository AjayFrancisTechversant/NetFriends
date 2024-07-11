import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    container: {
      flex: 1,
      marginHorizontal: screenContext.isPortrait ? width * 0.1 : width * 0.3,
      marginTop: height*0.062,
    },
    heading: {
      fontSize: 50,
      alignSelf: 'center',
    },
    textInput: {
      marginVertical: height*0.0188,
    },
    button: {
      alignSelf: 'center',
      width: 100,
      alignItems: 'center',
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
    },
    buttonText: {
      padding: height*0.0125,
      color: ColorPalette.white,
      fontSize: 18,
    },
    lastViewContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: height*0.0125,
    },
    greenUnderlinetext: {
      color: ColorPalette.green,
      textDecorationLine: 'underline',
    },
    selfAlignCenter: {
      alignSelf: 'center',
    },
    AlllogoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30,
    },
    eachLogoContainer: {
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    facebookLogo: {
      height: 30,
      width: 30,
      margin: height*0.0062,
    },
  });
export default styles;
