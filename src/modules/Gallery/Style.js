import {StyleSheet} from 'react-native';

const styles = (screenContext, width, height,imageSize,spacing) =>
  StyleSheet.create({
    canvas: {
      flex: 1,
    },
    topImage: {
      height:screenContext.isPortrait?height:width,
      width:screenContext.isPortrait?width:height,
    },
    bottomFlatlist: {
      position: 'absolute',
      bottom: screenContext.isPortrait?height*0.05:width*0.05,
    },
    bottomImage: {
      height: imageSize,
      width: imageSize,
      borderRadius: 12,
      marginRight: spacing,
    },
  });
export default styles;
