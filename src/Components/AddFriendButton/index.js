import React, {useCallback, useRef} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from 'react-native-flash-message';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {updateFriends} from '../../Redux/Slices/AddFriendSlice';
import styles from './Style';
import {useScreenContext} from '../../Contexts/ScreenContext';

const AddFriendButton = ({item}) => {
  const dispatch = useDispatch();
  const addedFriends = useSelector(state => state.AddFriend.addedFriends);
  const friendAdded = addedFriends.some(i => i.id.value === item.id.value);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const handleAddFriend = useCallback(() => {
    showMessage({
      message: friendAdded ? 'Friend Removed' : 'Friend Added',
      duration: 700,
      floating: true,
      position: 'top',
      type: friendAdded ? 'danger' : 'success',
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
    if (friendAdded) {
      //remove logic
      const tempArray = addedFriends.filter(i => i.id.value != item.id.value);
      dispatch(updateFriends(tempArray));
    } else {
      //add logic
      const tempArray = [...addedFriends, item];
      dispatch(updateFriends(tempArray));
    }
  }, [dispatch, friendAdded, addedFriends, item]);

  return (
    <View>
      <TouchableOpacity onPress={handleAddFriend}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <FontAwesome5
            name={friendAdded ? 'user-check' : 'user-plus'}
            color={ColorPalette.blue}
            size={30}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(AddFriendButton);
