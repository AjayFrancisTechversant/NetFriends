import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    logoContainer: {
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleLogo: {
      height: 45,
      width: 45,
    },
  });
export default styles;
