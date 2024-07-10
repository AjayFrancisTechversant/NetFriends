import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: ColorPalette.white,
      flex: 1,
    },
    headerContents: {zIndex:1,
      margin: height*0.02,
      width:screenContext.isPortrait?width*0.9:height*0.95,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position:screenContext.isPortrait?'static':'absolute'
    },
    canvasAndToolsContainer:{flexDirection:screenContext.isPortrait?'column':'row', gap:height*0.1,flex:1,},
    canvasSkiaContainer: {
      alignSelf:'center',
      marginLeft:screenContext.isPortrait?0:width*0.2,
      height:  width * 0.85,
      width:  width * 0.85,
      borderRadius: 5,
      backgroundColor: ColorPalette.white,borderWidth:1,
      borderStyle:'dashed',
      borderColor:ColorPalette.gray
    },
    canvasSkia: {flex: 1},
    toolsContainer: {
      flexDirection:screenContext.isPortrait? 'row':'column',
      gap: width * 0.03,
      borderWidth: 1,
      borderRadius: 10,
      margin: height * 0.02,
      alignSelf: 'center',
      padding: height * 0.01,
      borderColor: ColorPalette.gray,
    },
    modalFullScreenBackground: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: ColorPalette.lightGreen,
    },
    modalView: {
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: height * 0.2,
    },
    colorPreviewStyle: {
      margin: height * 0.01,
      alignSelf: 'center',
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: 10,
    },
    colorSliderStyle: {width: width * 0.7, margin: height * 0.01,alignSelf:'center'},
    swatchStyle:{borderRadius:5},
    ModalOKButton: {
      height: height * 0.05,
      width: width * 0.4,
      backgroundColor: ColorPalette.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      alignSelf: 'center',
      margin: height * 0.02,
    },
    OKText: {color: ColorPalette.white},
  });
export default styles;
