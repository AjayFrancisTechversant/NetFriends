import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import SpotifyPlayer from '../../Components/SpotifyPlayer';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './style';

const Spotify: React.FC = () => {
  const [playermodalVisible, setPlayerModalVisible] = useState(false);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <MenuDrawerButton color={ColorPalette.green} />
      <TouchableOpacity
        onPress={() => setPlayerModalVisible(true)}
        style={screenStyles.openPlayerButton}>
        <Text>Open Player</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={playermodalVisible}>
        <SpotifyPlayer setPlayerModalVisible={setPlayerModalVisible} />
      </Modal>
    </View>
  );
};

export default Spotify;
