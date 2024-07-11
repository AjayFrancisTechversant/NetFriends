import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      flex: 1,
    },
    bgImage: {
      height: '100%',
    },
    BlurViewContainer: {
      overflow: 'hidden',
      position: 'absolute',
      alignSelf: 'center',
      borderRadius: 20,
      width: width * 0.8,
      bottom: 40,
      elevation: 20,
      height: screenContext.isPortrait ? 'auto' : 200,
      borderWidth: 2,
      borderColor: ColorPalette.transWhite,
    },
    MenuDrawerButton: {
      position: 'absolute',
      top: 30,
      left: 30,
    },
    whiteText: {
      color: ColorPalette.white,
    },

    currentLocationButtonContainer: {
      overflow: 'hidden',
      position: 'absolute',
      borderRadius: 20,
      bottom: 30,
      right: 30,
      elevation: 20,
      borderWidth: 1,
      borderColor: ColorPalette.transWhite,
    },
    currentLocationButton: {
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainHeading: {
      fontSize: 40,
      fontWeight: 'bold',
      color: ColorPalette.white,
      alignSelf: 'center',
      margin: height*0.0250,
      fontFamily: 'Helvetica',
    },
    subHeading: {
      fontSize: 20,
      margin: height*0.0376,
    },
    text: {
      marginVertical: height*0.0062,
      marginLeft: width*0.0486,
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
    openMapsButton: {
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.2)',
      width: 200,
      alignSelf: 'center',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: height*0.0250,
      flexDirection: 'row',
      gap: 5,
    },
    openMapsText: {color: ColorPalette.white},
  });
export default styles;
