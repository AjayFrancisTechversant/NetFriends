import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';
import { BounceIn } from 'react-native-reanimated';

const RNAnimatable = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.heading}>RNAnimatable</Text>
      <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text>
      <Animatable.Text
        animation=""
        iterationCount={10}
        direction="normal">
        Up and down you go
      </Animatable.Text>
      <Animatable.Text
        animation="pulse"
        duration={1000}
        easing="ease-out"
        iterationCount="infinite"
        style={{textAlign: 'center'}}>
        Ⅹ
      </Animatable.Text>
      <Animatable.View animation="bounce">
          <TouchableOpacity style={screenStyles.bounceButton} >
            <Text>Bounce</Text>
          </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default RNAnimatable;
