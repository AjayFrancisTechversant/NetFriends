import {StyleSheet} from 'react-native';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { ScreenContextType } from '../../Types/Types';

 const styles = (screenContext:ScreenContextType, width:number, height:number)=> StyleSheet.create({
  canvas: {flex: 1, backgroundColor: 'white'},
  mainHeading: {
    fontSize: 30,
    marginVertical: height*0.0125,
    marginLeft: width*0.0243,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 20,
    marginVertical: height*0.0125,
    marginLeft: width*0.0243,
    fontWeight: 'bold',
  },
  dashedBorder: {
    borderWidth: 1,
    width: 300,
    height: 150,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: 'grey',
    marginBottom: height*0.0125,
  },
  cameraButton: {
    marginBottom: height*0.025,
  },
  emptyComponentStyle: {
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: width*0.0729,
  },

  itemSeparatorComponent: {
    width: 20,
  },

  uploadButton: {
    alignSelf: 'center',
    marginTop: height*0.025,
  },
  only6PicsText: {
    alignSelf: 'center',
    margin: height*0.0125,
    color: ColorPalette.red,
  },
});
export default styles;