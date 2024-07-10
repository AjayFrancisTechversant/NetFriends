import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    drawerItemStyle: {
      borderTopWidth: 1,
      borderTopColor: 'grey',
    },
  });
export default styles;
