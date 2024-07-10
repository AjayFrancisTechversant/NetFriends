import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      borderRadius: 10,
      elevation: 5,
      backgroundColor: 'white',
    },
    TouchableOpacity: {
      flexDirection: 'row',
      flex: 5/6,
    },
    image: {
      height: height * 0.11,
      width: height * 0.11,
      margin: height * 0.012,
      borderRadius: 80,
    },
    detailsContainer: {
      flex:1,
      alignSelf: 'center',
    },
    title: {
      fontSize: 15,
      color: ColorPalette.green,
      fontFamily: 'Helvetica-Bold',
    },
    buttonsContainer: {
      flex: 1 / 6,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    modalFullScreenBackground: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: ColorPalette.transBlack,
    },
    userContainer: {
      alignSelf: 'center',
      width: screenContext.isPortrait ? width * 0.8 : height * 0.7,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: height * 0.03,
    },
    closeButton: {position: 'absolute', right: 10, top: 10},
    modalImage: {
      height: height * 0.118,
      width: height * 0.118,
      borderRadius: 10,
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      width: width * 0.3,
      justifyContent: 'space-evenly',
      marginVertical: height * 0.01,
    },
    descContainer: {
      alignItems: 'center',
      marginBottom: height * 0.01,
    },
  });
export default styles;
