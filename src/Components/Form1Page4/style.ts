import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {flex: 1},
    subHeading: {fontWeight: 'bold'},
    textInput: {marginBottom: height * 0.01},
    documentsDetailsCard: {
      padding: height * 0.01,
      margin: height * 0.01,
      borderRadius: 10,
      elevation: 10,
      backgroundColor: ColorPalette.white,
      borderWidth: 0.4,
      borderColor: ColorPalette.gray,
    },
    BackSaveButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    goBackButton: {
      backgroundColor: ColorPalette.red,
      borderRadius: 10,
      alignSelf: 'flex-end',
      padding: height * 0.01,
      alignItems: 'center',
      margin: height * 0.02,
    },
    saveButton: {
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
      alignSelf: 'flex-end',
      padding: height * 0.01,
      alignItems: 'center',
      margin: height * 0.02,
    },
    whiteText: {color: ColorPalette.white},
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    eachDocCard: {
      padding: height * 0.01,
      borderWidth: 0.5,
      borderRadius: 5,
      alignSelf: 'flex-start',
      marginBottom: height * 0.01,
    },
    imageThumbnailStyle: {
      height: height * 0.2,
      width: height * 0.2,
    },
    drawOrUploadSignaturewholeContainer: {flexDirection: 'row',gap:20,alignItems:'center',marginBottom:height*0.01},
    drawOrUploadSignatureCommonContainer: {
      alignItems: 'center',
    },
    greenText: {color: ColorPalette.green, marginBottom: height * 0.01},
    resumePreviewAndRemoveButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ColorPalette.lightGray,
      padding: height * 0.01,
      borderRadius: 5,
      gap: height * 0.02,
    },
    signatureRemoveButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    backButtonOnPDFView: {
      position: 'absolute',
      left: height * 0.01,
      top: height * 0.01,
      zIndex: 1,
    },
  });
export default styles;
