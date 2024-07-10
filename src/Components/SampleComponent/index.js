import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {PEXELS_API_KEY} from '../../Services/API/PexelsAPI';
import StaticVariables from '../../Preferences/StaticVariables';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import styles from './Style';
import {height} from '@fortawesome/free-brands-svg-icons/fa42Group';

const ApiUrl =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';
const imageSize = 80;
const spacing = 10;

const Gallery = () => {
  const [images, setImages] = useState(StaticVariables.EMPTY_ARRAY);
  const [loading, setLoading] = useState(true);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
    imageSize,
    spacing,
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      scrollToActiveIndex(0);
    };
    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    return () => subscription?.remove();
  }),
    [];
  const width = screenContext.windowWidth;

  useEffect(() => {
    if (PEXELS_API_KEY) {
      fetchImagesFromPexels();
    } else {
      Alert.alert('Error', 'Pexels API Key is missing!');
      setLoading(false);
    }
  }, []);

  const fetchImagesFromPexels = async () => {
    try {
      const response = await fetch(ApiUrl, {
        headers: {Authorization: PEXELS_API_KEY},
      });
      const data = await response.json();
      setImages(data.photos);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch images from Pexels.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({offset: index * width, animated: true});
    if (index * (imageSize + spacing) - imageSize / 2 > width / 2) {
      bottomRef?.current?.scrollToOffset({
        offset:
          index * (imageSize + spacing) - width / 2 + imageSize / 2 + spacing,
        animated: true,
      });
    } else {
      bottomRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (loading) {
    return (
      <View style={screenStyles.canvas}>
        <ActivityIndicator size="large" color={ColorPalette.green} />
      </View>
    );
  }

  return (
    <Animated.View style={[screenStyles.canvas, {opacity: fadeAnim}]}>
      <FlatList
        ref={topRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width + 0.2),
          );
          //+0.2 added extra
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={images}
        renderItem={({item}) => {
          return (
            <Image
              source={{uri: item.src.portrait}}
              style={screenStyles.topImage}
            />
          );
        }}
      />
      <FlatList
        ref={bottomRef}
        horizontal
        style={screenStyles.bottomFlatlist}
        contentContainerStyle={{paddingHorizontal: spacing}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={images}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item.src.portrait}}
                style={[
                  screenStyles.bottomImage,
                  {
                    borderWidth: 2,
                    borderColor:
                      index === activeIndex ? 'white' : 'transparent',
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Animated.View>
  );
};

export default Gallery;
