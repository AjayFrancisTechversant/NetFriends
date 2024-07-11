import {StyleSheet} from 'react-native';
import { ScreenContextType } from '../../Types/Types';

const styles =(screenContext:ScreenContextType,width:number,height:number)=> StyleSheet.create({
  cardView: {
    marginVertical: height*0.0125,
  },
  imageDeleteCloseButton: {
    zIndex: 1,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  imageStyle: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
});
export default styles;
