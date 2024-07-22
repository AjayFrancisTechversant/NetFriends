import { View, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import NetFriends_Logo_with_bottomlabel from '../../Assets/Images/Logo/NetFriends_Logo_with_bottomlabel.png'
import { useScreenContext } from '../../Contexts/ScreenContext'
import styles from './style'
import ColorPalette from '../../Assets/Themes/ColorPalette'

const SplashScreen = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <Image source={NetFriends_Logo_with_bottomlabel} style={screenStyles.logoStyle} />
      <ActivityIndicator color={ColorPalette.offWhite} size={50}/>
    </View>
  )
}

export default SplashScreen