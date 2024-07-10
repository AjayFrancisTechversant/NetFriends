import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './Style';

const CommentCard = ({item, handleDeleteComment, handleUpdateComment}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatingMessageDetails, setUpdatingMessageDetails] = useState({
    id: null,
    editedBody: StaticVariables.EMPTY_STRING,
  });
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

  const handleCloseButton = () => {
    closeModal();
    setTimeout(() => {
      setIsEditing(false);
    }, 300);
  };
  const handleEditbutton = async id => {
    setUpdatingMessageDetails({id, editedBody: item.body});
    setIsEditing(true);
  };
  const handelSaveEditing = async () => {
    await handleUpdateComment(updatingMessageDetails);
    closeModal();
  };
  const handleCancelEditing = () => {
    setUpdatingMessageDetails({
      id: 0,
      editedBody: StaticVariables.EMPTY_STRING,
    });
    setIsEditing(false);
  };
  const handleDelete = async id => {
    await handleDeleteComment(id);
    closeModal();
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.commentCard}>
      <TouchableOpacity onPress={() => openModal()}>
        <Text style={screenStyles.commentTitle}>{item.user.username}</Text>
        <Text>{item.body}</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={handleCloseButton}>
        <View style={screenStyles.modalFullScreenBackground}>
          <Animated.View
            style={[screenStyles.modalCommentContainer, animatedStyle]}>
            <TouchableOpacity
              style={screenStyles.closeButton}
              onPress={handleCloseButton}>
              <FontAwesome name="close" size={25} />
            </TouchableOpacity>
            <Text style={screenStyles.commentTitle}>{item.user.username}</Text>
            {!isEditing ? (
              <Text>{item.body}</Text>
            ) : (
              <TextInput
                style={screenStyles.textInput}
                value={updatingMessageDetails.editedBody}
                onChangeText={e =>
                  setUpdatingMessageDetails({
                    ...updatingMessageDetails,
                    editedBody: e,
                  })
                }
                mode="outlined"
                multiline
                numberOfLines={3}
                selectionColor={ColorPalette.lightOrange}
                underlineColor={ColorPalette.lightOrange}
                activeUnderlineColor={ColorPalette.lightOrange}
                outlineColor={ColorPalette.lightOrange}
                activeOutlineColor={ColorPalette.lightOrange}
              />
            )}
            {!isEditing ? (
              <View style={screenStyles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => handleEditbutton(item.id)}
                  style={screenStyles.editButton}>
                  <Text style={screenStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={screenStyles.deleteButton}>
                  <Text style={screenStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={screenStyles.buttonsContainer}>
                <TouchableOpacity
                  onPress={handelSaveEditing}
                  style={screenStyles.editButton}>
                  <Text style={screenStyles.editButtonText}>save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEditing}
                  style={screenStyles.deleteButton}>
                  <Text style={screenStyles.deleteButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(CommentCard);
