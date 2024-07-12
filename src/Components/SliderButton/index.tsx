import {Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

interface SliderButtonPropsType {
  height: number;
  width: number;
  sliderWidth: number;
  sliderText: string;
  onPressFn: () => void;
}

const SliderButton: React.FC<SliderButtonPropsType> = ({
  height,
  width,
  sliderWidth,
  sliderText,
  onPressFn,
}) => {
  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const screenStyles = styles(height, width, sliderWidth);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translationX.value}],
  }));
  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => (prevTranslationX.value = translationX.value))
    .onUpdate(event => {
      const maxTranslateX = width - sliderWidth - 5;
      const minTranslateX = 0;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        minTranslateX,
        maxTranslateX,
      );
      if (translationX.value > width * 0.75) {
        onPressFn();
        translationX.value = withTiming(0, {
          duration: 500,
          easing: Easing.bounce,
        });
      }
    })
    .onEnd(() => {
      translationX.value = withTiming(0, {
        duration: 500,
        easing: Easing.bounce,
      });
    })
    .runOnJS(true);
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[ColorPalette.green, ColorPalette.lightGreen]}
      style={screenStyles.container}>
      <View style={screenStyles.sliderBackgroundContainer}>
        <Text style={screenStyles.sliderBGText}>{sliderText}</Text>

        <Feather
          style={screenStyles.sliderBGIcon}
          name="chevrons-right"
          size={height * 0.4}
        />
      </View>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[animatedStyles, screenStyles.slider]}></Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </LinearGradient>
  );
};

export default SliderButton;
