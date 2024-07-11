import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

type CardAPropsType = {
  item: string;
  index: number;
  onPressDeletefn: (index: number) => void;
};

const CardA: React.FC<CardAPropsType> = ({item, index, onPressDeletefn}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View style={screenStyles.cardView}>
      <TouchableOpacity
        onPress={() => onPressDeletefn(index)}
        style={screenStyles.imageDeleteCloseButton}>
        <AntDesign name="closecircle" size={30} color={ColorPalette.red} />
      </TouchableOpacity>
      <Image source={{uri: `file://${item}`}} style={screenStyles.imageStyle} />
    </View>
  );
};

export default CardA;
