import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    menuButton: {position: 'absolute', left: height * 0.01, top: height * 0.01},
    canvas: {
      flex: 1,
      padding: height * 0.01,
      backgroundColor: ColorPalette.white,
    },
    heading: {alignSelf: 'center', margin: height * 0.015},
    bigBoldText: {fontSize: 20, fontWeight: 'bold'},
    segmentedButtonsStyle: {margin: height * 0.005},
    submitedFormCardButton: {
      padding: height * 0.02,
      margin: height * 0.01,
      borderRadius: 10,
      justifyContent: 'space-between',
      flexDirection:'row',
      backgroundColor:ColorPalette.lightGray
    },
    submitedFormCardSubContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: height * 0.01,
    },
    submittedText:{margin:height*0.01},
    editFormButton:{
      backgroundColor:ColorPalette.yellow,justifyContent:'center',padding:height*0.02,borderRadius:10
    }
  });
export default styles;
