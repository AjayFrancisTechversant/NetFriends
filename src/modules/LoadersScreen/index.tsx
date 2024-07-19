import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../Contexts/ScreenContext';
import MyActivityIndicator from '../../Components/MyActivityIndicator';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyCircularProgressBar from '../../Components/MyCircularProgressBar';
import styles from './style';

const LoadersScreen = () => {
    const screenContext = useScreenContext();
    const screenStyles = styles(
      screenContext,
      screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
      screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
    );
  return (
   <ScrollView>
      <View style={screenStyles.container}>
          <Text style={screenStyles.heading}>Custom Loaders</Text>
        <Text>ActivityIndicator:</Text>
        <MyActivityIndicator radius={50} color={ColorPalette.red} duration={1000}/>
        <Text>Circular ProgressBar:</Text>
        <MyCircularProgressBar radius={150} duration={10} strokeWidth={20}/>
      </View>
   </ScrollView>
  )
}

export default LoadersScreen