import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

interface CircularProgressBarPropsType {
  radius: number;
  strokeWidth: number;
  duration: number;
}

const MyCircularProgressBar: React.FC<CircularProgressBarPropsType> = ({
  radius,
  strokeWidth,
  duration,
}) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (progress < 1) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.01;
          setTimeLeft(duration - Math.floor(newProgress * duration));
          return newProgress;
        });
      }, duration * 10);
      return () => clearInterval(interval);
    }
  }, [progress, duration]);

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  const getColor = (progress: number): string => {
    if (progress < 0.33) return '#FF0000'; 
    if (progress < 0.66) return '#FFA500'; 
    return '#008000'; // Green
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.container}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2.5} ${radius * 2.5}`}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke={ColorPalette.offWhite}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          stroke={getColor(progress)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          fill="none"
        />
      </Svg>
      <Text style={screenStyles.text}>{timeLeft}s</Text>
    </View>
  );
};

export default MyCircularProgressBar;
