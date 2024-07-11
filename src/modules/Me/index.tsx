import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Tooltip from 'react-native-walkthrough-tooltip';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import OptionCard from '../../Components/OptionCard';
import {useScreenContext} from '../../Contexts/ScreenContext';
import StaticVariables from '../../Preferences/StaticVariables';
import profilePageBG from '../../Assets/Images/profilePageBG.jpg';
import profilePicDummy from '../../Assets/Images/profilePicDummy.webp';
import styles from './Style';

const Me: React.FC = () => {
  const likeCount = useSelector(state => state.Likes.likedUsers.length);
  const friendsCount = useSelector(
    state => state.AddFriend.addedFriends.length,
  );
  const [mobileNumber, setMobileNumber] = useState<string>();
  const [tempMobileNumber, setTempMobileNumber] = useState<string>();
  const [email, setEmail] = useState(StaticVariables.EMPTY_STRING);
  const [tempEmail, setTempEmail] = useState(StaticVariables.EMPTY_STRING);
  const [isEditing, setIsEditing] = useState(false);
  const [showLikedToolTip, setShowLikedToolTip] = useState(false);
  const [showFriendsToolTip, setShowFriendsToolTip] = useState(false);
  const [showAchievementsToolTip, setShowAchievementsToolTip] = useState(false);
  const handleLogout = async () => {
    GoogleSignin.signOut();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const handleEditOption = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    setTempMobileNumber(mobileNumber);
    setTempEmail(email);
    setIsEditing(false);
  };
  const handleSaveEdit = () => {
    setMobileNumber(tempMobileNumber);
    setEmail(tempEmail);
    setIsEditing(false);
  };

  return (
    <View style={screenStyles.canvas}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={screenStyles.container}>
        <ImageBackground
          style={screenStyles.headerContainer}
          source={profilePageBG}
          imageStyle={screenStyles.BGImageStyle}>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons
              style={screenStyles.logoutIcon}
              size={30}
              name="logout"
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={screenStyles.userDetailsContainer}>
          <Image style={screenStyles.profilePicture} source={profilePicDummy} />
          {isEditing ? (
            <View style={screenStyles.editContainer}>
              <Text style={screenStyles.editBoxTitle}>
                Edit Profile Details
              </Text>
              <TextInput
                style={screenStyles.textInput}
                inputMode="numeric"
                outlineColor={ColorPalette.green}
                cursorColor={ColorPalette.green}
                selectionColor={ColorPalette.green}
                activeOutlineColor={ColorPalette.green}
                label={'Mobile Number'}
                mode="outlined"
                onChangeText={e => setTempMobileNumber(e)}
                value={tempMobileNumber}
              />
              <TextInput
                inputMode="email"
                outlineColor={ColorPalette.green}
                cursorColor={ColorPalette.green}
                selectionColor={ColorPalette.green}
                activeOutlineColor={ColorPalette.green}
                label={'Email'}
                mode="outlined"
                style={screenStyles.textInput}
                onChangeText={e => setTempEmail(e)}
                value={tempEmail}
              />
              <View style={screenStyles.editButtonsContainer}>
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  style={screenStyles.cancelEditButton}>
                  <Entypo size={25} name="cross" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveEdit}
                  style={screenStyles.saveEditButton}>
                  <Entypo size={25} name="check" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text>Mobile: {mobileNumber}</Text>
              <Text>Email: {email}</Text>
            </View>
          )}
        </View>
        <View style={screenStyles.threeIconContainer}>
          <View style={screenStyles.threeIconButton}>
            <Tooltip
              arrowSize={screenStyles.toolTipArrowSize}
              isVisible={showLikedToolTip}
              onClose={() => setShowLikedToolTip(false)}
              content={
                <View>
                  <Text style={screenStyles.threeIconSubtitle}>
                    {likeCount}
                  </Text>
                </View>
              }>
              <TouchableOpacity onPress={() => setShowLikedToolTip(true)}>
                <AntDesign
                  name="heart"
                  color={ColorPalette.red}
                  size={30}
                  style={screenStyles.threeIcons}
                />
                <Text style={screenStyles.threeIconTitle}>Liked</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>

          <View style={screenStyles.threeIconButton}>
            <Tooltip
              arrowSize={screenStyles.toolTipArrowSize}
              isVisible={showFriendsToolTip}
              onClose={() => setShowFriendsToolTip(false)}
              content={
                <View>
                  <Text style={screenStyles.threeIconSubtitle}>
                    {friendsCount}
                  </Text>
                </View>
              }>
              <TouchableOpacity onPress={() => setShowFriendsToolTip(true)}>
                <FontAwesome5
                  name="user-friends"
                  color={ColorPalette.blue}
                  size={30}
                  style={screenStyles.threeIcons}
                />
                <Text style={screenStyles.threeIconTitle}>Friends</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
          <View style={screenStyles.threeIconButton}>
            <Tooltip
              arrowSize={screenStyles.toolTipArrowSize}
              isVisible={showAchievementsToolTip}
              onClose={() => setShowAchievementsToolTip(false)}
              content={
                <View>
                  <Text style={screenStyles.threeIconSubtitle}>2</Text>
                </View>
              }>
              <TouchableOpacity
                onPress={() => setShowAchievementsToolTip(true)}>
                <FontAwesome5
                  name="trophy"
                  color={ColorPalette.yellow}
                  size={30}
                  style={screenStyles.threeIcons}
                />
                <Text style={screenStyles.threeIconTitle}>Achivements</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
        </View>
        <View style={screenStyles.OptionCardContainer}>
          <OptionCard
            iconName={'boxes'}
            iconFamily={'FontAwesome5'}
            optionTitle={'My Orders'}
          />
          <OptionCard
            iconName={'dollar'}
            iconFamily={'FontAwesome'}
            optionTitle={'Refer and Earn'}
          />
          <OptionCard
            iconName={'help'}
            iconFamily={'Entypo'}
            optionTitle={'Help Center'}
          />
          <OptionCard
            onPressFn={handleEditOption}
            iconName={'edit'}
            iconFamily={'AntDesign'}
            optionTitle={'Edit Profile Details'}
          />
          <OptionCard
            iconName={'setting'}
            iconFamily={'AntDesign'}
            optionTitle={'Settings'}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Me;
