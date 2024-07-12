import {View} from 'react-native';
import React from 'react';
import {Canvas, Group, Circle} from '@shopify/react-native-skia';
import {useSharedValue, withDecay} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

const SkiaDrag: React.FC = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const width = screenContext.windowWidth;
  const height = screenContext.windowHeight;
  const translateX = useSharedValue(width / 2);
  const translateY = useSharedValue(height / 4);
  const leftBoundary = 0;
  const rightBoundary = width;
  const topBoundary = 0;
  const bottomBoundary = height - 100;

  const gestureDrag = Gesture.Pan()
    .onChange(e => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd(e => {
      translateX.value = withDecay({
        velocity: e.velocityX / 4,
        clamp: [leftBoundary, rightBoundary],
      });
      translateY.value = withDecay({
        velocity: e.velocityY / 4,
        clamp: [topBoundary, bottomBoundary],
      });
    });
  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.MenuButton}>
        <MenuDrawerButton color={ColorPalette.green}/>
      </View>
      <View style={screenStyles.canvasSkiaContainer}>
        <GestureDetector gesture={gestureDrag}>
          <Canvas style={screenStyles.canvasSkia}>
            <Group>
              <Circle
                cx={translateX}
                cy={translateY}
                r={20}
                color={ColorPalette.lightOrange}
              />
            </Group>
          </Canvas>
        </GestureDetector>
      </View>
    </View>
  );
};

export default SkiaDrag;
