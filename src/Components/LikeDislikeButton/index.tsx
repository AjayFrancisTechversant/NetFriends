import React, {useCallback, useRef, useState} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {updateLikes} from '../../Redux/Slices/LikeSlice';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {UserType} from '../../Types/Types';
import styles from './Style';

type LikeDislikeButtonPropsType = {
  item: UserType;
};

const LikeDislikeButton: React.FC<LikeDislikeButtonPropsType> = ({item}) => {
  const dispatch = useAppDispatch();
  const likedUsers = useAppSelector(state => state.Likes.likedUsers);
  const liked = likedUsers.some(i => i.id.value === item.id.value);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const handleLikeDislike = useCallback(() => {
    showMessage({
      message: liked ? 'Disliked' : 'Liked',
      duration: 700,
      position: 'top',
      floating: true,
      type: liked ? 'danger' : 'success',
      animationDuration: 50,
      titleStyle: screenStyles.flashMessageTitleStyle,
    });
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    if (liked) {
      //dislike logic
      const tempArray = likedUsers.filter(i => i.id.value != item.id.value);
      dispatch(updateLikes(tempArray));
    } else {
      //like logic
      const tempArray = [...likedUsers, item];
      dispatch(updateLikes(tempArray));
    }
  }, [dispatch, liked, likedUsers, item]);

  return (
    <View>
      <TouchableOpacity onPress={handleLikeDislike}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <MaterialIcons
            size={30}
            name={liked ? 'favorite' : 'favorite-border'}
            color={ColorPalette.red}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(LikeDislikeButton);
