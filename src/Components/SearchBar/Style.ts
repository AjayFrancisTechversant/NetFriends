import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    searchBar: {
      width: '90%',
      backgroundColor: 'white',
      alignSelf: 'center',
    },
  });
export default styles;
