import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import BackgroundService from 'react-native-background-actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

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
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const viewScaleAnim = useSharedValue(1);
  const [isloading, setIsLoading] = useState(false);
  const isRunning = BackgroundService.isRunning();
  let asyncFetchInterval: NodeJS.Timeout | null = null;
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    checkBackgroundService();
    return () => {
      subscription.remove();
      if (asyncFetchInterval) {
        clearInterval(asyncFetchInterval);
      }
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
  };

  const checkBackgroundService = () => {
    if (isRunning) {
      setIsLoading(true);
      setTimerStatus('inProgress');
      repeatedFetchFromAsyncStorage();
    }
  };

  const sleep = (time: number) =>
    new Promise<void>(resolve => setTimeout(() => resolve(), time));

  const startTimer = async (taskDataArguments: any) => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = duration; i >= 0; i--) {
        setTimeLeft(i);
        if (appState.current !== 'active') {
          saveToAsyncStorage(i);
        }
        await BackgroundService.updateNotification({taskDesc: `${i}s left`});
        await sleep(delay);
      }
      await BackgroundService.stop();
      onFinish();
    });
  };

  const options = {
    taskName: 'Timer',
    taskTitle: 'Timer Running',
    taskDesc: `${duration}s left`,
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: ColorPalette.green,
    linkingURI: 'myapp://loadersscreen',
    parameters: {
      delay: 1000,
    },
  };
  const repeatedFetchFromAsyncStorage = async () => {
    asyncFetchInterval = setInterval(async () => {
      await loadFromAsyncStorage();
      setIsLoading(false);
    }, 1000);
    if (timerStatus == 'finished') {
      clearInterval(asyncFetchInterval);
    }
  };

  const onFinish = () => {
    viewScaleAnim.value = withSpring(2);
    setTimerStatus('finished');
  };

  const handleStartTimer = async () => {
    viewScaleAnim.value = 1;
    setTimerStatus('inProgress');
    try {
      await BackgroundService.stop();
      await BackgroundService.start(startTimer, options);
    } catch (error) {
      console.log(error);
    }
  };
  const saveToAsyncStorage = async (timeLeft: number) => {
    try {
      await AsyncStorage.setItem('timerTimeLeft', timeLeft.toString());
    } catch (error) {
      console.error('Error saving data into Async:', error);
    }
  };

  const loadFromAsyncStorage = async () => {
    try {
      const stringValue = await AsyncStorage.getItem('timerTimeLeft');
      if (stringValue !== null) {
        const remainingTime = parseInt(stringValue, 10);
        if (remainingTime == 0 && asyncFetchInterval) {
          clearInterval(asyncFetchInterval);
          onFinish();
        }
        setTimeLeft(remainingTime);
      }
    } catch (error) {
      console.error('Error loading data from Async:', error);
    }
  };

  const circumference = 2 * Math.PI * radius;
  const progress = 1 - (timeLeft ? timeLeft : 0) / duration;
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

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: viewScaleAnim.value}],
    };
  });

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
      {isloading ? (
        <View style={screenStyles.centerView}>
          <Text style={screenStyles.boldBigText}>loading...</Text>
        </View>
      ) : timerStatus == 'off' ? (
        <View style={screenStyles.centerView}>
          <TouchableOpacity
            style={screenStyles.startButton}
            onPress={() => handleStartTimer()}>
            <Text style={[screenStyles.boldBigText, screenStyles.whiteText]}>
              Start
            </Text>
            <MaterialCommunityIcons
              color={ColorPalette.white}
              name="timer-outline"
              size={30}
            />
            <Text style={screenStyles.whiteText}>{duration}s</Text>
          </TouchableOpacity>
        </View>
      ) : timerStatus == 'inProgress' ? (
        <View style={screenStyles.centerView}>
          <Text style={screenStyles.boldBigText}>Time Left: {timeLeft}s</Text>
        </View>
      ) : timerStatus == 'finished' ? (
        <Animated.View style={[screenStyles.centerView, animatedViewStyle]}>
          <Text style={[screenStyles.boldBigText]}>Finished!</Text>
          <TouchableOpacity onPress={() => handleStartTimer()}>
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
