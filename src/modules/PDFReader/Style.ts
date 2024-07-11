import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {flex: 1, backgroundColor: ColorPalette.white},
    menuButton: {position: 'absolute', left: height * 0.01, top: height * 0.01},
    pdfView: {flex: 1, margin: height * 0.01},
    backButton: {
      position: 'absolute',
      top: height * 0.01,
      left: height * 0.01,
      zIndex: 2,
    },
    OpenPdfButton: {
      backgroundColor: ColorPalette.green,
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.5,
      height: height * 0.1,
      borderRadius: 10,
      alignSelf: 'center',
      margin: height * 0.02,
    },
    DownloadPDFText: {color: ColorPalette.white, fontWeight: 'bold'},
  });
export default styles;
