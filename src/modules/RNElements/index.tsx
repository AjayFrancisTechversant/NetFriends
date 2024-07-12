import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {AirbnbRating, Skeleton} from '@rneui/themed';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './style';

const RNElements: React.FC = () => {
  const [Rating, setRating] = useState(0);
  const ratingCompleted = (rating: number) => {
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
        <Skeleton animation="wave" width={20} />
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
