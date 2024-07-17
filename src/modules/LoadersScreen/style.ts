import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      heading:{
        fontSize:20,
        fontWeight:'bold',margin:height*0.01
      }
  });
export default styles;
