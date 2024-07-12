import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: ColorPalette.white,
      flex: 1,
    },
    heading: {
      fontSize: 20,
      alignSelf: 'center',
      marginTop: height * 0.02,
      fontWeight: 'bold',
    },
    menuButton: {
      position: 'absolute',
      top: height * 0.02,
      left: height * 0.02,
    },
    plusButtonAndMyProjectsButtonContainer: {
      flexDirection: screenContext.isPortrait ? 'column' : 'row',justifyContent:'center',alignItems:'center',gap:height*0.1
    },
    plusButtonImageContainer: {
      height: height * 0.4,
      width,
      alignItems: 'center',
      justifyContent: 'center',
    },
    myProjectsButton: {
      backgroundColor: ColorPalette.green,
      height: height * 0.05,
      width: width * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      alignSelf: 'center',
    },
    myProjectsText: {
      color: ColorPalette.white,
      fontWeight: 'bold',
    },
  });
export default styles;
