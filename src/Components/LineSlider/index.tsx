import {View, Animated, PanResponder, Vibration} from 'react-native';
import React, {useRef, useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

const LineSlider = () => {
  type SliderContainerDimensionsType = {
    width: null | number;
    left: null | number;
    right: null | number;
  };
  const [sliderContainerDimensions, setSliderContainerDimensions] =
    useState<SliderContainerDimensionsType>({
      width: null,
      left: null,
      right: null,
    });

  const handleAnim = useRef(new Animated.Value(0)).current;
  const railFillAnim = useRef(new Animated.Value(0)).current;
  const handleSizeAnim = useRef(new Animated.Value(1)).current;

  const handleResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(handleSizeAnim, {
        toValue: 1.3,
        useNativeDriver: false,
      }).start();
      handleAnim.extractOffset();
      railFillAnim.extractOffset();
    },
    onPanResponderMove: (evt, {dx, moveX}) => {
      if (
        moveX > (sliderContainerDimensions.left ?? 0) &&
        moveX < (sliderContainerDimensions.right ?? 0)
      ) {
        handleAnim.setValue(dx);
        railFillAnim.setValue(dx);
      }
    },
    onPanResponderRelease: () => {
      Animated.spring(handleSizeAnim, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      handleAnim.flattenOffset();
      railFillAnim.flattenOffset();
    },
  });
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View
      style={screenStyles.sliderContainer}
      onLayout={event => {
        const {width, x} = event.nativeEvent.layout;
        setSliderContainerDimensions({
          width,
          left: x,
          right: x + width,
        });
      }}>
      <View style={screenStyles.rail}>
        <Animated.View style={[screenStyles.railFill, {width: railFillAnim}]} />
      </View>
      <Animated.View
        {...handleResponder.panHandlers}
        style={[
          screenStyles.handle,
          {
            transform: [{translateX: handleAnim}, {scale: handleSizeAnim}],
          },
        ]}
      />
    </View>
  );
};

export default LineSlider;
