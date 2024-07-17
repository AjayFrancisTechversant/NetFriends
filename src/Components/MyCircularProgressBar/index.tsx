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
    let animationFrameId: number;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000; // Convert duration to milliseconds

    const animate = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const remainingTime = Math.max(0, endTime - now);

      // Calculate progress based on elapsed time
      const currentProgress = elapsedTime / (duration * 1000);

      setProgress(currentProgress);
      setTimeLeft(Math.ceil(remainingTime / 1000)); // Convert remaining milliseconds to seconds

      // Continue animation if progress is less than 1
      if (currentProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    // Cleanup function
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration]);

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
      <View style={screenStyles.centerView}>
        <Text style={screenStyles.text}>
          Progress: {Math.floor(progress * 100)}%
        </Text>
        <Text style={screenStyles.text}>Time Left: {timeLeft}s</Text>
      </View>
    </View>
  );
};

export default MyCircularProgressBar;
