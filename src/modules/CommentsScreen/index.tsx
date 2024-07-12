import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import MenuDrawerButton from '../../Components/MenuDrawerButton';
import ChatIcon from '../../Assets/SVGs/chatIcon.svg';
import CommentsContainer from '../../Components/CommentsContainer';
import {
  addComment,
  deleteAComment,
  fetchAllComments,
  updateAComment,
} from '../../Redux/Slices/CommentsSlice';
import AddCommentButton from '../../Components/AddCommentButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {
  NewCommentDetailsType,
  UpdatingCommentDetailsType,
} from '../../Types/Types';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import styles from './Style';

const CommentsScreen: React.FC = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {comments, loading, error} = useAppSelector(state => state.Comments);
  useEffect(() => {
    fetchInitialComments();
  }, []);

  const fetchInitialComments = async () => {
    try {
      await dispatch(fetchAllComments());
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddComment = async (newCommentDetails: NewCommentDetailsType) => {
    try {
      await dispatch(addComment(newCommentDetails));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    //newly added comments wont be deleted because those comments are not reflected in the server,delete api is done asynchrounously in the api
    try {
      await dispatch(deleteAComment(id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateComment = async (
    updatingCommentDetails: UpdatingCommentDetailsType,
  ) => {
    //cannot update a newly added comment bcos its not updated in the server
    try {
      await dispatch(updateAComment(updatingCommentDetails));
    } catch (error) {
      console.log(error);
    }
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.canvas}>
      <View style={screenStyles.MenuDrawerButton}>
        <MenuDrawerButton
          navigation={navigation}
          color={ColorPalette.lightOrange}
        />
      </View>
      <View style={screenStyles.plusButtonContainer}>
        <AddCommentButton handleAddComment={handleAddComment} />
      </View>
      <View style={[screenStyles.flexDRow, screenStyles.headingContainer]}>
        <Text style={screenStyles.heading}>Comments</Text>
        <ChatIcon fill={ColorPalette.lightOrange} width={30} height={30} />
      </View>
      <CommentsContainer
        comments={comments}
        loading={loading}
        handleDeleteComment={handleDeleteComment}
        handleUpdateComment={handleUpdateComment}></CommentsContainer>
    </View>
  );
};

export default React.memo(CommentsScreen);
