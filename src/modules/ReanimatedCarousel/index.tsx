import {View, Image} from 'react-native';
import React, {useRef} from 'react';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {images} from '../../Assets/Images/CarouselImages';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

const ReanimatedCarousel: React.FC = () => {
  const ref = useRef<ICarouselInstance>(null);
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.carouselContainer}>
      <Carousel
        ref={ref}
        scrollAnimationDuration={1000}
        width={screenContext.windowWidth}
        style={screenStyles.carousel}
        // autoPlay={true}
        autoPlayInterval={2000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: screenContext.isPortrait
            ? screenContext.windowWidth * 0.194
            : screenContext.windowHeight * 1.63,
        }}
        data={images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={screenStyles.image} />
        )}
      />
    </View>
  );
};

export default ReanimatedCarousel;
