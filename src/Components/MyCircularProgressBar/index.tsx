import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Vibration,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

interface CircularProgressBarPropsType {
  radius: number;
  strokeWidth: number;
  duration: number;
}

type TimerStatusType = 'off' | 'inProgress' | 'finished';

const MyCircularProgressBar: React.FC<CircularProgressBarPropsType> = ({
  radius,
  strokeWidth,
  duration,
}) => {
  const [timerStatus, setTimerStatus] = useState<TimerStatusType>('off');
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const textScaleAnim = useSharedValue(0);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  const startTimer = () => {
    let animationFrameId: number;
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const remainingTime = Math.max(0, endTime - now);
      const currentProgress = elapsedTime / (duration * 1000);
      setProgress(currentProgress);
      setTimeLeft(Math.ceil(remainingTime / 1000));
      if (currentProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        onFinish();
      }
    };
    animate();
  };

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  const getColor = (progress: number): string => {
    if (progress < 0.33) return ColorPalette.red;
    if (progress < 0.66) return ColorPalette.orange;
    return ColorPalette.green;
  };

  const adjustedRadius = radius + strokeWidth / 2;
  const adjustedSize = adjustedRadius * 2;

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const handleStartTimer = () => {
    textScaleAnim.value = 0;
    setTimerStatus('inProgress');
    startTimer();
  };

  const onFinish = () => {
    textScaleAnim.value = withSpring(2);
    Vibration.vibrate();
    setTimerStatus('finished');
  };

  return (
    <View style={screenStyles.container}>
      <Svg
        height={adjustedSize}
        width={adjustedSize}
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        style={{}}>
        <Circle
          cx={adjustedRadius}
          cy={adjustedRadius}
          r={radius}
          stroke={ColorPalette.offWhite}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={adjustedRadius}
          cy={adjustedRadius}
          r={radius}
          stroke={getColor(progress)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      {timerStatus == 'off' ? (
        <View style={screenStyles.centerView}>
          <TouchableOpacity
            style={screenStyles.startButton}
            onPress={handleStartTimer}>
            <Text style={[screenStyles.boldBigText,screenStyles.whiteText]}>Start</Text>
            <MaterialCommunityIcons color={ColorPalette.white} name="timer-outline" size={30} />
            <Text style={screenStyles.whiteText}>{duration}s</Text>
          </TouchableOpacity>
        </View>
      ) : timerStatus == 'inProgress' ? (
        <View style={screenStyles.centerView}>
          <Text style={screenStyles.boldBigText}>
            Progress: {Math.floor(progress * 100)}%
          </Text>
          <Text style={screenStyles.boldBigText}>Time Left: {timeLeft}s</Text>
        </View>
      ) : timerStatus == 'finished' ? (
        <Animated.View
          style={[
            screenStyles.centerView,
            {transform: [{scale: textScaleAnim}]},
          ]}>
          <Text style={[screenStyles.boldBigText]}>Finished!</Text>
          <TouchableOpacity onPress={handleStartTimer}>
            <MaterialCommunityIcons
              name="reload"
              color={ColorPalette.green}
              size={30}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default MyCircularProgressBar;
