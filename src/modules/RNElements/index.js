import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {AirbnbRating, Skeleton} from '@rneui/themed';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

const RNElements = () => {
  const [Rating, setRating] = useState(null);
  const ratingCompleted = rating => {
    setRating(rating);
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <Text style={screenStyles.mainHeading}>RNElements</Text>
      <AirbnbRating onFinishRating={ratingCompleted} defaultRating={0} />
      <Text>Your Rating is:{Rating}</Text>
      <View style={screenStyles.skeletonContainer}>
        <Skeleton
          animation="wave"
          skeletonStyle={screenStyles.boxSkeleton}
          width={20}
        />
        <Skeleton
          animation="wave"
          circle
          skeletonStyle={screenStyles.circleSkeleton}
          width={20}
        />
      </View>
    </View>
  );
};

export default RNElements;
