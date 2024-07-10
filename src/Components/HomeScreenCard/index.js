import {View, Text, Image, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useScreenContext} from '../../Contexts/ScreenContext';
import LikeDislikeButton from '../LikeDislikeButton';
import AddFriendButton from '../AddFriendButton';
import styles from './Style';

const HomeScreenCard = ({item}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const name = item.name.first + ' ' + item.name.last;
  const {email, phone} = item;
  const {age} = item.dob;
  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0);
  const openModal = () => {
    setIsModalVisible(true);
    modalOpacity.value = withSpring(1);
    modalScale.value = withSpring(1);
  };
  const closeModal = () => {
    modalOpacity.value = withSpring(0);
    modalScale.value = withSpring(0);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
      transform: [{scale: modalScale.value}],
    };
  });
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.cardContainer}>
      <TouchableOpacity
        onPress={() => openModal()}
        style={screenStyles.TouchableOpacity}>
        <Image
          style={screenStyles.image}
          source={{
            uri: item.picture.large,
          }}
        />
        <View style={screenStyles.detailsContainer}>
          <Text style={screenStyles.title}>{name}</Text>
          <Text>{email}</Text>
          <Text>{phone}</Text>
          <Text>Age: {age}</Text>
        </View>
      </TouchableOpacity>
      <View style={screenStyles.buttonsContainer}>
        <LikeDislikeButton item={item} />
        <AddFriendButton item={item} />
      </View>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={() => closeModal()}>
        <View style={screenStyles.modalFullScreenBackground}>
          <Animated.View style={[screenStyles.userContainer, animatedStyle]}>
            <TouchableOpacity
              style={screenStyles.closeButton}
              onPress={() => closeModal()}>
              <FontAwesome name="close" size={25} />
            </TouchableOpacity>
            <Text style={screenStyles.title}>
              {`${item.name.title}. ${item.name.first} ${item.name.last}`}
            </Text>
            <Image
              style={screenStyles.modalImage}
              source={{
                uri: item.picture.large,
              }}
            />
            <View style={screenStyles.modalButtonsContainer}>
              <LikeDislikeButton item={item} />
              <AddFriendButton item={item} />
            </View>
            <View style={screenStyles.descContainer}>
              <Text>Age: {item.dob.age}</Text>
              <Text>Gender: {item.gender}</Text>
              <Text>Email: {item.email}</Text>
              <Text>
                Location: {item.location.state}, {item.location.country}
              </Text>
              <Text>Phone: {item.phone}</Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(HomeScreenCard);
