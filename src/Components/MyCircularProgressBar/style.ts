import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    centerView: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
export default styles;
