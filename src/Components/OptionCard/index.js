import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

const OptionCard = ({iconName, optionTitle, iconFamily, onPressFn}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.container}>
      <TouchableOpacity onPress={onPressFn} style={screenStyles.button}>
        {iconFamily == 'AntDesign' ? (
          <AntDesign name={iconName} size={20} style={screenStyles.icon} />
        ) : iconFamily == 'FontAwesome' ? (
          <FontAwesome name={iconName} size={20} style={screenStyles.icon} />
        ) : iconFamily == 'FontAwesome5' ? (
          <FontAwesome5 name={iconName} size={20} style={screenStyles.icon} />
        ) : iconFamily == 'Entypo' ? (
          <Entypo name={iconName} size={20} style={screenStyles.icon} />
        ) : (
          null
        )}
        <Text style={screenStyles.buttonText}>{optionTitle}</Text>
        <Entypo name="chevron-right" size={30} style={screenStyles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default OptionCard;
