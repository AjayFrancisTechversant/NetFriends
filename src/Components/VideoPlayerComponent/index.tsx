import {View, Alert, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { SetStateType } from '../../Types/Types';

type VideoPlayerComponentPropsType = {
  setShowVideoPlayerComponent: SetStateType<boolean>;
};

const VideoPlayerComponent: React.FC<VideoPlayerComponentPropsType> = ({
  setShowVideoPlayerComponent,
}) => {
  const videoRef = useRef(null);
  const videoLocal = require('../../Assets/Videos/sampleVideo1.mp4');

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const onBuffer = () => {
    // console.log('buffering');
  };

  const onError = () => {
    Alert.alert('Error Occured');
  };

  return (
    <View style={screenStyles.videoPlayerContainer}>
      <TouchableOpacity
        style={screenStyles.backButton}
        onPress={() => setShowVideoPlayerComponent(false)}>
        <AntDesign name="left" size={30} color={ColorPalette.white} />
      </TouchableOpacity>
      <Video
        repeat
        source={{uri: `file://${RNFS.DocumentDirectoryPath}/sampleVideo.pdf`}}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        style={screenStyles.VideoPlayer}
        controls
      />
    </View>
  );
};

export default React.memo(VideoPlayerComponent);
