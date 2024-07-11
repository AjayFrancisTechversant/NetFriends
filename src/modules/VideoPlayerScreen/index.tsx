import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import {createThumbnail} from 'react-native-create-thumbnail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useScreenContext} from '../../Contexts/ScreenContext';
import VideoPlayerComponent from '../../Components/VideoPlayerComponent';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';

const VideoPlayerScreen: React.FC = ({navigation}) => {
  const [showVideoPlayerComponent, setShowVideoPlayerComponent] =
    useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [thumbnailPath, setThumbnailPath] = useState(
    StaticVariables.EMPTY_STRING,
  );

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  useEffect(() => {
    initialFn();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (showVideoPlayerComponent) {
          setShowVideoPlayerComponent(false);
          return true;
        }
      },
    );
    return () => backHandler.remove();
  }, [showVideoPlayerComponent]);

  const initialFn = async () => {
    await downloadVideo();
    await makeThumbnailFn();
  };

  const downloadVideo = async () => {
    const filePath = `${RNFS.DocumentDirectoryPath}/sampleVideo.pdf`;
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      try {
        const options = {
          fromUrl:
            'https://www.pexels.com/download/video/3209828/?fps=25.0&h=1080&w=1920',
          toFile: filePath,
        };
        setIsDownloading(true);
        await RNFS.downloadFile(options).promise;
        setIsDownloading(false);
      } catch (error) {
        Alert.alert('Download failed', (error as Error).message);
        console.log(error);
      }
    }
  };

  const makeThumbnailFn = async () => {
    try {
      const thumbnail = await createThumbnail({
        url: `file://${RNFS.DocumentDirectoryPath}/sampleVideo.pdf`,
        timeStamp: 4000,
      });
      setThumbnailPath(thumbnail.path);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={screenStyles.canvas}>
      {!showVideoPlayerComponent ? (
        <View>
          <View style={screenStyles.menuButton}>
            <MenuDrawerButton
              navigation={navigation}
              color={ColorPalette.green}
            />
          </View>
          <Text style={screenStyles.heading}>VideoPlayer</Text>
          <View style={screenStyles.thumbnailButtonContainer}>
            {isDownloading ? (
              <ActivityIndicator color={ColorPalette.green} size={50} />
            ) : (
              <View>
                <ImageBackground
                  source={{uri: thumbnailPath}}
                  style={screenStyles.backgroundImageStyle}
                  resizeMode="cover">
                  <TouchableOpacity
                    onPress={() => setShowVideoPlayerComponent(true)}>
                    <Ionicons
                      name="play-circle"
                      color={ColorPalette.green}
                      size={80}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
          </View>
        </View>
      ) : (
        <VideoPlayerComponent
          setShowVideoPlayerComponent={setShowVideoPlayerComponent}
        />
      )}
    </View>
  );
};

export default VideoPlayerScreen;
