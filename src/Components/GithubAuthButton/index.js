import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {authorize} from 'react-native-app-auth';
import auth from '@react-native-firebase/auth';
import {useScreenContext} from '../../Contexts/ScreenContext';
import styles from './Style';

const githubLogo = require('../../Assets/Images/Github-Logo.png');

const config = {
  clientId: 'Ov23licj09plIWkEvmpM',
  clientSecret: '693cb7ebb345cad79218b25fa838911f1c2d4bb5',
  redirectUrl: 'myapp://',
  scopes: ['read:user'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/Ov23licj09plIWkEvmpM',
  },
};

const GithubAuthButton = () => {
  const loginWithGitHub = async () => {
    try {
      const {accessToken} = await authorize(config);
      const githubCredential = auth.GithubAuthProvider.credential(accessToken);
      return auth().signInWithCredential(githubCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <TouchableOpacity
      onPress={() => loginWithGitHub()}
      style={screenStyles.logoContainer}>
      <Image style={screenStyles.GithubLogo} source={githubLogo} />
    </TouchableOpacity>
  );
};

export default GithubAuthButton;
