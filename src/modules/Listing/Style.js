import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
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
    textInput: {
      width: '80%',
    },
    button: {
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
    addContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: screenContext.isPortrait ? 50 : 100,
    },
    noItemsToDisplay: {
      marginHorizontal: width*0.01210,
      color: ColorPalette.orange,
    },
  });
export default styles;
