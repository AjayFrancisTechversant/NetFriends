import {View, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

type MyActivityIndicatorPropsType = {
  radius: number;
  color?: string;
  duration?: number;
};

const MyActivityIndicator: React.FC<MyActivityIndicatorPropsType> = ({radius, color, duration}) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(duration, rotationDegree);
  }, [duration]);

  const startRotationAnimation = (
    duration: number | undefined,
    rotationDegree: Animated.Value,
  ): void => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: duration ? duration : 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={[screenStyles.container, {height: radius, width: radius}]}>
      <Animated.View
        style={[
          screenStyles.progressCircle,
          {borderRadius: radius / 2, borderTopColor: color},
          {
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}></Animated.View>
    </View>
  );
};

export default MyActivityIndicator;
