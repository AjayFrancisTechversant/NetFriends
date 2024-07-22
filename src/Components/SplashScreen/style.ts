import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {backgroundColor: ColorPalette.black,flex:1},
    logoStyle:{
        height:screenContext.isPortrait?height*0.5:width*0.7,marginTop:screenContext.isPortrait?height*0.2:0,width:width*0.8,alignSelf:'center'
    }
  });
export default styles;
