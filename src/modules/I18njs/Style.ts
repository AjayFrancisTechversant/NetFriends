import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    selectLanguageContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: height*0.0125,
    },
    bodyContainer: {
      margin: height*0.0125,
    },
  });
export default styles;
