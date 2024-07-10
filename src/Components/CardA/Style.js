import {StyleSheet} from 'react-native';

const styles =(screenContext,width,height)=> StyleSheet.create({
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
