import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
   alignSelf:'center'
    },
    menuButton: {
      position: 'absolute',
      top: height * 0.01,
      left: height * 0.01,
    },
    copiedText: {
      marginTop: 10,
      color: 'red',
    },
    button:{backgroundColor:ColorPalette.green,borderRadius:10,padding:10,margin:10},
    textInput:{width:width*0.5}
  });
export default styles;
