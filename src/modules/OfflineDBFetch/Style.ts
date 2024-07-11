import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    card: {
      margin: height*0.0062,
      borderRadius: 5,
      padding: height*0.0062,
      elevation: 10,
      backgroundColor: 'white',
    },
  });
export default styles;
