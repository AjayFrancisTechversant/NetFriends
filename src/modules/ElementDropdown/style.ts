import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white', padding: height * 0.02},
    menuButton: {position: 'absolute', left: height * 0.02, top: height * 0.02},
    heading: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      margin: height * 0.01,
    },
    subheading: {fontWeight: 'bold', margin: height * 0.01},
    dropdown: {
      margin: 16,
      height: height * 0.08,
      backgroundColor: ColorPalette.white,
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    closeButton:{backgroundColor:ColorPalette.lightGray,justifyContent:'center',alignItems:'center',borderRadius:100,padding:height*0.01},
    icon: {
      marginRight: 5,
    },
    iconStyle: {
      width: height * 0.04,
      height: height * 0.04,
    },
    inputSearchStyle: {
      height: height * 0.08,
      borderColor: ColorPalette.green,
      borderRadius: 10,
    },
    stateDropdownItem: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stateDropdowntextItem:{
      flex: 1,
      fontSize: 16,
    }
  });
export default styles;
