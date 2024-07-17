import {View, Animated, PanResponder} from 'react-native';
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

  const handleResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      console.log('start');

      handleAnim.setOffset(handleAnim._value);
      railFillAnim.setOffset(railFillAnim._value);
    },
    onPanResponderMove: (evt, {dx, moveX}) => {
      if (
        moveX > sliderContainerDimensions.right &&
        moveX < sliderContainerDimensions.left
      ) {
        handleAnim.setValue(dx);
        railFillAnim.setValue(-dx);
      }
    },
    onPanResponderRelease: () => {
      console.log('releasse');

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
          left: x + width,
          right: x,
        });
      }}>
      <View style={screenStyles.rail}>
        <Animated.View style={screenStyles.railFill} />
      </View>
      <Animated.View
        {...handleResponder.panHandlers}
        style={[
          screenStyles.handle,
          {
            transform: [{translateX: handleAnim}],
          },
        ]}
      />
    </View>
  );
};

export default LineSlider;
