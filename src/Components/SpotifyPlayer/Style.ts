import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {backgroundColor: ColorPalette.white},
    linearGradientStyle: {height},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: height * 0.02,
    },
    headerText: {color: ColorPalette.green},
    coverImage: {
      alignSelf: 'center',
      marginVertical: height * 0.05,
      borderRadius: 5,
    },
    titleAndLikeButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: width * 0.1,
    },
    songTitle: {fontSize: 25, color: ColorPalette.green, fontWeight: 'bold'},
    songSubTitle: {color: ColorPalette.green},
    likeButton: {alignSelf: 'center'},
    playBackButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: width * 0.1,
      alignItems: 'center',
    },
    bottomButtonsSuperContainer: {
      marginHorizontal: width * 0.1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    shareAndPlaylistButtonsContainer: {flexDirection: 'row', gap: width * 0.1},
    lyricsText: {
      color: ColorPalette.green,
      margin: width * 0.1,
      fontWeight: 'bold',
    },
    lyricsBox: {
      height: height * 0.5,
      width: screenContext.isPortrait ? width * 0.9 : height * 0.9,
      backgroundColor: ColorPalette.lightGreen,
      borderRadius: 20,
      alignSelf: 'center',
      marginBottom: height * 0.05,
      padding: width * 0.1,
    },
    skel1: {
      width: screenContext.isPortrait ? width * 0.7 : height * 0.7,
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
      height: height * 0.02,
    },
    skel2: {
      width: screenContext.isPortrait ? width * 0.6 : height * 0.6,
      backgroundColor: ColorPalette.green,
      marginTop: width * 0.03,
      borderRadius: 10,
      height: height * 0.02,
    },
    skel3: {
      marginTop: width * 0.03,
      width: screenContext.isPortrait ? width * 0.5 : height * 0.5,
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
      height: height * 0.02,
    },
    skel4: {
      marginTop: width * 0.03,
      width: screenContext.isPortrait ? width * 0.4 : height * 0.4,
      backgroundColor: ColorPalette.green,
      borderRadius: 10,
      height: height * 0.02,
    },
  });
export default styles;
