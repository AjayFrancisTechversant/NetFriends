import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import { NewCommentDetailsType} from '../../Types/Types';
import styles from './Style';

type AddCommentButtonProps = {
  handleAddComment: (newCommentDetails: NewCommentDetailsType) => void;
};

const AddCommentButton: React.FC<AddCommentButtonProps> = ({
  handleAddComment,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCommentDetails, setNewCommentDetails] = useState<NewCommentDetailsType>(
    {
      postId: undefined,
      userId: undefined,
      body: StaticVariables.EMPTY_STRING,
    },
  );
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

  const handlePlusButton = () => {
    openModal();
  };
  const handlePostButton = () => {
    handleAddComment(newCommentDetails);
    setNewCommentDetails({
      postId: undefined,
      userId: undefined,
      body: StaticVariables.EMPTY_STRING,
    });
    closeModal();
  };
  const handleCancel = () => {
    setNewCommentDetails({
      postId: undefined,
      userId: undefined,
      body: StaticVariables.EMPTY_STRING,
    });
    closeModal();
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <>
      <TouchableOpacity onPress={handlePlusButton}>
        <Entypo name="plus" color={ColorPalette.lightOrange} size={30} />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={() => closeModal()}>
        <View style={screenStyles.modalFullScreenBackground}>
          <Animated.View
            style={[screenStyles.modalCommentContainer, animatedStyle]}>
            <TouchableOpacity
              style={screenStyles.closeButton}
              onPress={() => closeModal()}>
              <FontAwesome name="close" size={30} />
            </TouchableOpacity>
            <Text style={screenStyles.commentTitle}>Add Comment</Text>
            <TextInput
              value={newCommentDetails.postId}
              onChangeText={e =>
                setNewCommentDetails({...newCommentDetails, postId: e})
              }
              mode="outlined"
              label="Post Id"
              inputMode="numeric"
              selectionColor={ColorPalette.lightOrange}
              underlineColor={ColorPalette.lightOrange}
              activeUnderlineColor={ColorPalette.lightOrange}
              outlineColor={ColorPalette.lightOrange}
              activeOutlineColor={ColorPalette.lightOrange}
            />
            <TextInput
              value={newCommentDetails.userId}
              onChangeText={e =>
                setNewCommentDetails({...newCommentDetails, userId: e})
              }
              mode="outlined"
              label="User Id"
              inputMode="numeric"
              selectionColor={ColorPalette.lightOrange}
              underlineColor={ColorPalette.lightOrange}
              activeUnderlineColor={ColorPalette.lightOrange}
              outlineColor={ColorPalette.lightOrange}
              activeOutlineColor={ColorPalette.lightOrange}
            />
            <TextInput
              value={newCommentDetails.body}
              onChangeText={e =>
                setNewCommentDetails({...newCommentDetails, body: e})
              }
              mode="outlined"
              label="Body"
              inputMode="text"
              multiline
              numberOfLines={4}
              selectionColor={ColorPalette.lightOrange}
              underlineColor={ColorPalette.lightOrange}
              activeUnderlineColor={ColorPalette.lightOrange}
              outlineColor={ColorPalette.lightOrange}
              activeOutlineColor={ColorPalette.lightOrange}
            />
            <View style={screenStyles.buttonsContainer}>
              <TouchableOpacity
                onPress={handlePostButton}
                style={screenStyles.postButton}>
                <Text style={screenStyles.postButtonText}>Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                style={screenStyles.cancelButton}>
                <Text style={screenStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default AddCommentButton;
