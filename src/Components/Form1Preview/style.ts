import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas:{flex:1,backgroundColor:ColorPalette.white},
    headerContents:{
        flexDirection:'row',justifyContent:'space-between',
        margin:height*0.01
    }
  });
export default styles;
