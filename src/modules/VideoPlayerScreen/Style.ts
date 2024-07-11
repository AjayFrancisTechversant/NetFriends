import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {flex: 1, backgroundColor: ColorPalette.white},
    menuButton: {position: 'absolute', top: height * 0.01, left: height * 0.01},
    heading:{fontSize:20,fontWeight:'bold',alignSelf:'center',margin:height*0.01},
    thumbnailButtonContainer:{height:width*0.6,width:width*0.6,borderWidth:1,alignSelf:'center',margin:height*0.1,borderRadius:10,justifyContent:'center',alignItems:'center',borderRadius:10,overflow:'hidden'},
    backgroundImageStyle:{height:width*0.6,width:width*0.6,justifyContent:'center',alignItems:'center'}
  });
export default styles;
