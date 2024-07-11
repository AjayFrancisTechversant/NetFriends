import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles = (screenContext:ScreenContextType, width:number, height:number) =>
  StyleSheet.create({
    carouselContainer: {
      height: screenContext.isPortrait ? height * 0.3 : width * 0.3,
    },
    carousel: {
      alignSelf: 'center',
    },
    image: {
      alignSelf: 'center',
      height: '100%',
      width: screenContext.isPortrait ? width * 0.93 : width * 0.3,
      borderRadius: 10,
    },
  });
export default styles;
