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
      marginTop: height*0.025,
    },
    title: {
      fontSize: 50,
      alignSelf: 'center',
      fontFamily: 'helvetica-light-587ebe5a59211',
    },
    addContainer: {
      alignSelf: 'center',
      width: width * 0.6,
    },
    button: {
      marginTop: height*0.0125,
      alignSelf: 'center',
      width: 50,
      height: 'auto',
      alignItems: 'center',
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
    },
    buttonText: {
      padding: height*0.0125,
      color: ColorPalette.white,
      fontSize: 18,
    },
    noItemsToDisplay: {
      color: ColorPalette.orange,
      alignSelf: 'center',
      marginTop: height*0.025,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: height*0.0125,
      borderRadius: 10,
      margin: height*0.0062,
      marginHorizontal: width*0.0486,
      backgroundColor: 'white',
      elevation: 10,
      borderColor: ColorPalette.green,
      borderWidth: 0.4,
    },
    cardTittle: {
      fontSize: 30,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(0,0,0,0,7',
    },
    modal: {
      height: 200,
      width: 300,
      borderRadius: 20,
      padding: height*0.0125,
      backgroundColor: 'white',
      elevation: 30,
    },
  });
export default styles;
