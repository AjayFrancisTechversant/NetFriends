import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    centerView: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boldBigText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    startButton:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:ColorPalette.green,
      padding:height*0.05,borderRadius:height
    }
  });
export default styles;
