import {StyleSheet} from 'react-native';
import {ScreenContextType} from '../../Types/Types';

const styles = (
  screenContext: ScreenContextType,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    canvas: {backgroundColor: 'white', flex: 1},
    canvasSkiaContainer: {borderWidth: 1, flex: 1},
    canvasSkia: {height: '100%', width},
    MenuButton: {position: 'absolute', top: 20, left: 20, zIndex: 1},
  });
export default styles;
