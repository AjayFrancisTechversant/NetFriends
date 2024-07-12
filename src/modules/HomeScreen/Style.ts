import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    container: {
      margin: height * 0.01,
    },
    headerContainer: {
      height: height*0.15,
      marginBottom: -height*0.02,
      borderRadius: 5,
    },
    headerContents: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: height*0.02,
      marginTop: height*0.01,
    },
    menuDrawerButtonContainer: {
      flex: 0.1,
    },
    logoContainer: {
      flex: 0.9,
      marginLeft: height*0.01,
    },
    logo: {
      height: height*0.1,
      width: height*0.2,
    },
    searchBarContainer: {
      marginBottom: height*0.01,
    },

    homeScreenCardContainer: {
      margin: height*0.005,
    },
    fab: {
      position: 'absolute',
      bottom: height*0.02,
      right: height*0.02,
    },
  });
export default styles;
