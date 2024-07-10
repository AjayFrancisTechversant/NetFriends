import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './Style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { useScreenContext } from '../../Contexts/ScreenContext';

const CardA = ({item, index, onPressDeletefn, componentlocation}) => {
  
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={styles.cardView}>
      <TouchableOpacity
        onPress={() => onPressDeletefn(index)}
        style={screenStyles.imageDeleteCloseButton}>
        <AntDesign name="closecircle" size={30} color={ColorPalette.red} />
      </TouchableOpacity>
      {componentlocation == 'cacheImagesDisplay' ? (
        <Image source={{uri: `file://${item}`}} style={screenStyles.imageStyle} />
      ) : (
        <Image source={{uri: `file://${item}`}} style={screenStyles.imageStyle} />
      )}
    </View>
  );
};

export default CardA;
