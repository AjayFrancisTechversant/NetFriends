import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    SegmentedButtons: {
      width: width * 0.7,
      alignSelf: 'center',
      marginVertical: height*0.025,
    },
    SegmentedButtonValueText: {
      marginLeft: width*0.0486,
    },
    card: {
      width: screenContext.isTypeTablet ? width * 0.9 : width * 0.8,
      alignSelf: 'center',
    },
    cardImageStyle: {
      height: screenContext.isTypeTablet ? height * 0.4 : height * 0.3,
    },
    showMenuButton: {
      width: 100,
    },
    toggleButttonsContainer: {
      alignSelf: 'center',
      marginVertical: height*0.025,
    },
    switchContainer: {
      marginTop: height*0.0125,
      marginLeft: width*0.0729,
      flexDirection: 'row',
    },
    snackBarText: {
      color: ColorPalette.white,
    },
    dialog: {
      height: 300,
    },
    dialogTitle: {
      alignSelf: 'center',
    },
    downloadDataButton: {
      marginTop: height*0.025,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 130,
      backgroundColor: ColorPalette.green,
      borderRadius: 5,
      marginLeft: width*0.0729,
    },
    downloadDataText: {
      color: ColorPalette.white,
    },
    progressBar: {
      marginHorizontal: width*0.0729,
    },
    loremText: {
      marginHorizontal: width*0.0486,
    },
    FABGroup: {
      position: 'absolute',
      bottom: 60,
    },
    animatedFabStyle: {
      bottom: 10,
      right: 16,
    },
    DataTable: {
      margin: height*0.0250,
      borderWidth: 1,
      width: width * 0.9,
      borderRadius: 5,
      alignSelf: 'center',
      borderColor: 'grey',
    },
    textInput: {
      marginBottom: height*0.0125,
      width: width * 0.8,
      alignSelf: 'center',
      marginVertical: height*0.0125,
    },
  });
export default styles;
