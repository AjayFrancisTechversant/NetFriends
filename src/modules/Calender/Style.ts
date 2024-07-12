import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    canvas: {
      backgroundColor: 'white',
      flex: 1,
    },
    calendar: {
      margin: height*0.0125,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'grey',
      borderStyle: 'dotted',
    },
    text: {
      textAlign: 'center',
      padding: height*0.0125,
      backgroundColor: 'lightgrey',
      fontSize: 16,
    },
  });
export default styles;
