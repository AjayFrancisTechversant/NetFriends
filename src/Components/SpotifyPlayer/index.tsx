import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Skeleton} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {setStateType} from '../../Types/Types';
import WeekndAlbumCover from '../../Assets/Images/WeekndAlbumCover.png';
import styles from './Style';

type SpotifyPlayerPropsType = {
  setPlayerModalVisible: setStateType<boolean>;
};

const SpotifyPlayer: React.FC<SpotifyPlayerPropsType> = ({
  setPlayerModalVisible,
}) => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <ScrollView
      style={screenStyles.canvas}
      showsVerticalScrollIndicator={false}>
      <LinearGradient
        style={screenStyles.linearGradientStyle}
        colors={[ColorPalette.lightGreen, ColorPalette.white]}>
        <View style={screenStyles.header}>
          <TouchableOpacity onPress={() => setPlayerModalVisible(false)}>
            <AntDesign name="down" color={ColorPalette.green} size={30} />
          </TouchableOpacity>
          <Text style={screenStyles.headerText}>PLAYING FROM PLAYLIST</Text>
          <TouchableOpacity>
            <Entypo
              name="dots-three-vertical"
              color={ColorPalette.green}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <Image style={screenStyles.coverImage} source={WeekndAlbumCover} />
        <View style={screenStyles.titleAndLikeButtonContainer}>
          <View>
            <Text style={screenStyles.songTitle}>After Hours</Text>
            <Text style={screenStyles.songSubTitle}>Weeknd</Text>
          </View>
          <TouchableOpacity style={screenStyles.likeButton}>
            <AntDesign name="heart" color={ColorPalette.green} size={30} />
          </TouchableOpacity>
        </View>

        <View style={screenStyles.playBackButtonsContainer}>
          <TouchableOpacity>
            <Ionicons name="shuffle" color={ColorPalette.green} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="play-skip-back-sharp"
              color={ColorPalette.green}
              size={40}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="play-circle"
              color={ColorPalette.green}
              size={100}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="play-skip-forward-sharp"
              color={ColorPalette.green}
              size={40}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" color={ColorPalette.green} size={30} />
          </TouchableOpacity>
        </View>

        <View style={screenStyles.bottomButtonsSuperContainer}>
          <TouchableOpacity>
            <MaterialIcons
              name="devices"
              color={ColorPalette.green}
              size={20}
            />
          </TouchableOpacity>
          <View style={screenStyles.shareAndPlaylistButtonsContainer}>
            <TouchableOpacity>
              <Ionicons
                name="share-social-outline"
                color={ColorPalette.green}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="playlist-music-outline"
                color={ColorPalette.green}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={screenStyles.lyricsText}>LYRICS</Text>
      </LinearGradient>

      <View style={screenStyles.lyricsBox}>
        <Skeleton style={screenStyles.skel1} />
        <Skeleton style={screenStyles.skel2} />
        <Skeleton style={screenStyles.skel3} />
        <Skeleton style={screenStyles.skel4} />
        <Skeleton style={screenStyles.skel4} />
        <Skeleton style={screenStyles.skel3} />
        <Skeleton style={screenStyles.skel2} />
        <Skeleton style={screenStyles.skel3} />
        <Skeleton style={screenStyles.skel4} />
        <Skeleton style={screenStyles.skel4} />
        <Skeleton style={screenStyles.skel2} />
        <Skeleton style={screenStyles.skel4} />
      </View>
    </ScrollView>
  );
};

export default SpotifyPlayer;
