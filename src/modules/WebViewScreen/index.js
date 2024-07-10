import {View, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';

const WebViewScreen = ({navigation}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <MenuDrawerButton navigation={navigation} color={ColorPalette.green} />
      <WebView source={{ uri: 'https://www.google.co.in' }} style={{ flex: 1 }} />
    </View>
  );
};

export default WebViewScreen;
