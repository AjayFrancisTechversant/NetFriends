import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FacebookLogo from '../../Assets/Images/Facebook-Logo.png';
import styles from './style';

const FacebookAuthButton = () => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <TouchableOpacity
      onPress={() =>
        onFacebookButtonPress().then(() =>
          console.log('Signed in with Facebook!'),
        )
      }
      style={screenStyles.logoContainer}>
      <Image style={screenStyles.facebookLogo} source={FacebookLogo} />
    </TouchableOpacity>
  );
};

export default FacebookAuthButton;
