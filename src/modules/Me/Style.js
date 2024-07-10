import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (screenContext, width, height) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    container: {
      flex: 1,
      margin: height*0.0250,
    },
    headerContainer: {
      flexDirection: 'row',
      height: 200,
      justifyContent: 'flex-end',
      marginBottom: -height*0.0878,
    },
    BGImageStyle: {
      borderRadius: 10,
    },

    logoutIcon: {
      color: ColorPalette.green,
      margin: height*0.0250,
    },
    editContainer: {
      borderWidth: 1,
      borderRadius: 10,
      padding: height*0.0125,
      borderColor: ColorPalette.green,
    },
    textInput: {
      marginVertical: height*0.0062,
      width: width * 0.6,
    },
    editBoxTitle: {
      alignSelf: 'center',
    },
    editButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: height*0.0125,
    },
    cancelEditButton: {
      backgroundColor: ColorPalette.red,
      height: 30,
      width: 30,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    saveEditButton: {
      backgroundColor: ColorPalette.green,
      height: 30,
      width: 30,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    //userDetails
    userDetailsContainer: {
      marginVertical: height*0.025,
      alignItems: 'center',
    },
    profilePicture: {
      height: 150,
      width: 150,
      borderRadius: 100,
    },
    username: {
      fontSize: 30,
      fontFamily: 'Helvetica-Bold',
    },
    // 3IconContainer
    threeIconContainer: {
      flexDirection: 'row',
      marginVertical: height*0.025,
      borderColor: 'blue',
      alignItems:'center',
      justifyContent:'center'
    },
    threeIconButton: {
      flex: 1 / 3,
      alignItems: 'center',
    },
    threeIconTitle: {
      fontFamily: 'Rajdhani-Medium',
    },
    toolTipArrowSize:{width: 15, height: 14},
    threeIconSubtitle: {
      alignSelf: 'center',
      fontFamily: 'Rajdhani-Bold',
      color:ColorPalette.green
    },
    threeIcons:{alignSelf:'center'},
    OptionCardContainer: {
      marginHorizontal: screenContext.isPortrait ? width*0.0486 : width*0.2433,
    },
  });
export default styles;
