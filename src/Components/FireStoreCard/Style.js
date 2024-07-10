import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
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
      backgroundColor: 'rgb(0,0,0,0.7',
    },
    modal: {
      height: 200,
      width: 300,
      borderRadius: 20,
      padding: height*0.0125,
      backgroundColor: 'white',
      elevation: 30,
    },
    modalTitle: {
      fontSize: 20,
      alignSelf: 'center',
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: height*0.0125,
    },
  });
export default styles;
