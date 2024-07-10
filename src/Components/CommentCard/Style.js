import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    commentCard: {
      borderRadius: 20,
      backgroundColor: 'white',
      padding: height * 0.025,
      elevation: 5,
      marginTop: height * 0.0125,
      marginHorizontal: width * 0.0243,
    },
    commentTitle: {
      fontWeight: 'bold',
      color: ColorPalette.lightOrange,
      fontFamily: 'Helvetica-Bold',
      fontSize: 15,
    },
    modalFullScreenBackground: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: ColorPalette.transBlack,
    },
    modalCommentContainer: {
      alignSelf: 'center',
      width: screenContext.isPortrait ? width * 0.8 : height * 0.7,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: height * 0.03,
    },
    closeButton: {position: 'absolute', right: 10, top: 10},
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: width * 0.1,
      margin: height * 0.02,
    },
    editButton: {
      borderColor: ColorPalette.lightOrange,
      borderWidth: 1.5,
      padding: height * 0.01,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    editButtonText: {
      color: ColorPalette.lightOrange,
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: ColorPalette.red,
      padding: height * 0.01,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    deleteButtonText: {
      color: ColorPalette.white,
      fontWeight: 'bold',
    },
  });
export default styles;
