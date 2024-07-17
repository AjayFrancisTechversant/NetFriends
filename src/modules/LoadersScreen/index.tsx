import { View, Text } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../Contexts/ScreenContext';
import Loader1 from '../../Components/Loader1';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';
import MyCircularProgressBar from '../../Components/MyCircularProgressBar';

const LoadersScreen = () => {
    const screenContext = useScreenContext();
    const screenStyles = styles(
      screenContext,
      screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
      screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
    );
  return (
    <View style={screenStyles.container}>
      {/* <Text>Loader 1:</Text>
      <Loader1 radius={200} color={ColorPalette.red} duration={1000}/> */}
      <MyCircularProgressBar radius={50} duration={100} strokeWidth={10}/>
    </View>
  )
}

export default LoadersScreen