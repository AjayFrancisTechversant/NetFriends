import { View, Text } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../Contexts/ScreenContext';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
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
        <Text style={screenStyles.heading}>Custom Loaders</Text>
      <Text>My ActivityIndicator:</Text>
      <MyActivityIndicator radius={50} color={ColorPalette.red} duration={1000}/>
      <Text>My Circular ProgressBar</Text>
      <MyCircularProgressBar radius={150} duration={20} strokeWidth={20}/>
    </View>
  )
}

export default LoadersScreen