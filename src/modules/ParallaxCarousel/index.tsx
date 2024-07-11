import {View, Image, Animated} from 'react-native';
import React, {useRef} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

import pic1 from '../../Assets/Images/parallaxCarousalPics/pic1.webp';
import pic2 from '../../Assets/Images/parallaxCarousalPics/pic2.jpeg';
import pic3 from '../../Assets/Images/parallaxCarousalPics/pic3.jpeg';
import pic4 from '../../Assets/Images/parallaxCarousalPics/pic4.jpeg';
import pic5 from '../../Assets/Images/parallaxCarousalPics/pic5.webp';
import pic6 from '../../Assets/Images/parallaxCarousalPics/pic6.webp';
import pic7 from '../../Assets/Images/parallaxCarousalPics/pic7.jpeg';
import pic8 from '../../Assets/Images/parallaxCarousalPics/pic8.jpeg';
import pic9 from '../../Assets/Images/parallaxCarousalPics/pic9.jpeg';

const ParallaxCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const height = screenContext.windowHeight;
  const width = screenContext.windowWidth;

  const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];
  const data = images.map((image, index) => ({
    key: String(index),
    photo: image,
    avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 40,
    )}.jpg`,
  }));
  return (
    <View style={screenStyles.canvas}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const translateX = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View style={screenStyles.renderItemContainer}>
              <View style={screenStyles.imageSuperWrapper}>
                <View style={screenStyles.imageWrapper}>
                  <Animated.Image
                    style={[
                      screenStyles.ImageStyle,
                      {transform: [{translateX}]},
                    ]}
                    source={item.photo}
                    resizeMode="cover"
                  />
                </View>
                <Image
                  style={[screenStyles.avatarImageStyle]}
                  source={{uri: item.avatar_url}}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ParallaxCarousel;
