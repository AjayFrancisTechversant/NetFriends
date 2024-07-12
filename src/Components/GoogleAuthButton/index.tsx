import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useScreenContext} from '../../Contexts/ScreenContext';
import googleIcon from '../../Assets/Images/google-icon.png'
import styles from './Style';

const GoogleAuthButton = () => {
  GoogleSignin.configure({
    webClientId:
      '300284315367-ugvrjt2k4dkppuce83etsibl6cpkc4ul.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => console.log('Signed in with Google!'));
    } catch (error) {
      console.log(error);
    }
  }

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <TouchableOpacity
      onPress={() => onGoogleButtonPress()}
      style={screenStyles.logoContainer}>
      <Image style={screenStyles.googleLogo} source={googleIcon} />
    </TouchableOpacity>
  );
};

export default GoogleAuthButton;
